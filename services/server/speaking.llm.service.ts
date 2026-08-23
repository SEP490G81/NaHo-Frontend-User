import {
    SpeakingSessionAssessmentResponse,
    SpeakingSessionListItemResponse,
    SpeakingSessionResponse,
} from "@/types/responses/speaking.llm.response";
import { SpeakingSessionStatus } from "@/types/enums/speaking.llm.enum";
import { ApiResponse } from "@/types/responses/base.response";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";
import { cache } from "react";

/**
 * Service phía server cho Speaking LLM.
 * Gọi trực tiếp backend Spring Boot từ Server Component (Next.js Server Side).
 */
export const getInProgressSessionDetailsServer = cache(
    async (
        sessionCode: string,
        status: string = "IN_PROGRESS",
    ): Promise<SpeakingSessionResponse | null> => {
        if (!process.env.API_URL) {
            return null;
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
        if (!accessToken) {
            return null;
        }

        try {
            const backendResponse = await fetch(
                `${process.env.API_URL}/speaking/session/details?sessionCode=${sessionCode}&status=${status}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    cache: "no-store",
                },
            );

            if (!backendResponse.ok) {
                return null;
            }

            const result = await backendResponse.json();
            return (
                (result as ApiResponse<SpeakingSessionResponse>).data ??
                (result as SpeakingSessionResponse)
            );
        } catch {
            return null;
        }
    },
);

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
 * Gọi GET /speaking/session/end/{sessionCode} từ Server Side để tính/lấy điểm đánh giá phiên hội thoại.
 */
export const getSpeakingSessionAssessmentServer = cache(
    async (
        sessionCode: string,
    ): Promise<SpeakingSessionAssessmentResponse | null> => {
        if (!process.env.API_URL) {
            return null;
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
        if (!accessToken) {
            return null;
        }

        try {
            const backendResponse = await fetch(
                `${process.env.API_URL}/speaking/session/end/${sessionCode}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    cache: "no-store",
                },
            );

            if (!backendResponse.ok) {
                return null;
            }

            const result = await backendResponse.json();
            return (
                (result as ApiResponse<SpeakingSessionAssessmentResponse>).data ??
                (result as SpeakingSessionAssessmentResponse)
            );
        } catch {
            return null;
        }
    },
);

