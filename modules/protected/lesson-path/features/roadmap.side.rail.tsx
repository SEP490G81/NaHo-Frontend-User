"use client";
import React from "react";
import LeagueMiniCard from "@/modules/protected/leaderboard/components/league.mini.card";

/** Thanh bên phải lộ trình: giải đấu tuần (Top 10 + hạng của bạn — data thật). */
export function RoadmapSideRail({ accent }: { accent: string }) {
    return (
        <aside className="hidden w-full flex-col gap-4 self-start lg:sticky lg:top-20 lg:flex lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1">
            <LeagueMiniCard accent={accent} />
        </aside>
    );
}

export default RoadmapSideRail;
