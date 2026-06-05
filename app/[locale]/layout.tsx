import AppThemeProvider from "@/components/providers/app.theme.provider";
import BProgressProvider from "@/components/providers/bprogress.provider";
import { fontNotoSansJP, fontQuicksand } from "@/styles/font";
import { InitColorSchemeScript } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../../styles/globals.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import { routing } from "@/intl/i18n/routing";
import { AuthProvider } from "@/features/providers/auth.provider";
import { getCurrentLoggedUser } from "@/services/server/user.service";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
    children,
    params,
}: Readonly<Props>) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const user = await getCurrentLoggedUser().catch(() => null);
    console.log(">>>> check user: ", user);

    return (
        <html
            lang={locale}
            data-locale={locale}
            className={`${fontQuicksand.variable} ${fontNotoSansJP.variable}`}
            suppressHydrationWarning
        >
            <body>
                <NextIntlClientProvider>
                    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                        <BProgressProvider>
                            <AppThemeProvider>
                                <InitColorSchemeScript
                                    attribute="class"
                                    defaultMode="light"
                                />
                                <AuthProvider initialUser={user}>
                                    <main>{children}</main>
                                </AuthProvider>
                                <ToastContainer />
                            </AppThemeProvider>
                        </BProgressProvider>
                    </AppRouterCacheProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
