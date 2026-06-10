"use client";
import React from "react";
import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { leaderboard } from "@/data/mockLearnerDashboard";
import { cn } from "@/lib/utils";
import { RANK_COLORS } from "../constants/dashboard.constant";

export function LeaderboardWidget() {
    const t = useTranslations("page.dashboard");

    return (
        <div className="rounded-xl border border-bdc-primary bg-bgc-app p-6">
            <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-bgc-highlight" />
                <h3 className="text-lg font-semibold text-text-contrast">{t("leaderboardTitle")}</h3>
            </div>
            <p className="mt-1 text-sm text-text-muted">{t("leaderboardSubtitle")}</p>

            <div className="mt-5 space-y-2">
                {leaderboard.map((entry) => (
                    <div
                        key={entry.rank}
                        className={cn(
                            "flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors",
                            entry.isCurrentUser
                                ? "border-2 border-bgc-highlight bg-bgc-highlight/10"
                                : "border-bdc-primary bg-bgc-page"
                        )}
                    >
                        <div
                            className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                                RANK_COLORS[entry.rank] ?? "bg-bgc-app text-text-muted border border-bdc-primary"
                            )}
                        >
                            {entry.rank}
                        </div>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bgc-highlight/20 text-sm font-semibold text-bgc-highlight">
                            {entry.initials}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-text-contrast">{entry.name}</span>
                                {entry.isCurrentUser && (
                                    <span className="rounded-full bg-bgc-highlight px-2 py-0.5 text-xs font-semibold text-text-pure">
                                        {t("leaderboardYou")}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-base font-semibold text-text-contrast">
                                {entry.points.toLocaleString("vi-VN")}
                            </div>
                            <div className="text-xs text-text-muted">{t("leaderboardPoints")}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeaderboardWidget;
