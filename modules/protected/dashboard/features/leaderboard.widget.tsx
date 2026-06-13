"use client";
import React from "react";
import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { leaderboard } from "@/data/mockLearnerDashboard";
import { cn } from "@/lib/utils";
import { RANK_COLORS } from "../constants/dashboard.constant";

export function LeaderboardWidget() {
    const t = useTranslations("dashboard");

    return (
        <div className="border-bdc-primary bg-bgc-app rounded-md border p-6">
            <div className="flex items-center gap-2">
                <Trophy className="text-bgc-highlight h-5 w-5" />
                <h3 className="text-text-contrast text-lg font-semibold">
                    {t("leaderboardTitle")}
                </h3>
            </div>
            <p className="text-text-muted mt-1 text-sm">
                {t("leaderboardSubtitle")}
            </p>

            <div className="mt-5 space-y-2">
                {leaderboard.map((entry) => (
                    <div
                        key={entry.rank}
                        className={cn(
                            "flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors",
                            entry.isCurrentUser
                                ? "border-bgc-highlight bg-bgc-highlight/10 border-2"
                                : "border-bdc-primary bg-bgc-page",
                        )}
                    >
                        <div
                            className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                                RANK_COLORS[entry.rank] ??
                                    "bg-bgc-app text-text-muted border-bdc-primary border",
                            )}
                        >
                            {entry.rank}
                        </div>
                        <div className="bg-bgc-highlight/20 text-bgc-highlight flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                            {entry.initials}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-text-contrast font-medium">
                                    {entry.name}
                                </span>
                                {entry.isCurrentUser && (
                                    <span className="bg-bgc-highlight text-text-pure rounded-full px-2 py-0.5 text-xs font-semibold">
                                        {t("leaderboardYou")}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-text-contrast text-base font-semibold">
                                {entry.points.toLocaleString("vi-VN")}
                            </div>
                            <div className="text-text-muted text-xs">
                                {t("leaderboardPoints")}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeaderboardWidget;
