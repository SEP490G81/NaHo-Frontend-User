import { NextResponse } from "next/server";
import { rotateTokensOnServer } from "@/services/server/backend.fetch";

export async function POST() {
    const result = await rotateTokensOnServer();

    if (!result.ok) {
        return NextResponse.json(
            {
                detail: "Phiên đăng nhập đã hết hạn hoặc không hợp lệ.",
                status: result.status || 401,
            },
            { status: result.status || 401 },
        );
    }

    const response = NextResponse.json(
        { success: true },
        { status: result.status },
    );

    result.setCookieHeaders.forEach((cookie) => {
        response.headers.append("set-cookie", cookie);
    });

    return response;
}
