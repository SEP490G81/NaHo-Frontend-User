import {
    ChatSessionMessageRequest,
    EndSessionRequest,
} from "@/types/requests/speaking.llm.request";
import {
    AudioChatResponse,
    ChatResponse,
    ScoringResponse,
    SpeakingSessionResponse,
    StartConversationResponse,
} from "@/types/responses/speaking.llm.response";
import {
    apiRequest,
    fileNameFor,
    unwrap,
} from "./speaking.llm.helper";

/**
 * Service phía client cho các tính năng hội thoại Speaking LLM 1:1.
 * Gọi qua Next.js route handler (/api/speaking/session/*) cùng origin (pattern 2 lớp)
 * nhằm tránh CORS và tự động đính kèm access token từ cookie.
 */

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
        },
    );
    const result = await unwrap<unknown>(response);
    if (typeof result === "string") {
        return result.trim().replace(/^"|"$/g, "");
    }
    if (result && typeof result === "object") {
        const record = result as Record<string, unknown>;
        if (typeof record.sessionCode === "string") {
            return record.sessionCode.trim().replace(/^"|"$/g, "");
        }
        if (typeof record.data === "string") {
            return record.data.trim().replace(/^"|"$/g, "");
        }
        if (typeof record.raw === "string") {
            return record.raw.trim().replace(/^"|"$/g, "");
        }
        if (
            record.data &&
            typeof record.data === "object" &&
            typeof (record.data as Record<string, unknown>).sessionCode ===
                "string"
        ) {
            return (
                (record.data as Record<string, unknown>).sessionCode as string
            )
                .trim()
                .replace(/^"|"$/g, "");
        }
    }
    return "";
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

/**
 * 6. Kết thúc phiên hội thoại và chấm điểm
 * POST /speaking/session/end/{sessionCode} -> trả về ScoringResponse
 */
export async function endSpeakingSession(
    sessionCode: string,
    request: EndSessionRequest = {},
): Promise<ScoringResponse> {
    const response = await apiRequest(
        `/api/speaking/session/end/${sessionCode}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request),
        },
    );
    return unwrap<ScoringResponse>(response);
}

/**
 * 7. Lấy danh sách các phiên hội thoại đang dở (IN_PROGRESS)
 * GET /speaking/session/in-progress/all -> trả về SpeakingSessionResponse[]
 */
export async function getInProgressSessions(): Promise<
    SpeakingSessionResponse[]
> {
    const response = await apiRequest(
        "/api/speaking/session/in-progress/all",
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        },
    );
    return unwrap<SpeakingSessionResponse[]>(response);
}
