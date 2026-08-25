import { NextResponse } from "next/server";
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "@/constants/app.constants";
import { fetchBackendWithAuth } from "./backend.fetch";

/**
 * Chuyển tiếp response của BE thành JSON, giữ nguyên status và đính kèm Set-Cookie
 * nếu có (khi xoay token thành công) hoặc xóa cookie nếu xoay token thất bại.
 */
async function forwardJson(
    backendResponse: Response,
    setCookieHeaders: string[] = [],
    clearCookies: boolean = false,
) {
    const text = await backendResponse.text();

    let body: unknown = null;
    let nextResponse: NextResponse;

    if (text) {
        try {
            body = JSON.parse(text);
            nextResponse = NextResponse.json(body, {
                status: backendResponse.status,
            });
        } catch {
            if (backendResponse.ok) {
                // Backend trả 2xx dạng text thuần (ví dụ raw sessionCode string)
                nextResponse = NextResponse.json(text, {
                    status: backendResponse.status,
                });
            } else {
                body = {
                    detail: `Máy chủ trả về phản hồi không hợp lệ (HTTP ${backendResponse.status}).`,
                    status: backendResponse.status,
                    raw: text.slice(0, 300),
                };
                nextResponse = NextResponse.json(body, {
                    status: backendResponse.status,
                });
            }
        }
    } else {
        if (backendResponse.status === 204) {
            nextResponse = new NextResponse(null, { status: 204 });
        } else {
            nextResponse = NextResponse.json(null, {
                status: backendResponse.status,
            });
        }
    }

    if (clearCookies) {
        nextResponse.cookies.delete(ACCESS_TOKEN_NAME);
        nextResponse.cookies.delete(REFRESH_TOKEN_NAME);
    } else if (setCookieHeaders && setCookieHeaders.length > 0) {
        setCookieHeaders.forEach((cookie) => {
            nextResponse.headers.append("set-cookie", cookie);
        });
    }

    return nextResponse;
}

/**
 * Helper cho route handler (lớp 1): gọi BE GET với tự động forward token,
 * bắt lỗi 401, tự động xoay token và retry.
 */
export async function proxyGet(path: string, search?: URLSearchParams) {
    let finalPath = path;
    if (search && search.toString()) {
        const separator = finalPath.includes("?") ? "&" : "?";
        finalPath = `${finalPath}${separator}${search.toString()}`;
    }

    const result = await fetchBackendWithAuth(finalPath, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return forwardJson(
        result.response,
        result.setCookieHeaders,
        result.clearCookies,
    );
}

/**
 * Helper cho route handler: forward request multipart/form-data POST lên BE
 * kèm auto-rotate token và retry khi gặp lỗi 401.
 */
export async function proxyPostForm(path: string, request: Request) {
    const form = await request.formData();

    const result = await fetchBackendWithAuth(path, {
        method: "POST",
        body: form,
    });

    return forwardJson(
        result.response,
        result.setCookieHeaders,
        result.clearCookies,
    );
}

/**
 * Helper cho route handler: forward request multipart/form-data PATCH lên BE
 * kèm auto-rotate token và retry khi gặp lỗi 401.
 */
export async function proxyPatchForm(path: string, request: Request) {
    const form = await request.formData();

    const result = await fetchBackendWithAuth(path, {
        method: "PATCH",
        body: form,
    });

    return forwardJson(
        result.response,
        result.setCookieHeaders,
        result.clearCookies,
    );
}

/**
 * Helper cho route handler: forward request JSON lên BE với method tuỳ ý
 * (POST/PUT/DELETE/PATCH), tự đính kèm token, auto-rotate và retry trên 401.
 */
export async function proxyBodyJson(
    method: "POST" | "PUT" | "DELETE" | "PATCH",
    path: string,
    request: Request,
) {
    const idempotencyKey = request.headers.get("Idempotency-Key");
    const body = await request.text();
    const hasBody = Boolean(body && body.trim().length > 0);

    const headers: Record<string, string> = {
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    };

    const result = await fetchBackendWithAuth(path, {
        method,
        headers,
        body: hasBody ? body : undefined,
    });

    return forwardJson(
        result.response,
        result.setCookieHeaders,
        result.clearCookies,
    );
}

/**
 * Helper cho route handler: forward request POST JSON lên BE.
 */
export async function proxyPostJson(path: string, request: Request) {
    return proxyBodyJson("POST", path, request);
}

/**
 * Helper cho route handler: forward request DELETE lên BE.
 */
export async function proxyDelete(path: string) {
    const result = await fetchBackendWithAuth(path, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    return forwardJson(
        result.response,
        result.setCookieHeaders,
        result.clearCookies,
    );
}
