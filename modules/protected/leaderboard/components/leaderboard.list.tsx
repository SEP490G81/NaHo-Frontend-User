"use client";
import React from "react";
import { LeaderboardEntry } from "@/types/responses/league.response";
import LeaderboardRow from "./leaderboard.row";

interface LeaderboardListProps {
    entries: LeaderboardEntry[];
    currentUserId: number | undefined;
    streakDays: number;
}

/**
 * Danh sách các hạng SAU Top 3 (hạng 4 trở đi) — 3 người đầu đã hiện ở bục
 * vinh danh nên cắt bỏ để không lặp lại. Trả null khi hạng chỉ có 1–3 người.
 */
export function LeaderboardList({
    entries,
    currentUserId,
    streakDays,
}: LeaderboardListProps) {
    const restEntries = entries.slice(3);
    if (restEntries.length === 0) {
        return null;
    }

    return (
        <div className="space-y-2">
            {restEntries.map((entry) => (
                <LeaderboardRow
                    key={entry.userId}
                    rank={entry.rank}
                    fullName={entry.fullName}
                    avatarUrl={entry.avatarUrl}
                    point={entry.point}
                    isCurrentUser={entry.userId === currentUserId}
                    streakDays={streakDays}
                />
            ))}
        </div>
    );
}

export default LeaderboardList;
