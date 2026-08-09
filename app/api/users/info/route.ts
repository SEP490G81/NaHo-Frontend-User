import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { UserResponse } from "@/types/responses/user.response";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";

export async function PATCH(request: Request) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
    const authHeader = request.headers.get("authorization");

    const token =
        accessToken ||
        (authHeader && authHeader.startsWith("Bearer ")
            ? authHeader.substring(7)
            : "");

    if (!token) {
        return NextResponse.json(
            { detail: "Unauthenticated", status: 401 } as ProblemDetail,
            { status: 401 },
        );
    }

    let body = {};
    try {
        body = await request.json();
    } catch {
        // Fallback for empty body
    }

    const backendUrl = `${process.env.API_URL || "http://localhost:8386/api/v1"}/users/info`;

    const backendResponse = await fetch(backendUrl, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
    });

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
        const problemDetail = result as ProblemDetail;
        return NextResponse.json(problemDetail, {
            status: backendResponse.status,
        });
    }

    return NextResponse.json(result as ApiResponse<UserResponse>, {
        status: backendResponse.status,
    });
}
