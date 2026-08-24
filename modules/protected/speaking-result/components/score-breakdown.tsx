"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import type { SessionScoreBreakdown } from "@/types/responses/speaking.response";

const DIMS: (keyof SessionScoreBreakdown)[] = [
    "fluency",
    "pronunciation",
    "grammar",
    "vocabulary",
    "interaction",
    "naturalness",
    "coherence",
];

function barTone(v: number): string {
    if (v >= 80) return "bg-emerald-500";
    if (v >= 60) return "bg-amber-500";
    return "bg-rose-500";
}

interface ScoreBreakdownProps {
    scores: SessionScoreBreakdown;
}

export function ScoreBreakdown({ scores }: Readonly<ScoreBreakdownProps>) {
    const t = useTranslations("speakingResult");

    return (
        <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-5 shadow-sm">
            <h2 className="text-text-contrast mb-2 text-base font-semibold">
                {t("detailTitle")}
            </h2>
            {DIMS.map((d) => (
                <div key={d} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-text-muted">{t(`dim_${d}`)}</span>
                        <span className="text-text-contrast font-semibold">
                            {scores[d]}
                        </span>
                    </div>
                    <div className="bg-bgc-page h-2 overflow-hidden rounded-full">
                        <div
                            className={cn(
                                "h-full rounded-full transition-[width]",
                                barTone(scores[d]),
                            )}
                            style={{ width: `${scores[d]}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ScoreBreakdown;
