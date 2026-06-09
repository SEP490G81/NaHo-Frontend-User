"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { getScoreBadgeClass } from "../constants/history.constant";

interface ScoreBadgeProps {
    score: number;
    className?: string;
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
    const badgeColorClass = getScoreBadgeClass(score);

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tabular-nums",
                badgeColorClass,
                className
            )}
        >
            {score.toFixed(1)}/10
        </span>
    );
}

export default ScoreBadge;
