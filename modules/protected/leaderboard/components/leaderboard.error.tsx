"use client";
import React from "react";
import { AlertTriangle, RotateCw } from "lucide-react";
import { useTranslations } from "next-intl";

interface LeaderboardErrorProps {
    onRetry: () => void;
}

export function LeaderboardError({ onRetry }: LeaderboardErrorProps) {
    const t = useTranslations("leaderboard");

    return (
        <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-12 text-center">
            <AlertTriangle className="text-text-muted mx-auto h-8 w-8" />
            <p className="text-text-contrast mt-3 font-semibold">
                {t("error.title")}
            </p>
            <p className="text-text-muted mx-auto mt-1 max-w-sm text-sm">
                {t("error.description")}
            </p>
            <button
                type="button"
                onClick={onRetry}
                className="bg-bgc-highlight text-text-pure mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition hover:opacity-90"
            >
                <RotateCw className="h-4 w-4" />
                {t("error.retry")}
            </button>
        </div>
    );
}

export default LeaderboardError;
