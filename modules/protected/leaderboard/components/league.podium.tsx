"use client";
import React from "react";
import { Crown } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn, formatPoints } from "@/libs/utils";
import {
    LeaderboardEntry,
    LeagueResponse,
} from "@/types/responses/league.response";
import {
    MEDAL_CLASSES,
    PODIUM_STYLES,
} from "../constants/leaderboard.constant";
import { getLeagueTheme, toLeagueSlug } from "../utils/leaderboard.util";
import { useLeagueLabel } from "../utils/use.league.label";
import LearnerAvatar from "./learner.avatar";

interface PodiumColumnProps {
    entry: LeaderboardEntry | undefined;
    place: 1 | 2 | 3;
    isCurrentUser: boolean;
}

function PodiumColumn({ entry, place, isCurrentUser }: PodiumColumnProps) {
    const style = PODIUM_STYLES[place];
    const isFirst = place === 1;
    const avatarSize = isFirst ? 76 : 60;
    const pedestalHeight = isFirst ? "h-28" : place === 2 ? "h-20" : "h-16";

    return (
        <div className="flex min-w-0 flex-col items-center self-end">
            {isFirst && (
                <Crown className="text-league-gold mb-1 h-6 w-6 fill-current" />
            )}

            <div
                className={cn(
                    "relative rounded-full border-[3px]",
                    style.border,
                )}
            >
                {entry ? (
                    <LearnerAvatar
                        fullName={entry.fullName}
                        avatarUrl={entry.avatarUrl}
                        size={avatarSize}
                    />
                ) : (
                    <div
                        style={{ width: avatarSize, height: avatarSize }}
                        className="bg-bgc-page rounded-full"
                    />
                )}
                <span
                    className={cn(
                        "ring-bgc-app absolute -bottom-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full text-xs font-bold ring-2",
                        MEDAL_CLASSES[place],
                    )}
                >
                    {place}
                </span>
            </div>

            <p
                className={cn(
                    "mt-3 max-w-full truncate text-center text-sm font-semibold",
                    isCurrentUser ? "text-bgc-highlight" : "text-text-contrast",
                )}
            >
                {entry?.fullName ?? "—"}
            </p>
            {entry && (
                <p className={cn("text-xs font-bold", style.text)}>
                    {formatPoints(entry.point)}{" "}
                    <span className="text-text-muted font-medium">L-Point</span>
                </p>
            )}

            <div
                className={cn(
                    "mt-2 flex w-full items-start justify-center rounded-t-xl pt-2",
                    style.pedestal,
                    pedestalHeight,
                )}
            >
                <span className="text-text-muted/40 text-2xl font-black">
                    {place}
                </span>
            </div>
        </div>
    );
}

interface LeaguePodiumProps {
    league: LeagueResponse;
    entries: LeaderboardEntry[];
    currentUserId: number | undefined;
    footer?: React.ReactNode;
}

export function LeaguePodium({
    league,
    entries,
    currentUserId,
    footer,
}: LeaguePodiumProps) {
    const t = useTranslations("leaderboard");
    const label = useLeagueLabel();
    const theme = getLeagueTheme(league.name);
    const cssVar = `--color-league-${toLeagueSlug(league.name)}`;
    const isMe = (entry?: LeaderboardEntry) =>
        entry !== undefined && entry.userId === currentUserId;

    return (
        <section
            className={cn("rounded-2xl border p-6", theme.border)}
            style={{
                // gradient màu hạng phủ LÊN nền đặc bgc-app -> không lộ nền trang
                background: `linear-gradient(160deg, color-mix(in srgb, var(${cssVar}) 16%, transparent), transparent 60%), var(--color-bgc-app)`,
            }}
        >
            <p className="text-text-muted text-[11px] font-bold tracking-wide uppercase">
                {t("podiumTitle")}
            </p>
            <h2 className={cn("mt-1 text-2xl font-bold", theme.text)}>
                {label.name(league)}
            </h2>
            <p className="text-text-muted mt-1 text-sm">
                {label.description(league)}
            </p>

            <div className="mx-auto mt-6 grid max-w-md grid-cols-3 items-end gap-3">
                <PodiumColumn
                    entry={entries[1]}
                    place={2}
                    isCurrentUser={isMe(entries[1])}
                />
                <PodiumColumn
                    entry={entries[0]}
                    place={1}
                    isCurrentUser={isMe(entries[0])}
                />
                <PodiumColumn
                    entry={entries[2]}
                    place={3}
                    isCurrentUser={isMe(entries[2])}
                />
            </div>

            {footer && (
                <div className="border-bdc-primary mt-6 border-t pt-4">
                    {footer}
                </div>
            )}
        </section>
    );
}

export default LeaguePodium;
