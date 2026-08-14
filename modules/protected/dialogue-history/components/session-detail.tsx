"use client";
import dynamic from "next/dynamic";
import {
    ArrowLeft,
    GraduationCap,
    Lightbulb,
    Sparkles,
    ThumbsUp,
    TriangleAlert,
} from "lucide-react";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getSpeakingSessionDetail } from "@/services/client/speaking.service";
import { cn } from "@/libs/utils";

const ScoreRadar = dynamic(
    () =>
        import(
            "@/modules/protected/speaking-result/components/score-radar"
        ).then((m) => m.ScoreRadar),
    {
        ssr: false,
        loading: () => (
            <div className="bg-bgc-page/50 h-64 w-full animate-pulse rounded-lg" />
        ),
    },
);

const DIMS = [
    "fluency",
    "pronunciation",
    "grammar",
    "vocabulary",
    "interaction",
    "naturalness",
    "coherence",
] as const;
type DimKey = (typeof DIMS)[number];

function barTone(v: number): string {
    if (v >= 80) return "bg-emerald-500";
    if (v >= 60) return "bg-amber-500";
    return "bg-rose-500";
}

export function SessionDetail({ sessionCode }: { sessionCode: string }) {
    const t = useTranslations("dialogueHistory");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["speaking-session-detail", sessionCode],
        queryFn: () => getSpeakingSessionDetail(sessionCode),
        enabled: !!sessionCode,
    });

    if (isLoading) {
        return (
            <div className="text-text-muted flex h-[50vh] items-center justify-center text-sm">
                {t("loading")}
            </div>
        );
    }
    if (isError || !data) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
                <p className="text-text-contrast text-lg font-semibold">
                    {t("notFound")}
                </p>
                <Button
                    component={Link}
                    href="/dialogue-history"
                    variant="contained"
                    className="!bg-bgc-highlight !rounded-lg !font-bold !text-white capitalize"
                    startIcon={<ArrowLeft className="h-4 w-4" />}
                >
                    {t("backToList")}
                </Button>
            </div>
        );
    }

    const scoreOf: Record<DimKey, number> = {
        fluency: data.fluencyScore,
        pronunciation: data.pronunciationScore,
        grammar: data.grammarScore,
        vocabulary: data.vocabularyScore,
        interaction: data.interactionScore,
        naturalness: data.naturalnessScore,
        coherence: data.coherenceScore,
    };
    const radarData = DIMS.map((d) => ({
        label: t(`dim_${d}`),
        value: scoreOf[d],
    }));
    const feedbackEntries = Object.entries(data.feedback ?? {});
    const dimSet = new Set<string>(DIMS);

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
            <Link
                href="/dialogue-history"
                className="text-text-muted hover:text-bgc-highlight inline-flex items-center gap-1.5 text-sm font-medium"
            >
                <ArrowLeft className="h-4 w-4" />
                {t("backToList")}
            </Link>

            {/* Hero */}
            <div className="border-bdc-primary bg-bgc-app relative overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-8">
                <span
                    aria-hidden
                    className="bg-bgc-highlight absolute inset-y-0 left-0 w-1.5"
                />
                <div className="flex flex-col items-center gap-6 pl-2 sm:flex-row sm:gap-8">
                    <ScoreRing value={data.overallScore} label={t("overall")} />
                    <div className="flex-1 space-y-3 text-center sm:text-left">
                        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                            <h1 className="text-text-contrast inline-flex items-center gap-2.5 text-2xl font-bold tracking-tight sm:text-3xl">
                                <Sparkles className="text-bgc-highlight h-6 w-6" />
                                {data.topic || t("detailTitle")}
                            </h1>
                            {data.jlptEstimate && (
                                <span className="bg-bgc-highlight rounded-full px-3 py-1 text-xs font-bold text-white">
                                    {t("jlpt")}: {data.jlptEstimate}
                                </span>
                            )}
                        </div>
                        {data.summary && (
                            <p className="text-text-muted text-sm leading-relaxed">
                                {data.summary}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Scores: radar + bars */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm">
                    <h2 className="text-text-contrast mb-2 text-base font-semibold">
                        {t("radarTitle")}
                    </h2>
                    <ScoreRadar data={radarData} />
                </div>
                <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-2xl border p-5 shadow-sm">
                    <h2 className="text-text-contrast mb-2 text-base font-semibold">
                        {t("scoresTitle")}
                    </h2>
                    {DIMS.map((d) => (
                        <div key={d} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-text-muted">
                                    {t(`dim_${d}`)}
                                </span>
                                <span className="text-text-contrast font-semibold">
                                    {scoreOf[d]}
                                </span>
                            </div>
                            <div className="bg-bgc-page h-2 overflow-hidden rounded-full">
                                <div
                                    className={cn(
                                        "h-full rounded-full",
                                        barTone(scoreOf[d]),
                                    )}
                                    style={{ width: `${scoreOf[d]}%` }}
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
                    items={data.strengths}
                    icon={<ThumbsUp className="h-4 w-4" />}
                    accent="emerald"
                />
                <ListCard
                    title={t("weaknesses")}
                    items={data.weaknesses}
                    icon={<TriangleAlert className="h-4 w-4" />}
                    accent="amber"
                />
            </div>

            {/* Feedback */}
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
                                    {dimSet.has(k) ? t(`dim_${k as DimKey}`) : k}
                                </div>
                                <p className="text-text-contrast text-sm leading-relaxed">
                                    {v}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Study recommendation */}
            {data.studyRecommendation && (
                <div className="rounded-2xl border border-sky-300/60 bg-sky-50 p-5 dark:border-sky-500/40 dark:bg-sky-500/10">
                    <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-sky-700 dark:text-sky-300">
                        <GraduationCap className="h-4 w-4" />
                        {t("studyTitle")}
                    </h2>
                    <div className="space-y-2 text-sm">
                        <p className="text-text-contrast">
                            <span className="font-semibold">
                                {t("studyFocus")}:{" "}
                            </span>
                            {data.studyRecommendation.focusArea}
                        </p>
                        <p className="text-text-muted">
                            <span className="text-text-contrast font-semibold">
                                {t("studyReason")}:{" "}
                            </span>
                            {data.studyRecommendation.reason}
                        </p>
                        <p className="text-text-muted">
                            <span className="text-text-contrast font-semibold">
                                {t("studyPractice")}:{" "}
                            </span>
                            {data.studyRecommendation.suggestedPractice}
                        </p>
                        {data.studyRecommendation.encouragement && (
                            <p className="mt-2 font-medium text-sky-700 dark:text-sky-300">
                                {data.studyRecommendation.encouragement}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Improved expressions */}
            {data.improvedExpressions.length > 0 && (
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm">
                    <h2 className="text-text-contrast mb-3 text-base font-semibold">
                        {t("improvedTitle")}
                    </h2>
                    <div className="space-y-3">
                        {data.improvedExpressions.map((ex, i) => (
                            <div
                                key={i}
                                className="border-bdc-primary rounded-xl border p-4"
                            >
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                    <div className="text-text-muted font-noto-jp flex-1 text-sm line-through">
                                        {ex.original}
                                    </div>
                                    <div className="font-noto-jp flex-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                        {ex.improved}
                                    </div>
                                </div>
                                {ex.explanationVi && (
                                    <p className="text-text-muted mt-2 text-xs leading-relaxed">
                                        {ex.explanationVi}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Transcript */}
            {data.fullTranscript && (
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm">
                    <h2 className="text-text-contrast mb-3 text-base font-semibold">
                        {t("transcriptTitle")}
                    </h2>
                    <pre className="text-text-contrast font-noto-jp bg-bgc-page/40 max-h-96 overflow-auto rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap">
                        {data.fullTranscript}
                    </pre>
                </div>
            )}
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

export default SessionDetail;
