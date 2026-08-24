import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { PersonaResponse } from "@/types/responses/persona.response";

/**
 * Lấy danh sách toàn bộ Persona AI.
 * Gọi qua Next.js API route (/api/personas) trung gian trước khi tới backend (/api/v1/personas).
 *
 * @returns ApiResponse<PersonaResponse[]> chứa danh sách persona cùng metadata từ backend.
 */
export async function getAllPersonas(): Promise<
    ApiResponse<PersonaResponse[]>
> {
    const response = await fetch("/api/personas", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể lấy danh sách Persona.",
        );
    }

    return result as ApiResponse<PersonaResponse[]>;
}

/**
 * Lấy thông tin chi tiết Persona AI theo ID.
 * Gọi qua Next.js API route (/api/personas/[id]) trung gian trước khi tới backend (/api/v1/personas/[id]).
 *
 * @param id ID của persona cần lấy
 * @returns ApiResponse<PersonaResponse> chứa thông tin persona.
 */
export async function getPersonaById(
    id: number | string,
): Promise<ApiResponse<PersonaResponse>> {
    const response = await fetch(`/api/personas/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                `Không thể lấy thông tin Persona #${id}.`,
        );
    }

    return result as ApiResponse<PersonaResponse>;
}

/**
 * Bắt đầu một phiên hội thoại AI 1:1 với Persona.
 * Gọi POST /api/speaking/session/[personaId] -> BE trả sessionCode.
 *
 * @param personaId ID của persona
 * @returns sessionCode để điều hướng tới /live-chatroom/[sessionCode]
 */
export async function startConversation(
    personaId: number | string,
): Promise<string> {
    const response = await fetch(`/api/speaking/session/${personaId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
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
