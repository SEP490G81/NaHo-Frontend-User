import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import {
    FormalityLevel,
    MarugotoLevel,
    PersonaResponse,
} from "@/types/responses/persona.response";
import {
    AudioChatResponse,
    ChatReplyResponse,
    SessionScoringResponse,
    SpeakingAnalysisResponse,
    SpeakingHistoryDetailResponse,
    SpeakingHistoryListItem,
    SpringPage,
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

/** Upload bản ghi + chấm điểm → trả { historyId, score }. */
export async function submitSpeakingAnalysis(
    input: SpeakingAnalysisInput,
): Promise<SpeakingAnalysisResponse> {
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
    return unwrap<SpeakingAnalysisResponse>(response);
}

/** Chi tiết báo cáo luyện nói theo historyId. */
export async function getSpeakingHistoryDetail(
    historyId: string | number,
): Promise<SpeakingHistoryDetailResponse> {
    const response = await fetch(`/api/history/${historyId}`);
    return unwrap<SpeakingHistoryDetailResponse>(response);
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
    return unwrap<PersonaResponse[]>(response);
}

export interface StartConversationInput {
    /** Override thể lịch sự (khác mặc định của persona). */
    formalityLevel?: FormalityLevel | null;
    /** Override cấp độ Marugoto. */
    marugotoLevel?: MarugotoLevel | null;
}

/** Bắt đầu hội thoại với persona (kèm override style tuỳ chọn). */
export async function startConversation(
    personaId: number,
    input: StartConversationInput = {},
): Promise<StartConversationResponse> {
    const hasOverride = !!(input.formalityLevel || input.marugotoLevel);
    const response = await apiRequest(
        `/api/speaking/session/${personaId}`,
        hasOverride
            ? {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                      formalityLevel: input.formalityLevel ?? undefined,
                      marugotoLevel: input.marugotoLevel ?? undefined,
                  }),
              }
            : { method: "POST" },
    );
    return unwrap<StartConversationResponse>(response);
}

/** Đuôi file theo mime của bản ghi để BE nhận đúng định dạng. */
function sessionFileName(blob: Blob): string {
    if (blob.type.includes("wav")) return "message.wav";
    if (blob.type.includes("mp4") || blob.type.includes("m4a"))
        return "message.m4a";
    if (blob.type.includes("ogg")) return "message.ogg";
    return "message.webm";
}

/** Gửi audio trong phiên → STT + điểm phát âm + reply của AI. */
export async function sendSessionAudio(
    sessionId: string,
    blob: Blob,
    referenceText?: string,
): Promise<AudioChatResponse> {
    const form = new FormData();
    form.append("file", blob, sessionFileName(blob));

    const query = referenceText
        ? `?reference-text=${encodeURIComponent(referenceText)}`
        : "";
    const response = await apiRequest(
        `/api/speaking/session/${sessionId}/audio${query}`,
        { method: "POST", body: form },
    );
    return unwrap<AudioChatResponse>(response);
}

/** Gửi tin nhắn text trong phiên → reply của AI. */
export async function sendTextMessage(
    sessionId: string,
    transcript: string,
): Promise<ChatReplyResponse> {
    const response = await apiRequest(
        `/api/speaking/session/${sessionId}/message`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transcript }),
        },
    );
    return unwrap<ChatReplyResponse>(response);
}

export interface EndSessionInput {
    topic?: string;
    speechMetadata?: string;
    asrConfidence?: string;
}

/** Kết thúc phiên → báo cáo chấm điểm cả buổi. */
export async function endSession(
    sessionId: string,
    input: EndSessionInput = {},
): Promise<SessionScoringResponse> {
    const response = await apiRequest(`/api/speaking/session/${sessionId}/end`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            topic: input.topic ?? "",
            speechMetadata: input.speechMetadata ?? "",
            asrConfidence: input.asrConfidence ?? "",
        }),
    });
    return unwrap<SessionScoringResponse>(response);
}
