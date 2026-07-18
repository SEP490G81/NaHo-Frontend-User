"use client";
import React from "react";
import { useFormatter, useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { LeagueResponse } from "@/types/responses/league.response";
import {
    getLeagueProgressPercent,
    getLeagueTheme,
    getPointToNextLeague,
    toLeagueSlug,
} from "../utils/leaderboard.util";

interface LeagueProgressProps {
    league: LeagueResponse;
    nextLeague: LeagueResponse | null;
    totalPoint: number;
}

/**
 * Tiến độ L-Point tích lũy của học viên trong hạng hiện tại.
 * Chỉ hiển thị ở hạng của chính học viên, vì mốc thăng hạng là mốc cá nhân.
 */
export function LeagueProgress({
    league,
    nextLeague,
    totalPoint,
}: LeagueProgressProps) {
    const t = useTranslations("leaderboard");
    const format = useFormatter();
    const theme = getLeagueTheme(league.name);
    const percent = getLeagueProgressPercent(totalPoint, league);

    return (
        <div>
            <div className="flex items-center justify-between gap-2 text-xs">
                <span className="text-text-muted font-semibold">
                    {t("progress.label")}
                </span>
                <span className="text-text-contrast font-bold">
                    {nextLeague
                        ? t("progress.value", {
                              current: format.number(totalPoint),
                              target: format.number(nextLeague.minPoint),
                          })
                        : format.number(totalPoint)}
                </span>
            </div>

            <div className="bg-bgc-page border-bdc-primary mt-2 h-2.5 w-full overflow-hidden rounded-full border">
                <div
                    className={cn(
                        "h-full rounded-full transition-[width] duration-500",
                        theme.solidBg,
                    )}
                    style={{ width: `${percent}%` }}
                />
            </div>

            <p className="text-text-muted mt-2 text-xs">
                {nextLeague
                    ? t("progress.toNext", {
                          point: format.number(
                              getPointToNextLeague(totalPoint, nextLeague),
                          ),
                          league: t(
                              `leagueNames.${toLeagueSlug(nextLeague.name)}`,
                          ),
                      })
                    : t("progress.maxLeague")}
            </p>
        </div>
    );
}

export default LeagueProgress;
