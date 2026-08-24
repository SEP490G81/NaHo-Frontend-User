"use client";

import React, { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useChatStore } from "@/store/chatStore";
import { useRouter } from "@/i18n/navigation";
import type { SessionScoreBreakdown } from "@/types/responses/speaking.response";
import { ScoreHero } from "./score-hero";
import { ScoreBreakdown } from "./score-breakdown";
import { ScoreFeedback } from "./score-feedback";

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

export function SessionReport() {
    const t = useTranslations("speakingResult");
    const router = useRouter();
    const report = useChatStore((s) => s.report);
    const reset = useChatStore((s) => s.reset);

    useEffect(() => {
        if (!report) router.replace("/persona-setup");
    }, [report, router]);

    if (!report) return null;

    const radarData = DIMS.map((d) => ({
        label: t(`dim_${d}`),
        value: report.scores[d],
    }));

    const handleRetry = () => {
        reset();
        router.push("/persona-setup");
    };

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
            {/* Hero */}
            <ScoreHero
                overallScore={report.overallScore}
                jlptEstimate={report.jlptEstimate}
                summary={report.summary}
            />

            {/* Scores: radar + breakdown bars */}
            <div className="grid gap-6 lg:grid-cols-2">
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm">
                    <h2 className="text-text-contrast mb-2 text-base font-semibold">
                        {t("breakdownTitle")}
                    </h2>
                    <ScoreRadar data={radarData} />
                </div>
                <ScoreBreakdown scores={report.scores} />
            </div>

            {/* Strengths, Weaknesses, Feedback, Improved Expressions */}
            <ScoreFeedback
                strengths={report.strengths}
                weaknesses={report.weaknesses}
                feedback={report.feedback}
                improvedExpressions={report.improvedExpressions}
            />

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

export default SessionReport;
