"use client";
import React from "react";
import { Flame, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCurrentUser } from "@/hooks/use.current.user";
import {
    getUserAvatarUrl,
    getUserFullName,
} from "@/layouts/protected-header/utils/header.util";
import { cn, formatPoints } from "@/libs/utils";
import LearnerAvatar from "./learner.avatar";
import RankBadge from "./rank.badge";

interface MyPositionCardProps {
    /** Thứ hạng thật của mình (BE trả kể cả khi ngoài Top); bỏ trống nếu thiếu. */
    rank?: number;
    fullName?: string | null;
    avatarUrl?: string | null;
    point: number;
    topSize: number;
    streakDays?: number;
}

/**
 * Card nổi tách riêng khỏi bảng, ghim ở đáy khung nhìn (sticky) khi học viên
 * nằm ngoài Top. Tự động lấy thông tin user đang đăng nhập (avatar, fullName).
 */
export function MyPositionCard({
    rank,
    fullName: propFullName,
    avatarUrl: propAvatarUrl,
    point,
    topSize,
    streakDays,
}: MyPositionCardProps) {
    const t = useTranslations("leaderboard");
    const { data: user } = useCurrentUser();

    const resolvedAvatarUrl = getUserAvatarUrl(user) || propAvatarUrl || null;
    const resolvedFullName =
        getUserFullName(user) ||
        propFullName ||
        user?.username ||
        user?.email ||
        "";

    const showStreak = streakDays !== undefined;

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
            <div className="flex items-center gap-3 rounded-2xl border border-transparent bg-bgc-highlight/10 px-4 py-3 sm:gap-4">
                {rank === undefined ? (
                    <div className="bg-bgc-page text-text-muted border-bdc-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold">
                        –
                    </div>
                ) : (
                    <RankBadge rank={rank} withHashPrefix />
                )}
                <LearnerAvatar
                    fullName={resolvedFullName}
                    avatarUrl={resolvedAvatarUrl}
                />

                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center gap-2">
                        <span className="text-text-contrast truncate font-medium">
                            {resolvedFullName}
                        </span>
                        <span className="bg-bgc-highlight text-text-pure shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold">
                            {t("list.youBadge")}
                        </span>
                    </div>
                    {showStreak && (
                        <span className="text-text-muted mt-0.5 flex items-center gap-1 text-xs">
                            <Flame className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
                            {t("list.streak", { days: streakDays })}
                        </span>
                    )}
                </div>

                <div className="text-text-contrast flex shrink-0 items-center gap-1.5 font-bold">
                    <Sparkles className="text-bgc-highlight h-4 w-4" />
                    {formatPoints(point)}
                    <span className="text-text-muted text-xs font-medium">
                        {t("list.columnPoint")}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default MyPositionCard;
