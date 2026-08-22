import { ApiResponse, PageMeta, ProblemDetail } from "@/types/responses/base.response";
import { PersonaResponse } from "@/types/responses/persona.response";
import {
    AnswerHistoryListItemResponse,
    AnswerHistoryResponse,
    SpeakingHistoryListItem,
    SpeakingSessionDetail,
    SpeakingSessionListItem,
    SpeakingSessionQuery,
    SpeechAssessmentResponse,
    StartConversationResponse
} from "@/types/responses/speaking.response";

/**
 * Service phía client cho tính năng chấm điểm luyện nói. Gọi qua Next route
 * handler (/api/*) cùng origin (pattern 2 lớp) — route handler đứng ra gọi BE,
 * nhờ vậy tránh CORS và tự đính kèm access token từ cookie.
 */

async function unwrap<T>(response: Response): Promise<T> {
    const text = await response.text();
    let result: unknown = null;
    if (text) {
        try {
            result = JSON.parse(text);
        } catch {
            // Phản hồi không phải JSON (vd trang lỗi HTML) → báo lỗi rõ ràng.
            throw new Error(`Máy chủ phản hồi lỗi (HTTP ${response.status}).`);
        }
    }
    if (!response.ok) {
        throw new Error(
            (result as ProblemDetail)?.detail ||
                `Yêu cầu thất bại (HTTP ${response.status}).`,
        );
    }
    return (result as ApiResponse<T>).data;
}

/**
 * Gọi proxy /api/*; nếu BE trả 401 (access token hết hạn giữa phiên chat sống
 * lâu, middleware không refresh vì matcher loại /api) thì rotation 1 lần rồi thử
 * lại. Body dạng string/FormData tái sử dụng được nên retry an toàn.
 */
async function apiRequest(
    input: string,
    init?: RequestInit,
): Promise<Response> {
    let response = await fetch(input, init);
    if (response.status === 401) {
        const rotated = await fetch("/api/auth/rotation", {
            method: "POST",
            credentials: "include",
        });
        if (rotated.ok) {
            response = await fetch(input, init);
        }
    }
    return response;
}

/** Đuôi file theo mime của bản ghi để BE nhận đúng định dạng. */
function fileNameFor(blob: Blob): string {
    if (blob.type.includes("wav")) return "recording.wav";
    if (blob.type.includes("mp4") || blob.type.includes("m4a"))
        return "recording.m4a";
    if (blob.type.includes("ogg")) return "recording.ogg";
    return "recording.webm";
}

export interface SpeakingAnalysisInput {
    file: Blob;
    speakingQuestionId: number;
    durationSec: number;
}

/** Upload bản ghi + chấm điểm → trả AnswerHistoryResponse đầy đủ (cùng shape với getAnswerHistoryDetail). */
export async function submitSpeakingAnalysis(
    input: SpeakingAnalysisInput,
): Promise<AnswerHistoryResponse> {
    const form = new FormData();
    form.append("file", input.file, fileNameFor(input.file));
    form.append("speakingQuestionId", String(input.speakingQuestionId));
    form.append(
        "durationSec",
        String(Math.max(1, Math.round(input.durationSec))),
    );

    const response = await fetch("/api/analysis", {
        method: "POST",
        body: form,
    });
    return unwrap<AnswerHistoryResponse>(response);
}

/** Chấm phát âm 1 đoạn ghi âm bất kỳ theo văn bản tham chiếu — không gắn với
 *  câu hỏi nói cụ thể nào (dùng để luyện đọc từng từ vựng trong thẻ flashcard). */
export async function assessPronunciation(
    file: Blob,
    referenceText: string,
): Promise<SpeechAssessmentResponse> {
    const form = new FormData();
    form.append("file", file, fileNameFor(file));
    form.append("reference-text", referenceText);

    const response = await fetch("/api/speaking/assessment", {
        method: "POST",
        body: form,
    });
    return unwrap<SpeechAssessmentResponse>(response);
}

/** Chi tiết một lượt luyện nói theo answerHistoryId (màn Báo cáo / xem lại lịch sử). */
export async function getAnswerHistoryDetail(
    answerHistoryId: string | number,
): Promise<AnswerHistoryResponse> {
    const response = await fetch(`/api/history/${answerHistoryId}`);
    return unwrap<AnswerHistoryResponse>(response);
}

/** Toàn bộ lịch sử luyện nói của một câu hỏi cụ thể (dùng cho danh sách ở trang chi tiết câu hỏi). */
export async function getAnswerHistoriesBySpeakingQuestion(
    speakingQuestionId: string | number,
): Promise<AnswerHistoryListItemResponse[]> {
    const response = await fetch(
        `/api/answer-histories/speaking-question/${speakingQuestionId}`,
    );
    return unwrap<AnswerHistoryListItemResponse[]>(response);
}

