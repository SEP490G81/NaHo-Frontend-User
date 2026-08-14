"use client";
import React, { useEffect, useRef } from "react";
import { Gem } from "lucide-react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { useCurrentUser } from "@/hooks/use.current.user";
import { useUserLearningProgress } from "@/components/providers/user.learning.progress.provider";
import {
    getLeagueLeaderboard,
    getLeagues,
} from "../services/leaderboard.service";
import { findLeagueByTotalPoint } from "../utils/leaderboard.util";
import { useLeagueLabel } from "../utils/use.league.label";
import LeagueIcon from "./league.icon";
import LearnerAvatar from "./learner.avatar";

/** Thẻ giải đấu thu gọn cho thanh bên lộ trình — dùng chung data leaderboard thật. */
export function LeagueMiniCard({ accent }: { accent: string }) {
    const t = useTranslations("marugoto.sideRail");
    const { name } = useLeagueLabel();
    const { data: currentUser } = useCurrentUser();
    const { progress } = useUserLearningProgress();

    const totalPoint = progress?.totalPoint ?? 0;
    const lbUser = progress?.leaderboardUser ?? null;
    const myUserId = lbUser?.id ?? currentUser?.id;

    const { data: leagues = [] } = useQuery({
        queryKey: ["leagues"],
        queryFn: getLeagues,
        staleTime: 1000 * 60 * 30,
    });
    const myLeague =
        leagues.find(
            (l) =>
                l.id ===
                (lbUser?.leagueId ??
                    findLeagueByTotalPoint(leagues, totalPoint)?.id),
        ) ?? null;

    const { data: entries = [] } = useQuery({
        queryKey: ["league-leaderboard", myLeague?.id],
        queryFn: () => getLeagueLeaderboard(myLeague!.id),
        enabled: !!myLeague,
        placeholderData: keepPreviousData,
    });

    const top = entries.slice(0, 10);
    const iAmInTop = top.some((e) => e.userId === myUserId);

    // Cuộn dải hạng để hạng hiện tại nằm giữa khung nhìn (không cuộn cả trang).
    const stripRef = useRef<HTMLDivElement>(null);
    const currentRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const strip = stripRef.current;
        const el = currentRef.current;
        if (!strip || !el) return;
        strip.scrollLeft =
            el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2;
    }, [myLeague?.id, leagues.length]);

    return (
        <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-4 shadow-sm">
            <h3 className="text-text-contrast flex items-center gap-2.5 text-lg font-black">
                {myLeague ? (
                    <LeagueIcon
                        league={myLeague}
                        label={name(myLeague)}
                        size={42}
                    />
                ) : (
                    <Gem className="h-8 w-8" style={{ color: accent }} />
                )}
                {myLeague ? name(myLeague) : t("leagueTitle")}
            </h3>

            {/* Dải tất cả các hạng (màu thật) — một hàng CUỘN NGANG, hạng hiện
                tại to & nổi bật, tự canh vào giữa. */}
            {leagues.length > 0 && (
                <div
                    ref={stripRef}
                    className="flex items-center gap-2.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {leagues.map((l) => {
                        const isCurrent = l.id === myLeague?.id;
                        return (
                            <span
                                key={l.id}
                                ref={isCurrent ? currentRef : undefined}
                                className="shrink-0"
                            >
                                <LeagueIcon
                                    league={l}
                                    label={name(l)}
                                    size={isCurrent ? 46 : 32}
                                    className={
                                        isCurrent ? "drop-shadow-md" : undefined
                                    }
                                />
                            </span>
                        );
                    })}
                </div>
            )}

            <ol className="space-y-1.5">
                {top.map((e) => (
                    <li
                        key={e.userId}
                        className={cn(
                            "flex items-center gap-2 rounded-lg px-1.5 py-1 text-xs",
                            e.userId === myUserId
                                ? "bg-bgc-highlight/10 font-semibold"
                                : "text-text-muted",
                        )}
                    >
                        <span className="w-4 text-center font-bold">
                            {e.rank}
                        </span>
                        <LearnerAvatar
                            fullName={e.fullName}
                            avatarUrl={e.avatarUrl}
                            size={22}
                        />
                        <span className="text-text-contrast flex-1 truncate">
                            {e.fullName}
                        </span>
                        <span className="tabular-nums">
                            {t("points", { points: e.point })}
                        </span>
                    </li>
                ))}
            </ol>

            {!iAmInTop && lbUser && (
                <div
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white"
                    style={{ background: accent }}
                >
                    <span className="w-4 text-center">{lbUser.rank}</span>
                    <span className="flex-1">{t("yourRank")}</span>
                    <span className="tabular-nums">
                        {t("points", { points: lbUser.totalPoint })}
                    </span>
                </div>
            )}
        </div>
    );
}

export default LeagueMiniCard;
