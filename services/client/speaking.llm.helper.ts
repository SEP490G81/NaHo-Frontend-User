import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";

export async function unwrap<T>(response: Response): Promise<T> {
    const text = await response.text();
    let result: unknown = null;
    if (text) {
        try {
            result = JSON.parse(text);
        } catch {
            if (response.ok) {
                return text as unknown as T;
            }
            throw new Error(`Máy chủ phản hồi lỗi (HTTP ${response.status}).`);
        }
    }
    if (!response.ok) {
        throw new Error(
            (result as ProblemDetail)?.detail ||
                `Yêu cầu thất bại (HTTP ${response.status}).`,
        );
    }
    const apiResponse = result as ApiResponse<T>;
    if (
        apiResponse &&
        typeof apiResponse === "object" &&
        "data" in apiResponse
    ) {
        return apiResponse.data;
    }
    return result as T;
}

export async function apiRequest(
    input: string,
    init?: RequestInit,
): Promise<Response> {
    let response = await fetch(input, init);
    if (response.status === 401) {
        const rotated = await fetch("/api/auth/rotation", {
            method: "POST",
            credentials: "include",
        });
        if (rotated.ok) {
            response = await fetch(input, init);
        }
    }
    return response;
}

export function fileNameFor(blob: Blob): string {
    if (blob instanceof File && blob.name) return blob.name;
    if (blob.type.includes("wav")) return "recording.wav";
    if (blob.type.includes("mp4") || blob.type.includes("m4a"))
        return "recording.m4a";
    if (blob.type.includes("ogg")) return "recording.ogg";
    return "recording.webm";
}
