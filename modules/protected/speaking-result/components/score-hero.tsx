"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

interface ScoreHeroProps {
    overallScore: number;
    jlptEstimate: string;
    summary: string;
}

export function ScoreHero({
    overallScore,
    jlptEstimate,
    summary,
}: Readonly<ScoreHeroProps>) {
    const t = useTranslations("speakingResult");
    const pct = Math.max(0, Math.min(100, overallScore));

    return (
        <div
            data-tour-id="tour-ai1on1-result"
            className="border-bdc-primary bg-bgc-app relative overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-8"
        >
            <span
                aria-hidden
                className="bg-bgc-highlight absolute inset-y-0 left-0 w-1.5"
            />
            <div className="flex flex-col items-center gap-6 pl-2 sm:flex-row sm:gap-8">
                {/* Score Ring */}
                <div
                    className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full"
                    style={{
                        background: `conic-gradient(var(--color-bgc-highlight) ${pct}%, var(--color-bdc-primary) 0)`,
                    }}
                >
                    <div className="bg-bgc-app flex h-24 w-24 flex-col items-center justify-center rounded-full">
                        <span className="text-text-contrast text-3xl font-bold">
                            {overallScore}
                        </span>
                        <span className="text-text-muted text-[10px] tracking-wide uppercase">
                            {t("overall")}
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-3 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                        <h1 className="text-text-contrast inline-flex items-center gap-2.5 text-2xl font-bold tracking-tight sm:text-3xl">
                            <Sparkles className="text-bgc-highlight h-6 w-6" />
                            {t("title")}
                        </h1>
                        <span className="bg-bgc-highlight rounded-full px-3 py-1 text-xs font-bold text-white">
                            {t("jlpt")}: {jlptEstimate}
                        </span>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed">
                        {summary}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ScoreHero;
