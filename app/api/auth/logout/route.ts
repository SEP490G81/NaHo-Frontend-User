import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ProblemDetail } from "@/types/responses/base.response";
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
} from "@/constants/app.constants";

export async function POST() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
    if (!accessToken) {
        const response = NextResponse.json(null, {
            status: 401,
        });

        response.cookies.delete(ACCESS_TOKEN_NAME);
        response.cookies.delete(REFRESH_TOKEN_NAME);

        return response;
    }

    const backendResponse = await fetch(`${process.env.API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
    });

    if (backendResponse.status === 401) {
        const response = NextResponse.json(null, {
            status: 401,
        });

        response.cookies.delete(ACCESS_TOKEN_NAME);
        response.cookies.delete(REFRESH_TOKEN_NAME);

        return response;
    }

    if (!backendResponse.ok) {
        const result = await backendResponse.json();
        const problemDetail = result as ProblemDetail;
        return NextResponse.json(problemDetail, {
            status: backendResponse.status,
        });
    }

    const response = new NextResponse(null, {
        status: 204,
    });

    response.cookies.delete(ACCESS_TOKEN_NAME);
    response.cookies.delete(REFRESH_TOKEN_NAME);

    return response;
}
