import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { UserLearningProgressResponse } from "@/types/responses/league.response";
import { ACCESS_TOKEN_NAME } from "@/constants/app.constants";

// BE v2: GET /api/v2/user-learning-progresses/me (thay endpoint v1 đã @Deprecated
// forRemoval). API_URL đang pin ".../api/v1" nên đổi hậu tố sang "/v2" cho đúng URL.
const V2_BASE = process.env.API_URL?.replace(/\/v1$/, "/v2");

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
    if (!accessToken) {
        return NextResponse.json(null, { status: 401 });
    }

    const backendResponse = await fetch(
        `${V2_BASE}/user-learning-progresses/me`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        },
    );

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
        return NextResponse.json(result as ProblemDetail, {
            status: backendResponse.status,
        });
    }

    return NextResponse.json(
        (result as ApiResponse<UserLearningProgressResponse>).data,
        { status: backendResponse.status },
    );
}
