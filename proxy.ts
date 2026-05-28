import createMiddleware from "next-intl/middleware";
import { routing } from "@/intl/i18n/routing";
import { getPathname } from "@/intl/i18n/navigation";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const getLocaleFromPathname = (pathname: string) => {
    const locale = pathname.split("/")[1];
    if (routing.locales.includes(locale as "vi" | "en")) {
        return locale;
    }
    return routing.defaultLocale;
};

const loginPaths: Set<string> = new Set(
    routing.locales.map((locale) =>
        getPathname({
            href: "/login",
            locale,
        }),
    ),
);

export const proxy = auth((request) => {
    const pathname = request.nextUrl.pathname;
    const isLoginPath = loginPaths.has(pathname);
    const isLoggedIn = Boolean(request.auth?.user);

    if (isLoginPath && isLoggedIn) {
        const locale = getLocaleFromPathname(pathname);
        const localizedHome = getPathname({
            href: "/home",
            locale,
        });

        return NextResponse.redirect(new URL(localizedHome, request.url));
    }

    return intlMiddleware(request as NextRequest);
});

export const config = {
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
