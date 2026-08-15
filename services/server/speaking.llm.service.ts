import { SpeakingSessionResponse } from "@/types/responses/speaking.llm.response";
import { ApiResponse } from "@/types/responses/base.response";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";
import { cache } from "react";

/**
 * Service phía server cho Speaking LLM.
 * Gọi trực tiếp backend Spring Boot từ Server Component (Next.js Server Side).
 */
export const getInProgressSessionDetailsServer = cache(
    async (sessionCode: string): Promise<SpeakingSessionResponse | null> => {
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
                `${process.env.API_URL}/speaking/session/details/${sessionCode}`,
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
