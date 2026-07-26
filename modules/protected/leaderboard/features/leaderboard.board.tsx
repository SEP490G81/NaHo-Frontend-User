"use client";
import React, { useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/use.current.user";
import LeaderboardContent from "../components/leaderboard.content";
import LeaderboardError from "../components/leaderboard.error";
import { LeaderboardSkeleton } from "../components/leaderboard.skeleton";
import LeagueRail from "../components/league.rail";
import {
    getLeagueLeaderboard,
    getLeagues,
    getUserLearningProgress,
} from "../services/leaderboard.service";
import { findLeagueByTotalPoint } from "../utils/leaderboard.util";

export function LeaderboardBoard() {
    const [selectedLeagueId, setSelectedLeagueId] = useState<number | null>(
        null,
    );
    const { data: currentUser } = useCurrentUser();

    const { data: progress, isPending: isProgressPending } = useQuery({
        queryKey: ["user-learning-progress"],
        queryFn: getUserLearningProgress,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });

    const {
        data: leagues = [],
        isPending: isLeaguesPending,
        isError: isLeaguesError,
        refetch: refetchLeagues,
    } = useQuery({
        queryKey: ["leagues"],
        queryFn: getLeagues,
        staleTime: 1000 * 60 * 30,
        retry: 1,
    });

    const totalPoint = progress?.totalPoint ?? 0;
    const streakDays = progress?.currentStreak ?? 0;
    const lbUser = progress?.leaderboardUser ?? null;
    const myUserId = lbUser?.id ?? currentUser?.id;

    const derivedLeague = useMemo(
        () => findLeagueByTotalPoint(leagues, totalPoint),
        [leagues, totalPoint],
    );
    const myLeagueId = lbUser?.leagueId ?? derivedLeague?.id ?? null;

    // Progress lỗi/xong mà vẫn chưa có hạng của mình -> mặc định hạng đầu để
    // bảng vẫn xem được thay vì treo skeleton mãi.
    const fallbackLeagueId = isProgressPending
        ? null
        : (leagues[0]?.id ?? null);
    const activeLeagueId = selectedLeagueId ?? myLeagueId ?? fallbackLeagueId;

    const {
        data: entries = [],
        isPending: isBoardPending,
        isError: isEntriesError,
        refetch: refetchEntries,
    } = useQuery({
        queryKey: ["league-leaderboard", activeLeagueId],
        queryFn: () => getLeagueLeaderboard(activeLeagueId as number),
        enabled: activeLeagueId !== null,
        placeholderData: keepPreviousData,
        retry: 1,
    });

    if (isLeaguesError) {
        return <LeaderboardError onRetry={() => refetchLeagues()} />;
    }

    const activeLeague =
        leagues.find((league) => league.id === activeLeagueId) ?? null;

    if (isLeaguesPending || !activeLeague) {
        return <LeaderboardSkeleton />;
    }

    return (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
            <LeagueRail
                leagues={leagues}
                activeLeagueId={activeLeague.id}
                myLeagueId={myLeagueId}
                totalPoint={totalPoint}
                onSelect={setSelectedLeagueId}
            />

            <div className="min-w-0">
                <LeaderboardContent
                    activeLeague={activeLeague}
                    leagues={leagues}
                    entries={entries}
                    isLoading={isBoardPending}
                    isError={isEntriesError}
                    onRetry={() => refetchEntries()}
                    myLeagueId={myLeagueId}
                    myUserId={myUserId}
                    lbUser={lbUser}
                    totalPoint={totalPoint}
                    streakDays={streakDays}
                />
            </div>
        </div>
    );
}

export default LeaderboardBoard;
