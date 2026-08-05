import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { ResetPasswordTokenResponse } from "@/types/responses/user.response";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    const backendResponse = await fetch(
        `${process.env.API_URL}/auth/forgot-password-otp`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            cache: "no-store",
        },
    );

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
        const problemDetail = result as ProblemDetail;
        if (backendResponse.status >= 500) {
            return NextResponse.json(
                { ...problemDetail, detail: "" },
                { status: backendResponse.status },
            );
        }
        return NextResponse.json(problemDetail, {
            status: backendResponse.status,
        });
    }

    return NextResponse.json(
        (result as ApiResponse<ResetPasswordTokenResponse>).data,
        { status: backendResponse.status },
    );
}
