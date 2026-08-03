import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import {
    ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME,
} from "@/constants/app.constants";
import { isTokenExpired } from "@/libs/token";

const intlMiddleware = createMiddleware(routing);

const publicPaths = [
    "/",
    "/login",
    "/register",
    "/verify-email",
    "/forgot-password",
    "/features",
    "/learner-feedback",
    "/frequently-questions",
    "/home",
    "/terms",
    "/privacy",
];

export default async function proxy(request: NextRequest) {
    // chạy next-intl trước
    const response = intlMiddleware(request);

    // next-intl có thể trả ra 302
    // nếu là redirect của next-intl thì return luôn
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
            return response;
        } else {
            const redirectResponse = NextResponse.redirect(
                new URL("/login", request.url),
            );
            console.log(">>> refresh token failed!");
            redirectResponse.cookies.delete(ACCESS_TOKEN_NAME);
            redirectResponse.cookies.delete(REFRESH_TOKEN_NAME);
            return redirectResponse;
        }
    };

    if (refreshToken) {
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

                console.log(">>> refresh token successfully!");
                // Do không thể sửa cookie của request hiện tại
                // Nên phải redirect lại chính trang đó
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
    } else {
        // nếu không có refresh token
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
