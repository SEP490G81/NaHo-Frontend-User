import { ApiResponse } from "@/types/responses/base.response";
import { PersonaResponse } from "@/types/responses/persona.response";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";
import { cache } from "react";

/**
 * Service phía server cho Persona AI.
 * Gọi trực tiếp backend Spring Boot từ Server Component.
 */
export const getAllPersonasServer = cache(
    async (): Promise<PersonaResponse[]> => {
        if (!process.env.API_URL) {
            return [];
        }

        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;

        try {
            const backendResponse = await fetch(
                `${process.env.API_URL}/personas`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(accessToken
                            ? { Authorization: `Bearer ${accessToken}` }
                            : {}),
                    },
                    cache: "no-store",
                },
            );

            if (!backendResponse.ok) {
                return [];
            }

            const result = await backendResponse.json();
            const data = (result as ApiResponse<PersonaResponse[]>).data;
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
