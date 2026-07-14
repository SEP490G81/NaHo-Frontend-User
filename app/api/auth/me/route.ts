import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { UserResponse } from "@/types/responses/user.response";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
    if (!accessToken) {
        return NextResponse.json(null, { status: 401 });
    }

    const backendResponse = await fetch(`${process.env.API_URL}/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
    });

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
        const problemDetail = result as ProblemDetail;
        return NextResponse.json(problemDetail, {
            status: backendResponse.status,
        });
    }

    return NextResponse.json((result as ApiResponse<UserResponse>).data, {
        status: backendResponse.status,
    });
}
