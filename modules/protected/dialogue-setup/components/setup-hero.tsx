"use client";

import React from "react";
import { History, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SetupQuotaBanner } from "./setup-quota-banner";

interface SetupHeroProps {
    level?: string | null;
    aiLimit: number | null;
    aiRemaining: number | null;
    aiExhausted: boolean;
    onOpenUpgradeModal: () => void;
}

export function SetupHero({
    level,
    aiLimit,
    aiRemaining,
    aiExhausted,
    onOpenUpgradeModal,
}: Readonly<SetupHeroProps>) {
    const t = useTranslations("dialogueSetup");

    return (
        <header className="border-bdc-primary bg-bgc-app relative overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-8">
            <span
                aria-hidden
                className="bg-bgc-highlight absolute inset-y-0 left-0 w-1.5"
            />
            <div className="relative z-10 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-4 pl-2">
                    <div className="space-y-2">
                        <h1 className="text-text-contrast text-2xl font-bold tracking-tight sm:text-3xl">
                            {t("title")}
                        </h1>
                        <p className="text-text-muted max-w-xl text-sm">
                            {t("subtitle")}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        {aiLimit != null && aiRemaining != null && (
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold ${
                                    aiExhausted
                                        ? "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                        : "border-bgc-highlight/40 bg-bgc-highlight/10 text-bgc-highlight"
                                }`}
                            >
                                <Sparkles
                                    className={
                                        aiExhausted
                                            ? "h-4 w-4 text-rose-500"
                                            : "text-bgc-highlight h-4 w-4"
                                    }
                                />
                                {t("dailyQuotaStatus", {
                                    remaining: aiRemaining,
                                    limit: aiLimit,
                                })}
                            </span>
                        )}
                        {level && (
                            <span className="border-bdc-primary bg-bgc-page text-text-contrast inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold">
                                <Sparkles className="text-bgc-highlight h-4 w-4" />
                                {t("currentLevel")}
                                <span className="bg-bgc-highlight/15 text-bgc-highlight rounded-full px-2 py-0.5 text-xs font-bold">
                                    {level}
                                </span>
                            </span>
                        )}
                        <Link
                            href="/dialogue-history"
                            className="border-bdc-primary text-text-muted hover:border-bgc-highlight/60 hover:text-bgc-highlight inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                        >
                            <History className="h-4 w-4" />
                            {t("viewHistory")}
                        </Link>
                    </div>
                </div>

                {/* Quota Banner */}
                {aiLimit != null && aiRemaining != null && (
                    <SetupQuotaBanner
                        aiLimit={aiLimit}
                        aiRemaining={aiRemaining}
                        aiExhausted={aiExhausted}
                        onOpenUpgradeModal={onOpenUpgradeModal}
                    />
                )}
            </div>
        </header>
    );
}

export default SetupHero;
