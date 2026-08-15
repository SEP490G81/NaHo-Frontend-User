"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import UpdatePlanButton from "@/modules/protected/settings/billing/components/update.plan.button";

interface SetupQuotaBannerProps {
    aiLimit: number;
    aiRemaining: number;
    aiExhausted: boolean;
    onOpenUpgradeModal: () => void;
}

export function SetupQuotaBanner({
    aiLimit,
    aiRemaining,
    aiExhausted,
    onOpenUpgradeModal,
}: Readonly<SetupQuotaBannerProps>) {
    const t = useTranslations("dialogueSetup");

    return (
        <div
            className={`flex flex-col justify-between gap-4 rounded-xl border p-4 shadow-xs transition-all sm:flex-row sm:items-center ${
                aiExhausted
                    ? "text-text-contrast border-rose-500/50 bg-rose-500/10"
                    : "border-bgc-highlight/50 bg-bgc-highlight/10 text-text-contrast"
            }`}
        >
            <div className="flex items-center gap-3.5 pl-2">
                <div
                    className={`shrink-0 rounded-xl p-2.5 shadow-xs ${
                        aiExhausted
                            ? "bg-rose-500 text-white"
                            : "bg-bgc-highlight text-white"
                    }`}
                >
                    <Sparkles className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                    <p className="text-text-contrast text-sm font-bold sm:text-base">
                        {t("dailyQuotaLimit", { limit: aiLimit })}
                    </p>
                    <p
                        className={`text-xs font-bold sm:text-sm ${
                            aiExhausted
                                ? "text-rose-600 dark:text-rose-400"
                                : "text-bgc-highlight"
                        }`}
                    >
                        {aiExhausted ? (
                            <>
                                <span>{t("dailyQuotaExhausted")} </span>
                                <span>{t("dailyQuotaUpgradeHint")}</span>
                            </>
                        ) : (
                            t("dailyQuotaRemaining", { remaining: aiRemaining })
                        )}
                    </p>
                </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 pl-2 sm:pl-0">
                {aiExhausted && (
                    <UpdatePlanButton onOpenModal={onOpenUpgradeModal} />
                )}
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold shadow-xs ${
                        aiExhausted
                            ? "bg-rose-500 text-white"
                            : "bg-bgc-highlight text-white"
                    }`}
                >
                    {t("dailyQuotaStatus", {
                        remaining: aiRemaining,
                        limit: aiLimit,
                    })}
                </span>
            </div>
        </div>
    );
}

export default SetupQuotaBanner;
