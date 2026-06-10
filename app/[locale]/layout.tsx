import AppThemeProvider from "@/components/providers/app.theme.provider";
import BProgressProvider from "@/components/providers/bprogress.provider";
import { fontNotoSansJP, fontQuicksand } from "@/styles/font";
import ThemeInitScript from "@/components/providers/theme.init.script";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "../../styles/globals.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import { routing } from "@/intl/i18n/routing";
import { QueryProvider } from "@/components/providers/query.provider";
import { InitColorSchemeScript } from "@mui/material";

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

    return (
        <html
            lang={locale}
            data-locale={locale}
            className={`${fontQuicksand.variable} ${fontNotoSansJP.variable}`}
            suppressHydrationWarning
        >
            <body suppressHydrationWarning>
                <InitColorSchemeScript attribute="class" defaultMode="light" />

                <ThemeInitScript />
                <NextIntlClientProvider>
                    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                        <BProgressProvider>
                            <AppThemeProvider>
                                <QueryProvider>
                                    <main>{children}</main>
                                </QueryProvider>
                                <ToastContainer />
                            </AppThemeProvider>
                        </BProgressProvider>
                    </AppRouterCacheProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
