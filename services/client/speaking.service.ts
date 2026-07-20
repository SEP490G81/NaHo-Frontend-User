import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import {
    SpeakingAnalysisResponse,
    SpeakingHistoryDetailResponse,
    SpeakingHistoryListItem,
} from "@/types/responses/speaking.response";

/**
 * Service phía client cho tính năng chấm điểm luyện nói. Gọi qua Next route
 * handler (/api/*) cùng origin (pattern 2 lớp) — route handler đứng ra gọi BE,
 * nhờ vậy tránh CORS và tự đính kèm access token từ cookie.
 */

async function unwrap<T>(response: Response): Promise<T> {
    const result = await response.json();
    if (!response.ok) {
        throw new Error((result as ProblemDetail).detail || "Yêu cầu thất bại");
    }
    return (result as ApiResponse<T>).data;
}

/** Đuôi file theo mime của bản ghi để BE nhận đúng định dạng. */
function fileNameFor(blob: Blob): string {
    if (blob.type.includes("wav")) return "recording.wav";
    if (blob.type.includes("mp4") || blob.type.includes("m4a")) return "recording.m4a";
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
    form.append("durationSec", String(Math.max(1, Math.round(input.durationSec))));

    const response = await fetch("/api/analysis", { method: "POST", body: form });
    return unwrap<SpeakingAnalysisResponse>(response);
}

/** Chi tiết báo cáo luyện nói theo historyId. */
export async function getSpeakingHistoryDetail(
    historyId: string | number,
): Promise<SpeakingHistoryDetailResponse> {
    const response = await fetch(`/api/history/${historyId}`);
    return unwrap<SpeakingHistoryDetailResponse>(response);
}

/**
 * Danh sách lịch sử luyện nói của người dùng.
 * TODO: BE chưa có endpoint list → tạm trả rỗng. Khi BE bổ sung
 * (vd GET /api/v1/histories phân trang) thì nối vào đây qua route handler /api/histories.
 */
export async function getSpeakingHistoryList(): Promise<
    SpeakingHistoryListItem[]
> {
    return [];
}
