import { ProblemDetail } from "@/types/responses/base.response";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    const userAgent = request.headers.get("user-agent");
    const forwardedFor = request.headers.get("x-forwarded-for");

    const backendResponse = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "User-Agent": userAgent ?? "",
            "X-Forwarded-For": forwardedFor ?? "",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    if (!backendResponse.ok) {
        const result = await backendResponse.json();
        const problemDetail: ProblemDetail = result as ProblemDetail;
        return NextResponse.json(problemDetail, {
            status: backendResponse.status,
        });
    }

    const response = NextResponse.json(null, {
        status: backendResponse.status,
    });

    const cookies = backendResponse.headers.getSetCookie();
    cookies.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
    });

    return response;
}
