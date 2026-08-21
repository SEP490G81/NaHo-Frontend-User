import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ProblemDetail } from "@/types/responses/base.response";
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
} from "@/constants/app.constants";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_TOKEN_NAME)?.value;
    const reqHost = request.headers.get("host") || undefined;

    if (!accessToken) {
        const response = NextResponse.json(null, {
            status: 401,
        });

        clearAuthCookies(response, reqHost);
        return response;
    }

    let backendResponse: Response | null = null;
    try {
        backendResponse = await fetch(`${process.env.API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });
    } catch (e) {
        console.error("Backend logout error: ", e);
    }

    const response = new NextResponse(null, {
        status: 204,
    });

    if (backendResponse && backendResponse.ok) {
        const setCookies = backendResponse.headers.getSetCookie();
        setCookies.forEach((cookie) => {
            response.headers.append("set-cookie", cookie);
        });
    }

    clearAuthCookies(response, reqHost);

    return response;
}

function clearAuthCookies(response: NextResponse, reqHost?: string) {
    // 1. Clear host-only (no domain attribute)
    response.cookies.set(ACCESS_TOKEN_NAME, "", { maxAge: 0, path: "/" });
    response.cookies.set(REFRESH_TOKEN_NAME, "", { maxAge: 0, path: "/" });

    // 2. Clear with process.env.COOKIE_DOMAIN if configured
    const domainEnv = process.env.COOKIE_DOMAIN;
    if (domainEnv) {
        const cleanDomainEnv = domainEnv.replace(/^\./, "");
        response.cookies.set(ACCESS_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: cleanDomainEnv });
        response.cookies.set(REFRESH_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: cleanDomainEnv });
        response.cookies.set(ACCESS_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: `.${cleanDomainEnv}` });
        response.cookies.set(REFRESH_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: `.${cleanDomainEnv}` });
    }

    // 3. Clear with host & parent domain fallback
    if (reqHost) {
        const host = reqHost.split(":")[0];
        if (host && host !== "localhost" && !host.match(/^\d+\.\d+\.\d+\.\d+$/)) {
            // Direct host (e.g. naho.io.vn)
            response.cookies.set(ACCESS_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: host });
            response.cookies.set(REFRESH_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: host });
            response.cookies.set(ACCESS_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: `.${host}` });
            response.cookies.set(REFRESH_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: `.${host}` });

            // If sub-subdomain (e.g. admin.naho.io.vn -> naho.io.vn), clear parent domain too
            const parts = host.split(".");
            if (parts.length > 3) {
                const parentDomain = parts.slice(1).join(".");
                response.cookies.set(ACCESS_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: parentDomain });
                response.cookies.set(REFRESH_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: parentDomain });
                response.cookies.set(ACCESS_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: `.${parentDomain}` });
                response.cookies.set(REFRESH_TOKEN_NAME, "", { maxAge: 0, path: "/", domain: `.${parentDomain}` });
            }
        }
    }
}
