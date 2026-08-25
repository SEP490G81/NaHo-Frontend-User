import { cookies } from "next/headers";
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
} from "@/constants/app.constants";

export interface RotateResult {
    ok: boolean;
    status: number;
    accessToken?: string;
    refreshToken?: string;
    setCookieHeaders: string[];
}

export interface BackendFetchResult {
    response: Response;
    setCookieHeaders: string[];
    rotated: boolean;
    clearCookies: boolean;
}

// In-flight mutex để tránh gọi /auth/rotation đồng thời nhiều lần với cùng 1 refresh token
const inflightRotations = new Map<string, Promise<RotateResult>>();

/**
 * Phân tích các header Set-Cookie trả về từ Backend để lấy giá trị token
 */
export function parseCookieHeaders(cookieHeaders: string[]): Map<string, string> {
    const map = new Map<string, string>();
    for (const header of cookieHeaders) {
        const firstPart = header.split(";")[0];
        const eqIdx = firstPart.indexOf("=");
        if (eqIdx !== -1) {
            const name = firstPart.substring(0, eqIdx).trim();
            const value = firstPart.substring(eqIdx + 1).trim();
            map.set(name, value);
        }
    }
    return map;
}

/**
 * Thực hiện gọi endpoint rotate token ở Spring Boot Backend (`POST /auth/rotation`)
 * Có cơ chế deduplication (in-flight promise map) chống race-condition khi có nhiều request 401 cùng lúc.
 */
export async function rotateTokensOnServer(
    providedRefreshToken?: string,
): Promise<RotateResult> {
    if (!process.env.API_URL) {
        return { ok: false, status: 500, setCookieHeaders: [] };
    }

    const cookieStore = await cookies();
    const refreshToken =
        providedRefreshToken || cookieStore.get(REFRESH_TOKEN_NAME)?.value;

    if (!refreshToken) {
        return { ok: false, status: 401, setCookieHeaders: [] };
    }

    // Nếu đang có một request xoay token cùng refreshToken này, dùng chung Promise
    const existing = inflightRotations.get(refreshToken);
    if (existing) {
        return existing;
    }

    const rotationPromise = (async (): Promise<RotateResult> => {
        try {
            const backendResponse = await fetch(
                `${process.env.API_URL}/auth/rotation`,
                {
                    method: "POST",
                    cache: "no-store",
                    headers: {
                        Cookie: `${REFRESH_TOKEN_NAME}=${refreshToken}`,
                    },
                },
            );

            const setCookieHeaders =
                typeof backendResponse.headers.getSetCookie === "function"
                    ? backendResponse.headers.getSetCookie()
                    : backendResponse.headers.get("set-cookie")
                      ? [backendResponse.headers.get("set-cookie")!]
                      : [];

            if (!backendResponse.ok) {
                return {
                    ok: false,
                    status: backendResponse.status,
                    setCookieHeaders,
                };
            }

            const parsed = parseCookieHeaders(setCookieHeaders);
            const accessToken = parsed.get(ACCESS_TOKEN_NAME);
            const newRefreshToken = parsed.get(REFRESH_TOKEN_NAME);

            return {
                ok: true,
                status: backendResponse.status,
                accessToken,
                refreshToken: newRefreshToken,
                setCookieHeaders,
            };
        } catch (error) {
            console.error("Lỗi khi xoay token trên server:", error);
            return { ok: false, status: 500, setCookieHeaders: [] };
        } finally {
            inflightRotations.delete(refreshToken);
        }
    })();

    inflightRotations.set(refreshToken, rotationPromise);
    return rotationPromise;
}

/**
 * Hàm gọi API xuống Backend thật với cơ chế:
 * - Tự động đính kèm Access Token từ Cookie
 * - Bắt lỗi 401 (hết hạn Token)
 * - Tự động gọi Rotate Token lấy bộ Token mới
 * - Retry lại request ban đầu với Access Token mới
 * - Trả về response kèm danh sách header Set-Cookie mới để gắn vào Client Response
 */
export async function fetchBackendWithAuth(
    path: string,
    init: RequestInit = {},
    options?: {
        customToken?: string;
        autoRotate?: boolean;
    },
): Promise<BackendFetchResult> {
    if (!process.env.API_URL) {
        const errorResponse = new Response(
            JSON.stringify({
                detail: "API_URL chưa được cấu hình trên server.",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            },
        );
        return {
            response: errorResponse,
            setCookieHeaders: [],
            rotated: false,
            clearCookies: false,
        };
    }

    const autoRotate = options?.autoRotate !== false;
    const cookieStore = await cookies();
    let currentAccessToken =
        options?.customToken || cookieStore.get(ACCESS_TOKEN_NAME)?.value;

    const url = path.startsWith("http://") || path.startsWith("https://")
        ? path
        : `${process.env.API_URL}${path.startsWith("/") ? "" : "/"}${path}`;

    // Chuẩn bị headers
    const initialHeaders = new Headers(init.headers || {});
    if (currentAccessToken && !initialHeaders.has("Authorization")) {
        initialHeaders.set("Authorization", `Bearer ${currentAccessToken}`);
    }

    const initialResponse = await fetch(url, {
        ...init,
        headers: initialHeaders,
        cache: "no-store",
    });

    // Nếu không phải 401 hoặc tắt autoRotate -> trả về luôn
    if (initialResponse.status !== 401 || !autoRotate) {
        return {
            response: initialResponse,
            setCookieHeaders: [],
            rotated: false,
            clearCookies: false,
        };
    }

    // Gặp 401: Tiến hành Xoay Token (Token Rotation)
    console.log(`[BFF Proxy] Gặp lỗi 401 tại endpoint ${path} -> Đang tiến hành xoay token...`);
    const rotateResult = await rotateTokensOnServer();

    if (!rotateResult.ok || !rotateResult.accessToken) {
        console.warn(`[BFF Proxy] Xoay token thất bại (status: ${rotateResult.status}) -> Không thể retry request.`);
        return {
            response: initialResponse,
            setCookieHeaders: rotateResult.setCookieHeaders,
            rotated: false,
            clearCookies: true,
        };
    }

    console.log(`[BFF Proxy] Xoay token thành công! Đang retry request ${path} với access token mới...`);

    // Retry lại request ban đầu với Access Token mới
    const retryHeaders = new Headers(init.headers || {});
    retryHeaders.set("Authorization", `Bearer ${rotateResult.accessToken}`);

    const retryResponse = await fetch(url, {
        ...init,
        headers: retryHeaders,
        cache: "no-store",
    });

    return {
        response: retryResponse,
        setCookieHeaders: rotateResult.setCookieHeaders,
        rotated: true,
        clearCookies: false,
    };
}
