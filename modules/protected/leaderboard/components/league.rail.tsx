"use client";
import React, { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { LeagueResponse } from "@/types/responses/league.response";
import LeagueTabItem from "./league.tab.item";

interface LeagueRailProps {
    leagues: LeagueResponse[];
    activeLeagueId: number | null;
    myLeagueId: number | null;
    /** L-Point tích lũy của mình, để xác định hạng nào cao hơn -> làm mờ. */
    totalPoint: number;
    onSelect: (leagueId: number) => void;
}

/**
 * Bộ chọn 10 hạng: dọc thành rail bên trái ở màn rộng, cuộn ngang ở màn hẹp.
 */
export function LeagueRail({
    leagues,
    activeLeagueId,
    myLeagueId,
    totalPoint,
    onSelect,
}: Readonly<LeagueRailProps>) {
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
        <div className="space-y-3">
            {leagues.map((league) => {
                const isActive = league.id === activeLeagueId;
                return (
                    <div
                        key={league.id}
                        ref={isActive ? activeRef : null}
                        className="bg-bgc-app shrink-0 rounded-xl"
                    >
                        <LeagueTabItem
                            league={league}
                            isActive={isActive}
                            isMine={league.id === myLeagueId}
                            isLocked={league.minPoint > totalPoint}
                            onSelect={onSelect}
                            className="h-full min-w-60 cursor-pointer lg:w-full"
                        />
                    </div>
                );
            })}
        </div>
    );
}

export default LeagueRail;
