"use client";
import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { LeagueResponse } from "@/types/responses/league.response";
import LeagueTabItem from "./league.tab.item";

interface LeagueRailProps {
    leagues: LeagueResponse[];
    activeLeagueId: number | null;
    myLeagueId: number | null;
    onSelect: (leagueId: number) => void;
}

/**
 * Bộ chọn 10 hạng: dọc thành rail bên trái ở màn rộng, cuộn ngang ở màn hẹp.
 */
export function LeagueRail({
    leagues,
    activeLeagueId,
    myLeagueId,
    onSelect,
}: LeagueRailProps) {
    const t = useTranslations("leaderboard");
    const activeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        activeRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });
    }, [activeLeagueId]);

    return (
        <aside className="border-bdc-primary bg-bgc-app rounded-2xl border p-3 lg:sticky lg:top-4 lg:self-start">
            <p className="text-text-muted px-1 pb-2 text-[11px] font-bold tracking-wide uppercase">
                {t("railTitle", { count: leagues.length })}
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                {leagues.map((league) => {
                    const isActive = league.id === activeLeagueId;
                    return (
                        <div
                            key={league.id}
                            ref={isActive ? activeRef : null}
                            className="shrink-0 lg:shrink"
                        >
                            <LeagueTabItem
                                league={league}
                                isActive={isActive}
                                isMine={league.id === myLeagueId}
                                onSelect={onSelect}
                                className="h-full lg:w-full"
                            />
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}

export default LeagueRail;
