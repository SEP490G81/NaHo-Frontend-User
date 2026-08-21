"use client";

import React from "react";
import { AlertCircle, Zap } from "lucide-react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";

interface SetupQuotaBannerProps {
    aiLimit: number | null;
    aiRemaining: number | null;
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

    if (aiLimit == null || aiRemaining == null) {
        return null;
    }

    return (
        <div
            className={cn(
                "flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4 text-xs sm:text-sm",
                aiExhausted
                    ? "border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200"
                    : "border-bdc-primary bg-bgc-page/40 text-text-contrast",
            )}
        >
            <div className="flex items-center gap-2.5">
                {aiExhausted ? (
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
                ) : (
                    <Zap className="text-bgc-highlight h-4 w-4 shrink-0" />
                )}
                <span>
                    {aiExhausted
                        ? t("quotaExhaustedMsg")
                        : t("quotaRemainingMsg", {
                              remaining: aiRemaining,
                              limit: aiLimit,
                          })}
                </span>
            </div>

            {aiExhausted && (
                <Button
                    size="small"
                    variant="contained"
                    color="warning"
                    onClick={onOpenUpgradeModal}
                    className="!rounded-lg !text-xs !font-bold capitalize shadow-none hover:shadow-xs"
                >
                    {t("quotaUpgradeBtn")}
                </Button>
            )}
        </div>
    );
}

export default SetupQuotaBanner;
