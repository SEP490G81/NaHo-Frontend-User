"use client";
import React from "react";
import { useTranslations } from "next-intl";
import DimensionMeter from "./dimension.meter";

interface HistoryDetailOverviewProps {
    pronunciationScore: number;
    vocabularyScore: number;
    grammarScore: number;
    naturalnessScore: number;
    contentRelevantScore: number;
    accent: string;
}

/** Thẻ 5 tiêu chí đánh giá (điểm tổng hiển thị ở hero) — thang điểm 0-100. */
export function HistoryDetailOverview({
    pronunciationScore,
    vocabularyScore,
    grammarScore,
    naturalnessScore,
    contentRelevantScore,
    accent,
}: HistoryDetailOverviewProps) {
    const t = useTranslations("historyDetail");
    return (
        <section className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 md:p-6">
            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                <DimensionMeter
                    label={t("dimensionPronunciation")}
                    score={pronunciationScore}
                    color={accent}
                />
                <DimensionMeter
                    label={t("dimensionVocabulary")}
                    score={vocabularyScore}
                    color={accent}
                />
                <DimensionMeter
                    label={t("dimensionGrammar")}
                    score={grammarScore}
                    color={accent}
                />
                <DimensionMeter
                    label={t("dimensionNaturalness")}
                    score={naturalnessScore}
                    color={accent}
                />
                <DimensionMeter
                    label={t("dimensionContentRelevance")}
                    score={contentRelevantScore}
                    color={accent}
                />
            </div>
        </section>
    );
}

export default HistoryDetailOverview;