export interface SpeakingHistoryListQuery {
    page?: number;
    size?: number;
    topicId?: number | null;
    speakingQuestionId?: number | null;
    search?: string | null;
}

export interface SpeakingHistoryListPage {
    items: SpeakingHistoryListItem[];
    totalPages: number;
    totalElements: number;
}

/**
 * Danh sách lịch sử luyện nói (POST /speaking-histories) — BE trả `data` là mảng,
 * phân trang nằm ở `meta.pageMeta`. userId lấy từ token ở BE.
 */
export async function getSpeakingHistoryList(
    query: SpeakingHistoryListQuery = {},
): Promise<SpeakingHistoryListPage> {
    const response = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            page: query.page ?? 0,
            size: query.size ?? 10,
            topicId: query.topicId ?? null,
            speakingQuestionId: query.speakingQuestionId ?? null,
            search: query.search || null,
        }),
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(
            (result as ProblemDetail).detail ||
                "Không tải được lịch sử luyện tập",
        );
    }
    const api = result as ApiResponse<SpeakingHistoryListItem[]>;
    return {
        items: api.data ?? [],
        totalPages: api.meta?.pageMeta?.totalPages ?? 0,
        totalElements: api.meta?.pageMeta?.totalElements ?? 0,
    };
}

/* ─── AI 1:1 Dialogue ────────────────────────────────────────────── */

/** Danh sách persona AI (GET /personas). */
export async function getPersonas(): Promise<PersonaResponse[]> {
    const response = await apiRequest("/api/personas");
    const data = await unwrap<PersonaResponse[] | PersonaResponse>(response);
    if (!data) return [];
    return Array.isArray(data) ? data : [data];
}

/** Chi tiết persona AI theo ID (GET /personas/{id}). */
export async function getPersonaById(
    id: number | string,
): Promise<PersonaResponse> {
    const response = await apiRequest(`/api/personas/${id}`);
    return unwrap<PersonaResponse>(response);
}

/** Khôi phục phiên dở theo sessionCode → câu chào "chào lại". */
export async function resumeSession(
    sessionCode: string,
): Promise<StartConversationResponse> {
    const response = await apiRequest(
        `/api/speaking/session/${sessionCode}/resume`,
        { method: "POST" },
    );
    return unwrap<StartConversationResponse>(response);
}

export interface SpeakingSessionPage {
    items: SpeakingSessionListItem[];
    pageMeta?: PageMeta;
}

/** Danh sách phiên AI 1:1 (phân trang + lọc). `data` là mảng, phân trang ở meta. */
export async function getSpeakingSessions(
    query: SpeakingSessionQuery = {},
): Promise<SpeakingSessionPage> {
    const response = await apiRequest("/api/speaking/session/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            page: query.page ?? 0,
            size: query.size ?? 10,
            sortColumn: query.sortColumn ?? "CREATED_TIME",
            sortDirection: query.sortDirection ?? "DESC",
            personaId: query.personaId ?? null,
            search: query.search || null,
            status: query.status ?? null,
        }),
    });
    const text = await response.text();
    const result = text ? JSON.parse(text) : null;
    if (!response.ok) {
        throw new Error(
            (result as ProblemDetail)?.detail || "Không tải được lịch sử phiên",
        );
    }
    const api = result as ApiResponse<SpeakingSessionListItem[]>;
    return { items: api.data ?? [], pageMeta: api.meta?.pageMeta };
}

/** Chi tiết đầy đủ 1 phiên (báo cáo + transcript + gợi ý học tập). */
export async function getSpeakingSessionDetail(
    sessionCode: string,
): Promise<SpeakingSessionDetail> {
    const response = await apiRequest(
        `/api/speaking/session/history/${sessionCode}`,
    );
    return unwrap<SpeakingSessionDetail>(response);
}

/** Xoá một phiên hội thoại AI 1:1 theo sessionCode (HTTP DELETE 204). */
export async function deleteSpeakingSession(
    sessionCode: string,
): Promise<void> {
    const response = await apiRequest(`/api/speaking/session/${sessionCode}`, {
        method: "DELETE",
    });
    if (!response.ok && response.status !== 204) {
        let detail = "Không thể xoá phiên hội thoại.";
        try {
            const json = await response.json();
            if (json?.detail) detail = json.detail;
        } catch {
            // ignore non-json errors
        }
        throw new Error(detail);
    }
}
