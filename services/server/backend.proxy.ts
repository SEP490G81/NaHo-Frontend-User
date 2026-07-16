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
            { detail: "API_URL chưa được cấu hình trên server." } as ProblemDetail,
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
