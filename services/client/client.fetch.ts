import { ApiError } from "@/libs/api.error";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";

// Mutex deduplication ở client để tránh nhiều request 401 cùng gọi /api/auth/rotation
let currentRotationPromise: Promise<boolean> | null = null;

/**
 * Gọi API rotate token từ phía client với cơ chế deduplication
 */
export async function rotateTokenClient(): Promise<boolean> {
    if (currentRotationPromise) {
        return currentRotationPromise;
    }

    currentRotationPromise = (async () => {
        try {
            const res = await fetch("/api/auth/rotation", {
                method: "POST",
                credentials: "include",
            });
            return res.ok;
        } catch (err) {
            console.error("Lỗi xoay token ở client:", err);
            return false;
        } finally {
            currentRotationPromise = null;
        }
    })();

    return currentRotationPromise;
}

/**
 * Hàm fetch trung tâm cho toàn bộ Client Services.
 * - Tự động đính kèm `credentials: "include"` để gửi cookie
 * - Tự động thiết lập Content-Type = application/json nếu body không phải FormData
 * - Nếu gặp lỗi 401 (hết hạn token):
 *     + Tự động gọi rotateTokenClient()
 *     + Nếu xoay token thành công, tự động retry request ban đầu
 *     + Trả về kết quả sau retry
 */
export async function clientFetch(
    url: string,
    init: RequestInit = {},
    options?: { autoRotate?: boolean },
): Promise<Response> {
    const autoRotate = options?.autoRotate !== false;
    const headers = new Headers(init.headers || {});

    if (!(init.body instanceof FormData) && !headers.has("Content-Type") && init.body) {
        headers.set("Content-Type", "application/json");
    }

    const requestInit: RequestInit = {
        ...init,
        headers,
        credentials: "include",
    };

    let response = await fetch(url, requestInit);

    // Bắt lỗi 401 Unauthorized và tự động xoay token + retry
    if (response.status === 401 && autoRotate) {
        console.log(`[Client Service] API ${url} bị 401 -> Đang xoay token...`);
        const rotated = await rotateTokenClient();

        if (rotated) {
            console.log(`[Client Service] Xoay token thành công -> Đang retry API ${url}...`);
            response = await fetch(url, requestInit);
        } else {
            console.warn(`[Client Service] Xoay token thất bại cho API ${url}.`);
        }
    }

    return response;
}

/**
 * Bóc tách envelope `{ data: T }` từ ApiResponse nếu có, hoặc trả về payload trực tiếp
 */
export function unwrapData<T>(result: unknown): T {
    const r = result as ApiResponse<T> & T;
    return (r?.data ?? r) as T;
}

/**
 * Helper gọi API và parse JSON response chuẩn cho Client Services
 */
export async function clientFetchJson<T>(
    url: string,
    init: RequestInit = {},
): Promise<T> {
    const response = await clientFetch(url, init);
    const text = await response.text();

    let result: unknown = null;
    if (text) {
        try {
            result = JSON.parse(text);
        } catch {
            if (response.ok) {
                return text as unknown as T;
            }
            throw new Error(`Máy chủ phản hồi không hợp lệ (HTTP ${response.status}).`);
        }
    }

    if (!response.ok) {
        const problem = result as ProblemDetail;
        if (problem?.detail || problem?.title || problem?.status) {
            throw new ApiError(problem);
        }
        throw new Error(
            (problem as { message?: string })?.message ||
                `Yêu cầu thất bại (HTTP ${response.status}).`,
        );
    }

    return unwrapData<T>(result);
}

/**
 * Helper gọi API trả về text thuần (ví dụ raw sessionCode string)
 */
export async function clientFetchText(
    url: string,
    init: RequestInit = {},
): Promise<string> {
    const response = await clientFetch(url, init);
    const text = await response.text();

    if (!response.ok) {
        let detail = `Yêu cầu thất bại (HTTP ${response.status}).`;
        if (text) {
            try {
                const parsed = JSON.parse(text);
                detail = parsed?.detail || parsed?.title || parsed?.message || detail;
            } catch {
                detail = text.slice(0, 300);
            }
        }
        throw new Error(detail);
    }

    return text;
}
