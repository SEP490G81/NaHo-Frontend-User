import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
} from "@/constants/app.constants";

function clearAuthCookies(response: NextResponse, hostHeader?: string | null) {
    const cookieNames = [ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME];
    const envDomain = process.env.COOKIE_DOMAIN;
    const host = hostHeader?.split(":")[0] || "";

    let baseDomain = host;
    if (host.startsWith("admin.")) {
        baseDomain = host.replace("admin.", "");
    }

    const domainsToClear = new Set<string | undefined>([
        undefined,
        envDomain || undefined,
        baseDomain || undefined,
        baseDomain ? `.${baseDomain}` : undefined,
    ]);

    domainsToClear.delete("");

    for (const name of cookieNames) {
        for (const domain of domainsToClear) {
            response.cookies.set(name, "", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 0,
                expires: new Date(0),
                ...(domain ? { domain } : {}),
            });
        }
    }
}

export async function POST(request: Request) {
    const hostHeader = request.headers.get("host");
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;

    if (accessToken) {
        try {
            await fetch(`${process.env.API_URL}/auth/logout`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                cache: "no-store",
            });
        } catch (err) {
            console.error("Backend logout call error:", err);
        }
    }

    const response = new NextResponse(null, {
        status: 204,
    });

    clearAuthCookies(response, hostHeader);

    return response;
}
