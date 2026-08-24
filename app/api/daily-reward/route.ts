import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {ApiResponse, ProblemDetail} from "@/types/responses/base.response";
import {ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME} from "@/constants/app.constants";
import {UserDailyAttendanceResponse} from "@/types/responses/daily.reward.response";

/** Nhận phần thưởng điểm danh hàng ngày. */
export async function POST(request: Request) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;

    if (!accessToken) {
        return NextResponse.json(null, { status: 401 });
    }

    const body = await request.json();

    const backendResponse = await fetch(
        `${process.env.API_URL}/daily-rewards`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
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
        (result as ApiResponse<UserDailyAttendanceResponse>).data,
        {
            status: backendResponse.status,
        },
    );
}
