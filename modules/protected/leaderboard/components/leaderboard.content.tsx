"use client";
import React from "react";
import {
    LeaderboardEntry,
    LeaderboardUserResponse,
    LeagueResponse,
} from "@/types/responses/league.response";
import { LEADERBOARD_TOP_SIZE } from "../constants/leaderboard.constant";
import { getNextLeague, resolveAvatarUrl } from "../utils/leaderboard.util";
import { useLeagueLabel } from "../utils/use.league.label";
import LeaderboardEmpty from "./leaderboard.empty";
import LeaderboardError from "./leaderboard.error";
import LeaderboardList from "./leaderboard.list";
import { LeaderboardSkeleton } from "./leaderboard.skeleton";
import LeagueProgress from "./league.progress";
import LeaguePodium from "./league.podium";
import MyPositionCard from "./my.position.card";
import OtherLeagueNotice from "./other.league.notice";

interface LeaderboardContentProps {
    activeLeague: LeagueResponse;
    leagues: LeagueResponse[];
    entries: LeaderboardEntry[];
    isLoading: boolean;
    isError: boolean;
    onRetry: () => void;
    myLeagueId: number | null;
    myUserId: number | undefined;
    lbUser: LeaderboardUserResponse | null;
    totalPoint: number;
    streakDays: number;
}

export function LeaderboardContent({
    activeLeague,
    leagues,
    entries,
    isLoading,
    isError,
    onRetry,
    myLeagueId,
    myUserId,
    lbUser,
    totalPoint,
    streakDays,
}: Readonly<LeaderboardContentProps>) {
    const label = useLeagueLabel();

    const myLeague = leagues.find((league) => league.id === myLeagueId) ?? null;
    const isViewingMyLeague = activeLeague.id === myLeagueId;
    const myEntry = entries.some((entry) => entry.userId === myUserId);
    const isEmpty = !isLoading && entries.length === 0;
    const showMyPosition =
        isViewingMyLeague && !myEntry && lbUser != null && !isLoading;

    const notice = !isViewingMyLeague && myLeague && (
        <OtherLeagueNotice myLeagueName={label.name(myLeague)} />
    );

    if (isError) {
        return <LeaderboardError onRetry={onRetry} />;
    }

    if (isLoading) {
        return <LeaderboardSkeleton />;
    }

    if (isEmpty) {
        return (
            <div className="space-y-5">
                {notice}
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border">
                    <LeaderboardEmpty leagueName={label.name(activeLeague)} />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <LeaguePodium
                league={activeLeague}
                entries={entries}
                currentUserId={myUserId}
                footer={
                    isViewingMyLeague ? (
                        <LeagueProgress
                            league={activeLeague}
                            nextLeague={getNextLeague(leagues, activeLeague.id)}
                            totalPoint={totalPoint}
                        />
                    ) : undefined
                }
            />

            {notice}

            <LeaderboardList
                entries={entries}
                currentUserId={myUserId}
                streakDays={streakDays}
            />

            {showMyPosition && lbUser && (
                <div className="sticky bottom-4 z-20">
                    <MyPositionCard
                        rank={lbUser.rank}
                        fullName={lbUser.fullName}
                        avatarUrl={resolveAvatarUrl(
                            lbUser.avatarObjectKey,
                            lbUser.oAuthAvatarUrl,
                        )}
                        point={lbUser.totalPoint}
                        topSize={LEADERBOARD_TOP_SIZE}
                        streakDays={streakDays}
                    />
                </div>
            )}
        </div>
    );
}

export default LeaderboardContent;
