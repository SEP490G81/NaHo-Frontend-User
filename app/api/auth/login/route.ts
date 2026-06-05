import { ProblemDetail } from "@/types/responses/base.response";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    const backendResponse = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    if (!backendResponse.ok) {
        const problemDetail: ProblemDetail = await backendResponse.json();
        return NextResponse.json(problemDetail, {
            status: backendResponse.status,
        });
    }

    const response = NextResponse.json({ status: backendResponse.status });

    const cookies = backendResponse.headers.getSetCookie();
    cookies.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
    });

    return response;
}
