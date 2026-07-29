import { cookies } from "next/headers";
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
} from "@/constants/app.constants";
import { NextResponse } from "next/server";
import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { UserDailyMissionResponse } from "@/types/responses/daily.mission.response";

export async function GET() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;

    if (!accessToken) {
        return NextResponse.json(null, { status: 401 });
    }

    const backendResponse = await fetch(
        `${process.env.API_URL}/user-daily-missions/today`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        },
    );

    if (backendResponse.status === 401) {
        const response = NextResponse.json(null, {
            status: 401,
        });

        response.cookies.delete(ACCESS_TOKEN_NAME);
        response.cookies.delete(REFRESH_TOKEN_NAME);

        return response;
    }

    const result = await backendResponse.json();

    if (!backendResponse.ok) {
        const problemDetail = result as ProblemDetail;
        return NextResponse.json(problemDetail, {
            status: backendResponse.status,
        });
    }

    return NextResponse.json(
        (result as ApiResponse<UserDailyMissionResponse[]>).data,
        {
            status: backendResponse.status,
        },
    );
}
