"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { formatPoints } from "@/libs/utils";
import type { LeaderboardUserResponse } from "@/types/responses/league.response";
import { getLeagues } from "@/modules/protected/leaderboard/services/leaderboard.service";
import { useLeagueLabel } from "@/modules/protected/leaderboard/utils/use.league.label";
import { resolveAvatarUrl } from "@/modules/protected/leaderboard/utils/leaderboard.util";
import LeagueIcon from "@/modules/protected/leaderboard/components/league.icon";
import LearnerAvatar from "@/modules/protected/leaderboard/components/learner.avatar";

/** Card thông tin người bình luận (hover avatar) — kiểu Facebook. */
export function CommentAuthorCard({ user }: { user: LeaderboardUserResponse }) {
    const t = useTranslations("marugoto.questionDetail");
    const { name } = useLeagueLabel();
    const { data: leagues = [] } = useQuery({
        queryKey: ["leagues"],
        queryFn: getLeagues,
        staleTime: 1000 * 60 * 30,
    });
    const league = leagues.find((l) => l.id === user.leagueId) ?? null;

    return (
        <div className="w-56 p-1">
            <div className="flex items-center gap-3">
                <LearnerAvatar
                    fullName={user.fullName}
                    avatarUrl={resolveAvatarUrl(
                        user.avatarUrl,
                        user.authAvatarUrl,
                    )}
                    size={48}
                />
                <div className="min-w-0">
                    <p className="text-text-contrast truncate text-sm font-bold">
                        {user.fullName ?? "—"}
                    </p>
                    {league && (
                        <span className="text-text-muted mt-0.5 inline-flex items-center gap-1 text-xs font-medium">
                            <LeagueIcon
                                league={league}
                                label={name(league)}
                                size={16}
                            />
                            {name(league)}
                        </span>
                    )}
                </div>
            </div>
            <div className="border-bdc-primary mt-2 flex items-center justify-between border-t pt-2 text-xs">
                <span className="text-text-muted">
                    {user.rank != null
                        ? t("profileRank", { rank: user.rank })
                        : ""}
                </span>
                <span className="text-text-highlight font-bold">
                    {t("profilePoints", {
                        points: formatPoints(user.totalPoint ?? 0),
                    })}
                </span>
            </div>
        </div>
    );
}

export default CommentAuthorCard;
