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
        return NextResponse.json(null, { status: 401 });
    }

    const backendResponse = await fetch(
        `${process.env.API_URL}/auth/logout-all`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        },
    );

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
