"use client";

import React from "react";
import { ArrowRight, Lightbulb, ThumbsUp, TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import type {
    SessionImprovedExpression,
    SessionScoreBreakdown,
} from "@/types/responses/speaking.response";

const DIM_KEYS = new Set<string>([
    "fluency",
    "pronunciation",
    "grammar",
    "vocabulary",
    "interaction",
    "naturalness",
    "coherence",
]);

function humanizeKey(key: string): string {
    return key
        .replace(/_tip$/i, "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

interface ScoreFeedbackProps {
    strengths: string[];
    weaknesses: string[];
    feedback: Record<string, string>;
    improvedExpressions: SessionImprovedExpression[];
}

export function ScoreFeedback({
    strengths,
    weaknesses,
    feedback,
    improvedExpressions,
}: Readonly<ScoreFeedbackProps>) {
    const t = useTranslations("speakingResult");
    const feedbackEntries = Object.entries(feedback ?? {});

    return (
        <div className="space-y-6">
            {/* Strengths / Weaknesses */}
            <div className="grid gap-6 md:grid-cols-2">
                <ListCard
                    title={t("strengths")}
                    items={strengths}
                    icon={<ThumbsUp className="h-4 w-4" />}
                    accent="emerald"
                />
                <ListCard
                    title={t("weaknesses")}
                    items={weaknesses}
                    icon={<TriangleAlert className="h-4 w-4" />}
                    accent="amber"
                />
            </div>

            {/* Feedback tips */}
            {feedbackEntries.length > 0 && (
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm">
                    <h2 className="text-text-contrast mb-3 flex items-center gap-2 text-base font-semibold">
                        <Lightbulb className="text-bgc-highlight h-4 w-4" />
                        {t("feedbackTitle")}
                    </h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {feedbackEntries.map(([k, v]) => (
                            <div
                                key={k}
                                className="border-bdc-primary bg-bgc-page/40 rounded-xl border p-4"
                            >
                                <div className="text-bgc-highlight mb-1 text-xs font-bold tracking-wide uppercase">
                                    {DIM_KEYS.has(k)
                                        ? t(
                                              `dim_${k as keyof SessionScoreBreakdown}`,
                                          )
                                        : humanizeKey(k)}
                                </div>
                                <p className="text-text-contrast text-sm leading-relaxed">
                                    {v}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Improved expressions */}
            {improvedExpressions.length > 0 && (
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm">
                    <h2 className="text-text-contrast mb-3 text-base font-semibold">
                        {t("improvedTitle")}
                    </h2>
                    <div className="space-y-3">
                        {improvedExpressions.map((ex, i) => (
                            <div
                                key={i}
                                className="border-bdc-primary flex flex-col gap-2 rounded-xl border p-4 sm:flex-row sm:items-center"
                            >
                                <div className="text-text-muted font-noto-jp flex-1 text-sm line-through">
                                    {ex.original}
                                </div>
                                <ArrowRight className="text-bgc-highlight h-4 w-4 shrink-0 rotate-90 sm:rotate-0" />
                                <div className="font-noto-jp flex-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                    {ex.improved}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function ListCard({
    title,
    items,
    icon,
    accent,
}: {
    title: string;
    items: string[];
    icon: React.ReactNode;
    accent: "emerald" | "amber";
}) {
    const dot = accent === "emerald" ? "bg-emerald-500" : "bg-amber-500";
    const head =
        accent === "emerald"
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-amber-600 dark:text-amber-400";
    return (
        <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm">
            <h2
                className={cn(
                    "mb-3 flex items-center gap-2 text-base font-semibold",
                    head,
                )}
            >
                {icon}
                {title}
            </h2>
            <ul className="space-y-2">
                {items.map((it, i) => (
                    <li
                        key={i}
                        className="text-text-contrast flex gap-2 text-sm leading-relaxed"
                    >
                        <span
                            className={cn(
                                "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                                dot,
                            )}
                        />
                        {it}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScoreFeedback;
