import { ApiResponse } from "@/types/responses/base.response";
import { PersonaResponse } from "@/types/responses/persona.response";
import { cache } from "react";
import { fetchBackendWithAuth } from "./backend.fetch";

/**
 * Service phía server cho Persona AI.
 * Gọi trực tiếp backend Spring Boot từ Server Component kèm auto-rotate token khi 401.
 */
export const getAllPersonasServer = cache(
    async (): Promise<PersonaResponse[]> => {
        try {
            const { response: backendResponse } =
                await fetchBackendWithAuth("/personas");

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
