import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { NextResponse } from "next/server";
import { REFRESH_TOKEN_NAME } from "@/constants/app.constants";
import { cookies } from "next/headers";
import { TokenExpResponse } from "@/types/responses/user.response";

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

    if (!refreshToken) {
        return NextResponse.json(null, { status: 401 });
    }

    const backendResponse = await fetch(
        `${process.env.API_URL}/auth/rotation`,
        {
            method: "POST",
            cache: "no-store",
            headers: {
                Cookie: `${REFRESH_TOKEN_NAME}=${refreshToken}`,
            },
        },
    );

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

    const responseCookies = backendResponse.headers.getSetCookie();
    responseCookies.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
    });

    return response;
}
