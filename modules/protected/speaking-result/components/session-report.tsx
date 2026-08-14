"use client";
import { useEffect } from "react";
import {
    ArrowRight,
    Lightbulb,
    RefreshCw,
    Sparkles,
    ThumbsUp,
    TriangleAlert,
} from "lucide-react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useChatStore } from "@/store/chatStore";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import type { SessionScoreBreakdown } from "@/types/responses/speaking.response";

const ScoreRadar = dynamic(
    () => import("./score-radar").then((m) => m.ScoreRadar),
    {
        ssr: false,
        loading: () => (
            <div className="bg-bgc-page/50 h-64 w-full animate-pulse rounded-lg" />
        ),
    },
);

const DIMS: (keyof SessionScoreBreakdown)[] = [
    "fluency",
    "pronunciation",
    "grammar",
    "vocabulary",
    "interaction",
    "naturalness",
    "coherence",
];

function humanizeKey(key: string): string {
    return key
        .replace(/_tip$/i, "")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

const DIM_KEYS = new Set<string>([
    "fluency",
    "pronunciation",
    "grammar",
    "vocabulary",
    "interaction",
    "naturalness",
    "coherence",
]);

function barTone(v: number): string {
    if (v >= 80) return "bg-emerald-500";
    if (v >= 60) return "bg-amber-500";
    return "bg-rose-500";
}

export function SessionReport() {
    const t = useTranslations("speakingResult");
    const router = useRouter();
    const report = useChatStore((s) => s.report);
    const reset = useChatStore((s) => s.reset);

    useEffect(() => {
        if (!report) router.replace("/dialogue-setup");
    }, [report, router]);

    if (!report) return null;

    const radarData = DIMS.map((d) => ({
        label: t(`dim_${d}`),
        value: report.scores[d],
    }));

    const handleRetry = () => {
        reset();
        router.push("/dialogue-setup");
    };

    const feedbackEntries = Object.entries(report.feedback ?? {});

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
            {/* Hero */}
            <div className="border-bdc-primary bg-bgc-app relative overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-8">
                <span
                    aria-hidden
                    className="bg-bgc-highlight absolute inset-y-0 left-0 w-1.5"
                />
                <div className="flex flex-col items-center gap-6 pl-2 sm:flex-row sm:gap-8">
                    <ScoreRing
                        value={report.overallScore}
                        label={t("overall")}
                    />
                    <div className="flex-1 space-y-3 text-center sm:text-left">
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                            <h1 className="text-text-contrast inline-flex items-center gap-2.5 text-2xl font-bold tracking-tight sm:text-3xl">
                                <Sparkles className="text-bgc-highlight h-6 w-6" />
                                {t("title")}
                            </h1>
                            <span className="bg-bgc-highlight rounded-full px-3 py-1 text-xs font-bold text-white">
                                {t("jlpt")}: {report.jlptEstimate}
                            </span>
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed">
                            {report.summary}
                        </p>
                    </div>
                </div>
            </div>

            {/* Scores: radar + bars */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm">
                    <h2 className="text-text-contrast mb-2 text-base font-semibold">
                        {t("breakdownTitle")}
                    </h2>
                    <ScoreRadar data={radarData} />
                </div>
                <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-5 shadow-sm">
                    <h2 className="text-text-contrast mb-2 text-base font-semibold">
                        {t("detailTitle")}
                    </h2>
                    {DIMS.map((d) => (
                        <div key={d} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-muted">
                                    {t(`dim_${d}`)}
                                </span>
                                <span className="text-text-contrast font-semibold">
                                    {report.scores[d]}
                                </span>
                            </div>
                            <div className="bg-bgc-page h-2 overflow-hidden rounded-full">
                                <div
                                    className={cn(
                                        "h-full rounded-full transition-[width]",
                                        barTone(report.scores[d]),
                                    )}
                                    style={{ width: `${report.scores[d]}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Strengths / Weaknesses */}
            <div className="grid gap-6 md:grid-cols-2">
                <ListCard
                    title={t("strengths")}
                    items={report.strengths}
                    icon={<ThumbsUp className="h-4 w-4" />}
                    accent="emerald"
                />
                <ListCard
                    title={t("weaknesses")}
                    items={report.weaknesses}
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
            {report.improvedExpressions.length > 0 && (
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm">
                    <h2 className="text-text-contrast mb-3 text-base font-semibold">
                        {t("improvedTitle")}
                    </h2>
                    <div className="space-y-3">
                        {report.improvedExpressions.map((ex, i) => (
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

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
                <Button
                    onClick={handleRetry}
                    variant="contained"
                    color="primary"
                    startIcon={<RefreshCw className="h-4 w-4" />}
                    className="!rounded-xl !px-5 !font-bold text-white capitalize hover:opacity-90"
                >
                    {t("retry")}
                </Button>
            </div>
        </div>
    );
}

function ScoreRing({ value, label }: { value: number; label: string }) {
    const pct = Math.max(0, Math.min(100, value));
    return (
        <div
            className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full"
            style={{
                background: `conic-gradient(var(--color-bgc-highlight) ${pct}%, var(--color-bdc-primary) 0)`,
            }}
        >
            <div className="bg-bgc-app flex h-24 w-24 flex-col items-center justify-center rounded-full">
                <span className="text-text-contrast text-3xl font-bold">
                    {value}
                </span>
                <span className="text-text-muted text-[10px] tracking-wide uppercase">
                    {label}
                </span>
            </div>
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

export default SessionReport;
