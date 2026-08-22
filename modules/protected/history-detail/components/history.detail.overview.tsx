"use client";
import React from "react";
import { Bot, Mic } from "lucide-react";
import { useTranslations } from "next-intl";
import type {
    AiFeedbackResponse,
    SpeechAssessmentResponse,
} from "@/types/responses/speaking.response";
import DimensionMeter from "./dimension.meter";

interface HistoryDetailOverviewProps {
    speechAssessment: SpeechAssessmentResponse;
    aiFeedback: AiFeedbackResponse;
    accent: string;
}

/**
 * Hệ thống chấm theo 2 nguồn tách biệt — hiển thị thành 2 khối riêng để người
 * học biết rõ điểm nào đến từ đâu: Azure (phát âm, giọng nói thô) và AI/LLM
 * (ngữ pháp, từ vựng, nội dung câu trả lời). overallScore = trung bình cộng
 * điểm trung bình của 2 khối này.
 */
export function HistoryDetailOverview({
    speechAssessment,
    aiFeedback,
    accent,
}: HistoryDetailOverviewProps) {
    const t = useTranslations("historyDetail");

    return (
        <div className="grid gap-5 lg:grid-cols-2">
            <section className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h3
                        className="flex items-center gap-2 text-sm font-bold"
                        style={{ color: accent }}
                    >
                        <Mic className="h-4 w-4" />
                        {t("speechAssessmentTitle")}
                    </h3>
                    <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-bold tabular-nums"
                        style={{
                            color: accent,
                            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                        }}
                    >
                        {Math.round(speechAssessment.averageScore ?? 0)}/100
                    </span>
                </div>
                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                    <DimensionMeter
                        label={t("dimensionAccuracy")}
                        score={speechAssessment.accuracyScore ?? 0}
                        color={accent}
                    />
                    <DimensionMeter
                        label={t("fluencyLabel")}
                        score={speechAssessment.fluencyScore ?? 0}
                        color={accent}
                    />
                    <DimensionMeter
                        label={t("completenessLabel")}
                        score={speechAssessment.completenessScore ?? 0}
                        color={accent}
                    />
                    <DimensionMeter
                        label={t("dimensionPronunciation")}
                        score={speechAssessment.pronunciationScore ?? 0}
                        color={accent}
                    />
                </div>
            </section>

            <section className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 md:p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <h3
                        className="flex items-center gap-2 text-sm font-bold"
                        style={{ color: accent }}
                    >
                        <Bot className="h-4 w-4" />
                        {t("aiFeedbackTitle")}
                    </h3>
                    <span
                        className="rounded-full px-2.5 py-0.5 text-xs font-bold tabular-nums"
                        style={{
                            color: accent,
                            background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                        }}
                    >
                        {Math.round(aiFeedback.averageScore ?? 0)}/100
                    </span>
                </div>
                <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                    <DimensionMeter
                        label={t("dimensionGrammar")}
                        score={aiFeedback.grammarScore ?? 0}
                        color={accent}
                    />
                    <DimensionMeter
                        label={t("dimensionVocabulary")}
                        score={aiFeedback.vocabularyScore ?? 0}
                        color={accent}
                    />
                    <DimensionMeter
                        label={t("dimensionNaturalness")}
                        score={aiFeedback.naturalnessScore ?? 0}
                        color={accent}
                    />
                    <DimensionMeter
                        label={t("dimensionContentRelevance")}
                        score={aiFeedback.contentRelevantScore ?? 0}
                        color={accent}
                    />
                </div>
            </section>
        </div>
    );
}

export default HistoryDetailOverview;
