"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { LEADERBOARD_TOP_SIZE } from "../constants/leaderboard.constant";
import LeaderboardBoard from "../features/leaderboard.board";

export function Leaderboard() {
    const t = useTranslations("leaderboard");

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-6xl space-y-5">
                <header className="text-center">
                    <h1 className="text-text-contrast text-2xl font-bold md:text-3xl">
                        {t("title")}
                    </h1>
                    <p className="text-text-muted mt-1 text-sm">
                        {t("subtitle", { size: LEADERBOARD_TOP_SIZE })}
                    </p>
                </header>

                <LeaderboardBoard />
            </div>
        </div>
    );
}

export default Leaderboard;
