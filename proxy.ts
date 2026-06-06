import createMiddleware from "next-intl/middleware";
import { routing } from "@/intl/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
} from "@/constants/app.constants";

const intlMiddleware = createMiddleware(routing);

const publicPaths = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/features",
    "/learner-feedback",
    "/frequently-questions",
];

// Helper to check if a JWT token is expired or expiring soon
function isTokenExpired(token: string | undefined): boolean {
    if (!token) return true;
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return true;
        const payload = parts[1];
        const decoded = atob(payload.replaceAll("-", "+").replaceAll("_", "/"));
        const data = JSON.parse(decoded);
        const exp = data.exp;
        if (typeof exp !== "number") return true;
        // Check if token is expired or will expire in the next 10 seconds (grace period)
        const bufferSeconds = 60;
        return exp - Math.floor(Date.now() / 1000) < bufferSeconds;
    } catch {
        return true;
    }
}

export default async function middleware(request: NextRequest) {
    const response = intlMiddleware(request);

    if (response.status >= 300 && response.status < 400) {
        return response;
    }

    const pathname = request.nextUrl.pathname;

    const isPublic = publicPaths.some(
        (path) =>
            pathname === path ||
            (path !== "/" && pathname.startsWith(path + "/")),
    );

    const refreshToken = request.cookies.get(REFRESH_TOKEN_NAME)?.value;
    const accessToken = request.cookies.get(ACCESS_TOKEN_NAME)?.value;

    // Helper for auth failure handling (deletes cookies and handles redirection/routing)
    const handleAuthFailure = () => {
        if (isPublic) {
            response.cookies.delete(ACCESS_TOKEN_NAME);
            response.cookies.delete(REFRESH_TOKEN_NAME);
            return response;
        } else {
            const redirectResponse = NextResponse.redirect(
                new URL("/login", request.url),
            );
            redirectResponse.cookies.delete(ACCESS_TOKEN_NAME);
            redirectResponse.cookies.delete(REFRESH_TOKEN_NAME);
            return redirectResponse;
        }
    };

    if (refreshToken) {
        // Refresh token exists. Check if access token is missing or expired
        if (!accessToken || isTokenExpired(accessToken)) {
            try {
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

                if (!backendResponse.ok) {
                    return handleAuthFailure();
                }

                // Token rotation succeeded!
                // We perform a 302 Redirect to the same requested URL (self-redirect)
                const redirectResponse = NextResponse.redirect(
                    new URL(request.url),
                );

                // Extract new cookies from Spring Boot response and append to the redirect response
                const responseCookies = backendResponse.headers.getSetCookie();
                responseCookies.forEach((cookie) => {
                    redirectResponse.headers.append("set-cookie", cookie);
                });

                return redirectResponse;
            } catch (error) {
                console.error("Token rotation error in middleware:", error);
                return handleAuthFailure();
            }
        }
    } else if (!isPublic) {
        return handleAuthFailure();
    }

    return response;
}

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
