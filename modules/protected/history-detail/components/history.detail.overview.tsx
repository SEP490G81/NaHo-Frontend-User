"use client";
import React from "react";
import { useTranslations } from "next-intl";
import DimensionMeter from "./dimension.meter";

interface HistoryDetailOverviewProps {
    report: {
        scores: {
            pronunciation: number;
            vocabulary: number;
            grammar: number;
            naturalness: number;
        };
    };
    accent: string;
}

/** Thẻ 4 tiêu chí đánh giá (điểm tổng hiển thị ở hero). */
export function HistoryDetailOverview({
    report,
    accent,
}: HistoryDetailOverviewProps) {
    const t = useTranslations("historyDetail");
    return (
        <section className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 md:p-6">
            <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                <DimensionMeter
                    label={t("dimensionPronunciation")}
                    score={report.scores.pronunciation * 10}
                    color={accent}
                />
                <DimensionMeter
                    label={t("dimensionVocabulary")}
                    score={report.scores.vocabulary * 10}
                    color={accent}
                />
                <DimensionMeter
                    label={t("dimensionGrammar")}
                    score={report.scores.grammar * 10}
                    color={accent}
                />
                <DimensionMeter
                    label={t("dimensionNaturalness")}
                    score={report.scores.naturalness * 10}
                    color={accent}
                />
            </div>
        </section>
    );
}

export default HistoryDetailOverview;
