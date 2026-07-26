"use client";
import React from "react";
import type { Reaction } from "../types/reaction";
import { REACTION_EMOJIS } from "../constants/reaction-type";

interface ReactionSummaryProps {
    reactions: Reaction[];
}

export function ReactionSummary({ reactions }: ReactionSummaryProps) {
    if (reactions.length === 0) return null;

    // Get distinct reaction types with count
    const counts = reactions.reduce(
        (acc, curr) => {
            acc[curr.reactionType] = (acc[curr.reactionType] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    const sortedReactions = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    return (
        <div className="text-text-muted flex items-center gap-1.5 text-xs select-none">
            <div className="flex items-center -space-x-1">
                {sortedReactions.slice(0, 3).map(([type]) => {
                    const typeKey = type as keyof typeof REACTION_EMOJIS;
                    return (
                        <span
                            key={type}
                            title={REACTION_EMOJIS[typeKey]?.label}
                            className="bg-bgc-page inline-flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] shadow-sm"
                        >
                            {REACTION_EMOJIS[typeKey]?.emoji}
                        </span>
                    );
                })}
            </div>
            <span>{reactions.length}</span>
        </div>
    );
}

export default ReactionSummary;
