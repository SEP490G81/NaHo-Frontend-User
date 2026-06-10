"use client";
import React from "react";
import ScoreGauge from "./score.gauge";
import DimensionMeter from "./dimension.meter";

interface HistoryDetailOverviewProps {
    report: {
        average: number;
        scores: {
            pronunciation: number;
            vocabulary: number;
            grammar: number;
            naturalness: number;
        };
    };
    t: any;
}

export function HistoryDetailOverview({ report, t }: HistoryDetailOverviewProps) {
    return (
        <section className="rounded-2xl border border-bdc-primary bg-bgc-app p-5 md:p-6">
            <h2 className="mb-4 text-lg font-semibold text-text-contrast">{t("overviewTitle")}</h2>
            <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
                <div className="flex justify-center md:justify-start">
                    <ScoreGauge score={report.average} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <DimensionMeter label={t("dimensionPronunciation")} score={report.scores.pronunciation * 10} />
                    <DimensionMeter label={t("dimensionVocabulary")} score={report.scores.vocabulary * 10} />
                    <DimensionMeter label={t("dimensionGrammar")} score={report.scores.grammar * 10} />
                    <DimensionMeter label={t("dimensionNaturalness")} score={report.scores.naturalness * 10} />
                </div>
            </div>
        </section>
    );
}

export default HistoryDetailOverview;
