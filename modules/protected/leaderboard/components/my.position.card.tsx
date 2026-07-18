"use client";
import React from "react";
import { useTranslations } from "next-intl";
import LeaderboardRow from "./leaderboard.row";

interface MyPositionCardProps {
    /** Thứ hạng thật của mình (BE trả kể cả khi ngoài Top); bỏ trống nếu thiếu. */
    rank?: number;
    fullName: string | null;
    avatarUrl: string | null;
    point: number;
    topSize: number;
    streakDays?: number;
}

/**
 * Card nổi tách riêng khỏi bảng, ghim ở đáy khung nhìn (sticky) khi học viên
 * nằm ngoài Top.
 */
export function MyPositionCard({
    rank,
    fullName,
    avatarUrl,
    point,
    topSize,
    streakDays,
}: MyPositionCardProps) {
    const t = useTranslations("leaderboard");

    return (
        <div className="border-bgc-highlight bg-bgc-app overflow-hidden rounded-2xl border-2 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-3">
                <span className="text-text-muted text-[11px] font-bold tracking-wide uppercase">
                    {t("myPosition.title")}
                </span>
                <span className="text-text-muted text-xs">
                    {t("myPosition.outsideTop", { size: topSize })}
                </span>
            </div>
            <LeaderboardRow
                rank={rank}
                fullName={fullName}
                avatarUrl={avatarUrl}
                point={point}
                isCurrentUser
                streakDays={streakDays}
                withHashPrefix
            />
        </div>
    );
}

export default MyPositionCard;
