"use client";
import React from "react";
import { Flame, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn, formatPoints } from "@/libs/utils";
import { useCurrentUser } from "@/hooks/use.current.user";
import { getUserAvatarUrl } from "@/layouts/protected-header/utils/header.util";
import LearnerAvatar from "./learner.avatar";
import RankBadge from "./rank.badge";

interface LeaderboardRowProps {
    /** Bỏ trống khi không xác định được thứ hạng (mình ở ngoài Top 10). */
    rank?: number;
    fullName: string | null;
    avatarUrl: string | null;
    point: number;
    isCurrentUser: boolean;
    /** Chuỗi ngày đăng nhập, chỉ hiển thị dưới tên của chính học viên. */
    streakDays?: number;
    withHashPrefix?: boolean;
}

/**
 * Một dòng bảng xếp hạng dạng thẻ, có thanh điểm so với người dẫn đầu. Dòng của
 * chính học viên được tô nền + viền để nổi bật.
 */
export function LeaderboardRow({
    rank,
    fullName,
    avatarUrl,
    point,
    isCurrentUser,
    streakDays,
    withHashPrefix = false,
}: LeaderboardRowProps) {
    const t = useTranslations("leaderboard");
    const { data: currentUser } = useCurrentUser();

    const effectiveAvatarUrl =
        avatarUrl || (isCurrentUser ? getUserAvatarUrl(currentUser) ?? null : null);
    const effectiveFullName =
        fullName ||
        (isCurrentUser
            ? currentUser?.fullName || currentUser?.username || currentUser?.email || null
            : null);

    const showStreak = isCurrentUser && streakDays !== undefined;

    return (
        <div
            className={cn(
                "flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors sm:gap-4",
                isCurrentUser
                    ? "border-bgc-highlight bg-bgc-highlight/10"
                    : "border-bdc-primary bg-bgc-app hover:bg-hbgc-app",
            )}
        >
            {rank === undefined ? (
                <div className="bg-bgc-page text-text-muted border-bdc-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold">
                    –
                </div>
            ) : (
                <RankBadge rank={rank} withHashPrefix={withHashPrefix} />
            )}
            <LearnerAvatar fullName={effectiveFullName} avatarUrl={effectiveAvatarUrl} />

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center gap-2">
                    <span className="text-text-contrast truncate font-medium">
                        {effectiveFullName}
                    </span>
                    {isCurrentUser && (
                        <span className="bg-bgc-highlight text-text-pure shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold">
                            {t("list.youBadge")}
                        </span>
                    )}
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
    );
}

export default LeaderboardRow;
