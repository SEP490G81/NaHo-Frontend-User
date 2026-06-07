import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { NextResponse } from "next/server";
import { TokenExpResponse } from "@/types/responses/user.response";

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

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
        const problemDetail: ProblemDetail = result as ProblemDetail;
        return NextResponse.json(problemDetail, {
            status: backendResponse.status,
        });
    }

    const tokenExpResponse = (result as ApiResponse<TokenExpResponse>).data;

    const response = NextResponse.json(tokenExpResponse, {
        status: backendResponse.status,
    });

    const cookies = backendResponse.headers.getSetCookie();
    cookies.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
    });

    return response;
}
