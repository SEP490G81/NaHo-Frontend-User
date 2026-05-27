import { ApiResponse } from "@/types/responses/base.response";
import { LoginResponse } from "@/types/responses/user.response";
import { NextResponse } from "next/server";
import { LoginApiResponse } from "@/types/api/auth.response";

export async function POST(request: Request) {
    const body = await request.json();
    const authResponse = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const authResult: ApiResponse<LoginResponse> = await authResponse.json();

    if (!authResponse.ok) {
        return NextResponse.json<LoginApiResponse>(
            {
                message: authResult.message,
                user: null,
            },
            { status: authResponse.status },
        );
    }

    const response = NextResponse.json<LoginApiResponse>(
        {
            message: authResult.message,
            user: authResult.data.user,
        },
        { status: authResponse.status },
    );

    response.cookies.set("accessToken", authResult.data.accessToken.value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: authResult.data.accessToken.expireIn,
    });

    response.cookies.set("refreshToken", authResult.data.refreshToken.value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: authResult.data.refreshToken.expireIn,
    });

    return response;
}
