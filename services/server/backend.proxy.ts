import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";
import { ProblemDetail } from "@/types/responses/base.response";

/**
 * Chuyển tiếp response của BE thành JSON, giữ nguyên status. Nếu BE trả về
 * non-JSON (vd trang lỗi 500 "Whitelabel Error Page" của Spring là HTML), bọc
 * lại thành { detail } thay vì để route handler crash → tránh client nhận HTML
 * rồi vỡ khi parse ("Unexpected token '<'").
 */
async function forwardJson(backendResponse: Response) {
    const text = await backendResponse.text();

    console.log(">>> check text: ", text);

    let body: unknown = null;
    if (text) {
        try {
            body = JSON.parse(text);
        } catch {
            if (backendResponse.ok) {
                // Backend trả 2xx dạng text thuần (ví dụ raw sessionCode string), không phải JSON
                return NextResponse.json(text, {
                    status: backendResponse.status,
                });
            }
            body = {
                detail: `Máy chủ trả về phản hồi không hợp lệ (HTTP ${backendResponse.status}).`,
                status: backendResponse.status,
                raw: text.slice(0, 300),
            };
        }
    }
    return NextResponse.json(body, { status: backendResponse.status });
}

/**
 * Helper cho route handler (lớp 1): gọi BE cùng server (tránh CORS), tự forward
 * access token từ cookie và query params. Dùng chung cho mọi proxy GET → BE.
 */
export async function proxyGet(path: string, search?: URLSearchParams) {
    if (!process.env.API_URL) {
        return NextResponse.json(
            {
                detail: "API_URL chưa được cấu hình trên server.",
            } as ProblemDetail,
            { status: 500 },
        );
    }

    const accessToken = (await cookies()).get(ACCESS_TOKEN_NAME)?.value;
    const url = new URL(`${process.env.API_URL}${path}`);
    search?.forEach((value, key) => url.searchParams.set(key, value));

    const backendResponse = await fetch(url.toString(), {
        headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        cache: "no-store",
    });

    return forwardJson(backendResponse);
}

/**
 * Helper cho route handler (lớp 1): forward request multipart/form-data lên BE
 * (giữ nguyên các part file/text), tự đính kèm access token từ cookie. Không tự
 * set Content-Type để fetch tự sinh boundary cho FormData.
 */
export async function proxyPostForm(path: string, request: Request) {
    if (!process.env.API_URL) {
        return NextResponse.json(
            {
                detail: "API_URL chưa được cấu hình trên server.",
            } as ProblemDetail,
            { status: 500 },
        );
    }

    const accessToken = (await cookies()).get(ACCESS_TOKEN_NAME)?.value;
    const form = await request.formData();

    const backendResponse = await fetch(`${process.env.API_URL}${path}`, {
        method: "POST",
        headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: form,
        cache: "no-store",
    });

    return forwardJson(backendResponse);
}

/**
 * Helper cho route handler (lớp 1): forward request multipart/form-data PATCH lên BE
 * (giữ nguyên các part file/text), tự đính kèm access token từ cookie.
 */
export async function proxyPatchForm(path: string, request: Request) {
    if (!process.env.API_URL) {
        return NextResponse.json(
            {
                detail: "API_URL chưa được cấu hình trên server.",
            } as ProblemDetail,
            { status: 500 },
        );
    }

    const accessToken = (await cookies()).get(ACCESS_TOKEN_NAME)?.value;
    const form = await request.formData();

    const backendResponse = await fetch(`${process.env.API_URL}${path}`, {
        method: "PATCH",
        headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: form,
        cache: "no-store",
    });

    return forwardJson(backendResponse);
}

/**
 * Helper cho route handler (lớp 1): forward request JSON lên BE với method tuỳ ý
 * (POST/PUT/DELETE), tự đính kèm access token. Chịu được response rỗng (BE trả
 * 201/204 no-body). DELETE có body được BE dùng cho lệnh xoá theo id.
 */
export async function proxyBodyJson(
    method: "POST" | "PUT" | "DELETE" | "PATCH",
    path: string,
    request: Request,
) {
    if (!process.env.API_URL) {
        return NextResponse.json(
            {
                detail: "API_URL chưa được cấu hình trên server.",
            } as ProblemDetail,
            { status: 500 },
        );
    }

    const accessToken = (await cookies()).get(ACCESS_TOKEN_NAME)?.value;
    const idempotencyKey = request.headers.get("Idempotency-Key");
    const body = await request.text();
    const hasBody = Boolean(body && body.trim().length > 0);

    const headers: Record<string, string> = {
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    };

    const backendResponse = await fetch(`${process.env.API_URL}${path}`, {
        method,
        headers,
        body: hasBody ? body : undefined,
        cache: "no-store",
    });

    return forwardJson(backendResponse);
}

/**
 * Helper cho route handler (lớp 1): forward request JSON lên BE, tự đính kèm
 * access token. Chịu được response rỗng (BE trả 201 no-body).
 */
export async function proxyPostJson(path: string, request: Request) {
    return proxyBodyJson("POST", path, request);
}

/**
 * Helper cho route handler (lớp 1): forward request DELETE lên BE, tự đính kèm
 * access token. Hỗ trợ response rỗng (BE trả 204 no-content).
 */
export async function proxyDelete(path: string) {
    if (!process.env.API_URL) {
        return NextResponse.json(
            {
                detail: "API_URL chưa được cấu hình trên server.",
            } as ProblemDetail,
            { status: 500 },
        );
    }

    const accessToken = (await cookies()).get(ACCESS_TOKEN_NAME)?.value;

    const backendResponse = await fetch(`${process.env.API_URL}${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        cache: "no-store",
    });

    if (backendResponse.status === 204) {
        return new NextResponse(null, { status: 204 });
    }

    return forwardJson(backendResponse);
}
