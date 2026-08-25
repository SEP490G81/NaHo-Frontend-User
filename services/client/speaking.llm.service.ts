import { ApiResponse, ProblemDetail, ProblemDetailResponse } from "@/types/responses/base.response";
import { ChatSessionMessageRequest, StartConversationRequest } from "@/types/requests/speaking.llm.request";
import {
    ChatResponse,
    SpeakingSessionAssessmentResponse,
    SpeakingSessionListItemResponse,
    SpeakingSessionResponse,
} from "@/types/responses/speaking.llm.response";
import { clientFetch } from "./client.fetch";

/**
 * Bắt đầu phiên hội thoại AI 1:1.
 * Gọi POST /api/speaking/session/start -> BE /speaking/session/start
 */
export async function startConversation(
    req: StartConversationRequest,
): Promise<string> {
    const response = await clientFetch("/api/speaking/session/start", {
        method: "POST",
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
        const problem = result as ProblemDetail &
            ProblemDetailResponse & {
                detail?: string;
                message?: string;
                title?: string;
            };
        const errorCode = problem?.errorCode || (result as any)?.code || "";
        const errorDetail =
            problem?.detail ||
            problem?.message ||
            problem?.title ||
            "Không thể bắt đầu phiên trò chuyện với AI.";
        const err = new Error(errorDetail) as Error & {
            errorCode?: string;
            problem?: ProblemDetailResponse;
        };
        if (errorCode) {
            err.errorCode = errorCode;
        }
        err.problem = problem;
        throw err;
    }

    if (typeof result === "string") {
        return result;
    }
    return result?.data ?? result?.sessionCode ?? String(result);
}

/**
 * Gửi tin nhắn dạng văn bản trong phiên hội thoại AI 1:1.
 * Gọi POST /api/speaking/session/message
 */
export async function sendTextMessage(
    req: ChatSessionMessageRequest,
): Promise<ChatResponse> {
    const response = await clientFetch("/api/speaking/session/message", {
        method: "POST",
        body: JSON.stringify(req),
    });

    const result = await response.json();

    if (!response.ok) {
        const problem = result as ProblemDetail &
            ProblemDetailResponse & {
                detail?: string;
                message?: string;
                title?: string;
            };
        const errorCode =
            problem?.errorCode || (result as any)?.code || problem?.title;
        const err = new Error(
            problem?.detail ||
                problem?.message ||
                problem?.title ||
                "Không thể gửi tin nhắn.",
        ) as Error & {
            errorCode?: string;
            status?: number;
            problem?: ProblemDetailResponse;
        };
        if (errorCode) {
            err.errorCode = errorCode;
        }
        err.status = response.status;
        err.problem = problem;
        throw err;
    }

    return ((result as ApiResponse<ChatResponse>).data ??
        result) as ChatResponse;
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

    const response = await clientFetch(
        `/api/speaking/session/audio/${sessionCode}`,
        {
            method: "POST",
            body: formData,
        },
    );

    const result = await response.json();

    if (!response.ok) {
        const problem = result as ProblemDetail &
            ProblemDetailResponse & {
                detail?: string;
                message?: string;
                title?: string;
            };
        const errorCode =
            problem?.errorCode || (result as any)?.code || problem?.title;
        const err = new Error(
            problem?.detail ||
                problem?.message ||
                problem?.title ||
                "Không thể gửi file âm thanh.",
        ) as Error & {
            errorCode?: string;
            status?: number;
            problem?: ProblemDetailResponse;
        };
        if (errorCode) {
            err.errorCode = errorCode;
        }
        err.status = response.status;
        err.problem = problem;
        throw err;
    }

    return ((result as ApiResponse<ChatResponse>).data ??
        result) as ChatResponse;
}

/**
 * Lấy danh sách session theo status cho client side.
 * Gọi GET /api/speaking/session/all?status={status}
 */
export async function getSpeakingSessionsByStatus(
    status: string,
): Promise<SpeakingSessionListItemResponse[]> {
    try {
        const response = await clientFetch(
            `/api/speaking/session/all?status=${status}`,
            {
                method: "GET",
                cache: "no-store",
            },
        );

        const result = await response.json();
        if (!response.ok) {
            return [];
        }

        const data = (result as ApiResponse<SpeakingSessionListItemResponse[]>)
            .data;
        if (Array.isArray(data)) {
            return data;
        }
        if (Array.isArray(result)) {
            return result;
        }
        return [];
    } catch {
        return [];
    }
}

/**
 * Kết thúc phiên hội thoại và nhận báo cáo đánh giá.
 * Gọi POST /api/speaking/session/end/{sessionCode}
 */
export async function endSpeakingSession(
    sessionCode: string,
): Promise<SpeakingSessionAssessmentResponse> {
    const response = await clientFetch(
        `/api/speaking/session/end/${sessionCode}`,
        {
            method: "POST",
        },
    );

    const result = await response.json();
    if (!response.ok) {
        const problem = result as ProblemDetail &
            ProblemDetailResponse & {
                detail?: string;
                message?: string;
                title?: string;
            };
        const errorCode = problem?.errorCode || (result as any)?.code || "";
        const errorMsg =
            problem?.detail ||
            problem?.message ||
            problem?.title ||
            "Không thể kết thúc phiên hội thoại.";
        const err = new Error(errorMsg) as Error & {
            errorCode?: string;
            problem?: ProblemDetailResponse;
        };
        if (errorCode) {
            err.errorCode = errorCode;
        }
        err.problem = problem;
        throw err;
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
    try {
        const response = await clientFetch(
            `/api/speaking/session/details?sessionCode=${sessionCode}&status=${status}`,
            {
                method: "GET",
                cache: "no-store",
            },
        );

        const result = await response.json();
        if (!response.ok) {
            return null;
        }

        return ((result as ApiResponse<SpeakingSessionResponse>).data ??
            result) as SpeakingSessionResponse;
    } catch {
        return null;
    }
}
