"use client";
import React from "react";
import { Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { LEADERBOARD_TOP_SIZE } from "../constants/leaderboard.constant";
import LeaderboardBoard from "../features/leaderboard.board";
import ContainerBox from "@/components/ui/container.box";

export function Leaderboard() {
    const t = useTranslations("leaderboard");

    return (
        <div className="mx-auto max-w-6xl space-y-5">
            <ContainerBox className="flex flex-col items-center">
                <div className="bg-bgc-highlight/10 mb-3 flex h-14 w-14 items-center justify-center rounded-2xl">
                    <Trophy className="text-bgc-highlight h-7 w-7" />
                </div>
                <h1 className="text-text-contrast text-xl font-bold md:text-2xl">
                    {t("title")}
                </h1>
                <p className="text-text-muted mt-1 text-sm">
                    {t("subtitle", { size: LEADERBOARD_TOP_SIZE })}
                </p>
            </ContainerBox>

            <LeaderboardBoard />
        </div>
    );
}

export default Leaderboard;
