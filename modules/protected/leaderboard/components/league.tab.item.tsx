"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { LeagueResponse } from "@/types/responses/league.response";
import { getLeagueTheme, toLeagueSlug } from "../utils/leaderboard.util";
import { useLeagueLabel } from "../utils/use.league.label";
import LeagueIcon from "./league.icon";

interface LeagueTabItemProps {
    league: LeagueResponse;
    isActive: boolean;
    isMine: boolean;
    onSelect: (leagueId: number) => void;
    className?: string;
}

export function LeagueTabItem({
    league,
    isActive,
    isMine,
    onSelect,
    className,
}: LeagueTabItemProps) {
    const t = useTranslations("leaderboard");
    const label = useLeagueLabel();
    const theme = getLeagueTheme(league.name);
    const name = label.name(league);
    const cssVar = `--color-league-${toLeagueSlug(league.name)}`;

    return (
        <button
            type="button"
            onClick={() => onSelect(league.id)}
            aria-pressed={isActive}
            style={{
                background: `color-mix(in srgb, var(${cssVar}) ${isActive ? 18 : 7}%, transparent)`,
            }}
            className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:brightness-105",
                theme.border,
                isActive ? "border-2" : "border",
                className,
            )}
        >
            <LeagueIcon league={league} label={name} size={36} />
            <div className="min-w-0">
                <div className="flex items-center gap-2">
                    <span
                        className={cn(
                            "text-sm whitespace-nowrap",
                            theme.text,
                            isActive ? "font-bold" : "font-semibold",
                        )}
                    >
                        {name}
                    </span>
                    {isMine && (
                        <span className="bg-bgc-highlight text-text-pure shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold">
                            {t("yourLeagueBadge")}
                        </span>
                    )}
                </div>
                <div className="text-text-muted mt-0.5 text-xs whitespace-nowrap">
                    {label.pointRange(league)}
                </div>
            </div>
        </button>
    );
}

export default LeagueTabItem;
