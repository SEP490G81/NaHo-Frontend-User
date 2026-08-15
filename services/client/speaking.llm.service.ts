import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { ChatSessionMessageRequest } from "@/types/requests/speaking.llm.request";
import {
    AudioChatResponse,
    ChatResponse,
    SpeakingSessionResponse,
    StartConversationResponse,
} from "@/types/responses/speaking.llm.response";

/**
 * Service phía client cho các tính năng hội thoại Speaking LLM 1:1.
 * Gọi qua Next.js route handler (/api/speaking/session/*) cùng origin (pattern 2 lớp)
 * nhằm tránh CORS và tự động đính kèm access token từ cookie.
 */

async function unwrap<T>(response: Response): Promise<T> {
    const text = await response.text();
    let result: unknown = null;
    if (text) {
        try {
            result = JSON.parse(text);
        } catch {
            if (response.ok) {
                return text as unknown as T;
            }
            throw new Error(`Máy chủ phản hồi lỗi (HTTP ${response.status}).`);
        }
    }
    if (!response.ok) {
        throw new Error(
            (result as ProblemDetail)?.detail ||
                `Yêu cầu thất bại (HTTP ${response.status}).`,
        );
    }
    const apiResponse = result as ApiResponse<T>;
    if (
        apiResponse &&
        typeof apiResponse === "object" &&
        "data" in apiResponse
    ) {
        return apiResponse.data;
    }
    return result as T;
}

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

function fileNameFor(blob: Blob): string {
    if (blob instanceof File && blob.name) return blob.name;
    if (blob.type.includes("wav")) return "recording.wav";
    if (blob.type.includes("mp4") || blob.type.includes("m4a"))
        return "recording.m4a";
    if (blob.type.includes("ogg")) return "recording.ogg";
    return "recording.webm";
}

/**
 * 1. Khởi tạo phiên hội thoại với Persona
 * POST /speaking/session/persona/{personaId} -> trả về sessionCode (string)
 */
export async function startConversation(
    personaId: number | string,
): Promise<string> {
    const response = await apiRequest(
        `/api/speaking/session/persona/${personaId}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        },
    );
    return unwrap<string>(response);
}

/**
 * 2. Lấy câu chào đầu tiên của phiên hội thoại
 * POST /speaking/session/init/{sessionCode} -> trả về StartConversationResponse
 */
export async function initFirstGreeting(
    sessionCode: string,
): Promise<StartConversationResponse> {
    const response = await apiRequest(
        `/api/speaking/session/init/${sessionCode}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        },
    );
    return unwrap<StartConversationResponse>(response);
}

/**
 * 3. Lấy thông tin chi tiết phiên hội thoại đang diễn ra
 * GET /speaking/session/details/{sessionCode} -> trả về SpeakingSessionResponse
 */
export async function getInProgressSessionDetails(
    sessionCode: string,
): Promise<SpeakingSessionResponse> {
    const response = await apiRequest(
        `/api/speaking/session/details/${sessionCode}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        },
    );
    return unwrap<SpeakingSessionResponse>(response);
}

/**
 * 4. Gửi tin nhắn dạng văn bản (text transcript)
 * POST /speaking/session/message/{sessionCode} -> trả về ChatResponse
 */
export async function sendMessage(
    sessionCode: string,
    request: ChatSessionMessageRequest,
): Promise<ChatResponse> {
    const response = await apiRequest(
        `/api/speaking/session/message/${sessionCode}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request),
        },
    );
    return unwrap<ChatResponse>(response);
}

/**
 * 5. Gửi tin nhắn dạng audio ghi âm (multipart/form-data)
 * POST /speaking/session/audio/{sessionCode}?reference-text=... -> trả về AudioChatResponse
 */
export async function sendAudioMessage(
    sessionCode: string,
    file: Blob | File,
    referenceText?: string,
): Promise<AudioChatResponse> {
    const form = new FormData();
    form.append("file", file, fileNameFor(file));

    const query = referenceText
        ? `?reference-text=${encodeURIComponent(referenceText)}`
        : "";
    const response = await apiRequest(
        `/api/speaking/session/audio/${sessionCode}${query}`,
        {
            method: "POST",
            body: form,
        },
    );
    return unwrap<AudioChatResponse>(response);
}
