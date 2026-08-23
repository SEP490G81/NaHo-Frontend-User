import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import {
    ChatSessionMessageRequest,
    InitFirstGreetingRequest,
    StartConversationRequest,
} from "@/types/requests/speaking.llm.request";
import {
    ChatResponse,
    SpeakingSessionAssessmentResponse,
    SpeakingSessionListItemResponse,
    SpeakingSessionResponse,
    StartConversationResponse,
} from "@/types/responses/speaking.llm.response";

/**
 * Bắt đầu phiên hội thoại AI 1:1.
 * Gọi POST /api/speaking/session/start -> BE /speaking/session/start
 */
export async function startConversation(
    req: StartConversationRequest,
): Promise<string> {
    const response = await fetch("/api/speaking/session/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
    });

    const text = await response.text();
    let result: any = null;
    if (text) {
        try {
            result = JSON.parse(text);
        } catch {
            result = text;
        }
    }

    if (!response.ok) {
        const errorDetail =
            result?.detail ||
            result?.title ||
            "Không thể bắt đầu phiên trò chuyện với AI.";
        throw new Error(errorDetail);
    }

    if (typeof result === "string") {
        return result;
    }
    return result?.data ?? result?.sessionCode ?? String(result);
}

/**
 * Khởi tạo câu chào đầu tiên của phiên hội thoại AI 1:1.
 * Gọi POST /api/speaking/session/init/{sessionCode}
 */
export async function initFirstGreeting(
    sessionCode: string,
    req?: InitFirstGreetingRequest,
): Promise<StartConversationResponse> {
    const response = await fetch(`/api/speaking/session/init/${sessionCode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req || {}),
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        const err = new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể khởi tạo lời chào từ AI.",
        );
        (err as any).errorCode = problemDetail?.title || (result as any)?.code;
        throw err;
    }

    return ((result as ApiResponse<StartConversationResponse>).data ??
        result) as StartConversationResponse;
}

/**
 * Lấy thông tin chi tiết phiên hội thoại dở/đang diễn ra.
 * Gọi GET /api/speaking/session/details?sessionCode={sessionCode}&status={status}
 */
export async function getInProgressSessionDetails(
    sessionCode: string,
    status: string = "IN_PROGRESS",
): Promise<SpeakingSessionResponse> {
    const response = await fetch(
        `/api/speaking/session/details?sessionCode=${sessionCode}&status=${status}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        },
    );

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        const err = new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể lấy thông tin chi tiết phiên hội thoại.",
        );
        (err as any).errorCode = (result as any)?.code || problemDetail?.title;
        (err as any).status = response.status;
        throw err;
    }

    return ((result as ApiResponse<SpeakingSessionResponse>).data ??
        result) as SpeakingSessionResponse;
}

/**
 * Gửi tin nhắn dạng văn bản trong phiên hội thoại AI 1:1.
 * Gọi POST /api/speaking/session/message
 */
export async function sendTextMessage(
    req: ChatSessionMessageRequest,
): Promise<ChatResponse> {
    const response = await fetch("/api/speaking/session/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        const err = new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể gửi tin nhắn.",
        );
        (err as any).errorCode = (result as any)?.code || problemDetail?.title;
        (err as any).status = response.status;
        throw err;
    }

    return ((result as ApiResponse<ChatResponse>).data ?? result) as ChatResponse;
}

/**
 * Gửi tin nhắn bằng audio file (ghi âm) trong phiên hội thoại AI 1:1.
 * Gọi POST /api/speaking/session/audio/{sessionCode}
 */
export async function sendAudioMessage(
    sessionCode: string,
    audioFile: Blob | File,
): Promise<ChatResponse> {
    const formData = new FormData();
    const fileToUpload =
        audioFile instanceof File
            ? audioFile
            : new File([audioFile], `audio-${Date.now()}.webm`, {
                  type: audioFile.type || "audio/webm",
              });
    formData.append("file", fileToUpload);

    const response = await fetch(`/api/speaking/session/audio/${sessionCode}`, {
        method: "POST",
        body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        const err = new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể gửi file âm thanh.",
        );
        (err as any).errorCode = (result as any)?.code || problemDetail?.title;
        (err as any).status = response.status;
        throw err;
    }

    return ((result as ApiResponse<ChatResponse>).data ?? result) as ChatResponse;
}

/**
 * Lấy danh sách session theo status cho client side.
 * Gọi GET /api/speaking/session/all?status={status}
 */
export async function getSpeakingSessionsByStatus(
    status: string,
): Promise<SpeakingSessionListItemResponse[]> {
    const response = await fetch(
        `/api/speaking/session/all?status=${status}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        },
    );

    const result = await response.json();
    if (!response.ok) {
        return [];
    }

    const data = (
        result as ApiResponse<SpeakingSessionListItemResponse[]>
    ).data;
    if (Array.isArray(data)) {
        return data;
    }
    if (Array.isArray(result)) {
        return result;
    }
    return [];
}

/**
 * Kết thúc phiên hội thoại và nhận báo cáo đánh giá.
 * Gọi POST /api/speaking/session/end/{sessionCode}
 */
export async function endSpeakingSession(
    sessionCode: string,
): Promise<SpeakingSessionAssessmentResponse> {
    const response = await fetch(`/api/speaking/session/end/${sessionCode}`, {
        method: "POST",
    });

    const result = await response.json();
    if (!response.ok) {
        throw new Error(
            result?.detail || result?.message || "Không thể kết thúc phiên hội thoại.",
        );
    }

    return ((result as ApiResponse<SpeakingSessionAssessmentResponse>).data ??
        result) as SpeakingSessionAssessmentResponse;
}

/**
 * Lấy chi tiết phiên hội thoại (bao gồm assessment và transcript).
 * Gọi GET /api/speaking/session/details?sessionCode={sessionCode}&status={status}
 */
export async function getSpeakingSessionDetailClient(
    sessionCode: string,
    status: string = "COMPLETED",
): Promise<SpeakingSessionResponse | null> {
    const response = await fetch(
        `/api/speaking/session/details?sessionCode=${sessionCode}&status=${status}`,
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        },
    );

    const result = await response.json();
    if (!response.ok) {
        return null;
    }

    return ((result as ApiResponse<SpeakingSessionResponse>).data ??
        result) as SpeakingSessionResponse;
}

/**
 * Lấy hoặc kết thúc phiên và nhận điểm đánh giá từ AI (GET /api/speaking/session/end/{sessionCode}).
 */
export async function getOrEndSpeakingSessionAssessment(
    sessionCode: string,
): Promise<SpeakingSessionAssessmentResponse | null> {
    const response = await fetch(`/api/speaking/session/end/${sessionCode}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });

    const result = await response.json();
    if (!response.ok) {
        return null;
    }

    return ((result as ApiResponse<SpeakingSessionAssessmentResponse>).data ??
        result) as SpeakingSessionAssessmentResponse;
}
