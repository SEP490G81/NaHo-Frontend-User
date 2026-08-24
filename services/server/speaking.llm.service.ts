import { redirect } from "next/navigation";
import { cache } from "react";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";
import { cookies } from "next/headers";
import { ApiResponse } from "@/types/responses/base.response";
import { SpeakingSessionStatus } from "@/types/enums/speaking.llm.enum";
import {
    SpeakingSessionListItemResponse,
    SpeakingSessionResponse,
} from "@/types/responses/speaking.llm.response";

/**
 * Lấy danh sách session theo trạng thái (IN_PROGRESS, COMPLETED) từ Server Side.
 */
export const getSpeakingSessionsByStatusServer = cache(
    async (
        status: SpeakingSessionStatus,
    ): Promise<SpeakingSessionListItemResponse[]> => {
        if (!process.env.API_URL) {
            return [];
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
        if (!accessToken) {
            return [];
        }

        try {
            const backendResponse = await fetch(
                `${process.env.API_URL}/speaking/session/all?status=${status}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    cache: "no-store",
                },
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
        if (!process.env.API_URL) {
            redirect("/persona-setup");
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
        if (!accessToken) {
            redirect("/persona-setup");
        }

        let backendResponse: Response;
        try {
            backendResponse = await fetch(
                `${process.env.API_URL}/speaking/session/details?sessionCode=${sessionCode}&status=${status}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    cache: "no-store",
                },
            );
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
        if (!process.env.API_URL) {
            redirect("/persona-setup");
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
        if (!accessToken) {
            redirect("/persona-setup");
        }

        let backendResponse: Response;
        try {
            backendResponse = await fetch(
                `${process.env.API_URL}/speaking/session/end/${sessionCode}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    cache: "no-store",
                },
            );
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
