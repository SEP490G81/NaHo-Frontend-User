import { redirect } from "next/navigation";
import { cache } from "react";
import { ApiResponse } from "@/types/responses/base.response";
import { SpeakingSessionStatus } from "@/types/enums/speaking.llm.enum";
import {
    SpeakingSessionListItemResponse,
    SpeakingSessionResponse,
} from "@/types/responses/speaking.llm.response";
import { fetchBackendWithAuth } from "./backend.fetch";

/**
 * Lấy danh sách session theo trạng thái (IN_PROGRESS, COMPLETED) từ Server Side.
 */
export const getSpeakingSessionsByStatusServer = cache(
    async (
        status: SpeakingSessionStatus,
    ): Promise<SpeakingSessionListItemResponse[]> => {
        try {
            const { response: backendResponse } = await fetchBackendWithAuth(
                `/speaking/session/all?status=${status}`,
            );

            if (!backendResponse.ok) {
                return [];
            }

            const result = await backendResponse.json();
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
        } catch {
            return [];
        }
    },
);

/**
 * Lấy chi tiết phiên hội thoại từ Server Side (GET /speaking/session/details?sessionCode={sessionCode}&status={status}).
 * Nếu response not ok hoặc không hợp lệ, redirect người dùng về /persona-setup.
 */
export const getSpeakingSessionDetailServer = cache(
    async (
        sessionCode: string,
        status:
            | SpeakingSessionStatus
            | string = SpeakingSessionStatus.IN_PROGRESS,
    ): Promise<SpeakingSessionResponse> => {
        let backendResponse: Response;
        try {
            const result = await fetchBackendWithAuth(
                `/speaking/session/details?sessionCode=${sessionCode}&status=${status}`,
            );
            backendResponse = result.response;
        } catch {
            redirect("/persona-setup");
        }

        if (!backendResponse.ok) {
            redirect("/persona-setup");
        }

        try {
            const result = await backendResponse.json();
            const data =
                (result as ApiResponse<SpeakingSessionResponse>).data ??
                (result as SpeakingSessionResponse);

            if (!data) {
                redirect("/persona-setup");
            }

            return data;
        } catch (error: unknown) {
            if (
                error &&
                typeof error === "object" &&
                "digest" in error &&
                typeof (error as { digest?: string }).digest === "string" &&
                (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
            ) {
                throw error;
            }
            redirect("/persona-setup");
        }
    },
);

/**
 * Gọi GET /speaking/session/end/{sessionCode} từ Server Side để tính/lấy thông tin phiên hội thoại cùng điểm đánh giá.
 * Trả về SpeakingSessionResponse chứa thông tin persona, session và speakingSessionAssessment.
 * Nếu response not ok hoặc không hợp lệ, redirect người dùng về /persona-setup.
 */
export const getSpeakingSessionAssessmentServer = cache(
    async (sessionCode: string): Promise<SpeakingSessionResponse> => {
        let backendResponse: Response;
        try {
            const result = await fetchBackendWithAuth(
                `/speaking/session/end/${sessionCode}`,
            );
            backendResponse = result.response;
        } catch {
            redirect("/persona-setup");
        }

        if (!backendResponse.ok) {
            redirect("/persona-setup");
        }

        try {
            const result = await backendResponse.json();
            const data =
                (result as ApiResponse<SpeakingSessionResponse>).data ??
                (result as SpeakingSessionResponse);

            if (!data) {
                redirect("/persona-setup");
            }

            return data;
        } catch (error: unknown) {
            if (
                error &&
                typeof error === "object" &&
                "digest" in error &&
                typeof (error as { digest?: string }).digest === "string" &&
                (error as { digest: string }).digest.startsWith("NEXT_REDIRECT")
            ) {
                throw error;
            }
            redirect("/persona-setup");
        }
    },
);
