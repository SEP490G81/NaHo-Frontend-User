import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";
import { ProblemDetail } from "@/types/responses/base.response";

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

    const result = await backendResponse.json();
    return NextResponse.json(result, { status: backendResponse.status });
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

    const result = await backendResponse.json();
    return NextResponse.json(result, { status: backendResponse.status });
}

/**
 * Helper cho route handler (lớp 1): forward request JSON lên BE, tự đính kèm
 * access token. Chịu được response rỗng (BE trả 201 no-body).
 */
export async function proxyPostJson(path: string, request: Request) {
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

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    };

    const backendResponse = await fetch(`${process.env.API_URL}${path}`, {
        method: "POST",
        headers,
        body,
        cache: "no-store",
    });

    const text = await backendResponse.text();
    const result = text ? JSON.parse(text) : null;
    return NextResponse.json(result, { status: backendResponse.status });
}
