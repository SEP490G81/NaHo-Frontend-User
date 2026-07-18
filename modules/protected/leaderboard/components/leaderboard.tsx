"use client";
import React from "react";
import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { LEADERBOARD_TOP_SIZE } from "../constants/leaderboard.constant";
import LeaderboardBoard from "../features/leaderboard.board";

export function Leaderboard() {
    const t = useTranslations("leaderboard");

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-6xl space-y-5">
                <header className="text-center">
                    <div className="mb-3 flex justify-center">
                        <div className="bg-bgc-highlight/10 flex h-14 w-14 items-center justify-center rounded-2xl">
                            <Trophy className="text-bgc-highlight h-7 w-7" />
                        </div>
                    </div>
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
