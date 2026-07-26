"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { getGaugeColor } from "../constants/history-detail.constant";

interface ScoreGaugeProps {
    score: number;
    /** Màu vòng điểm & con số; mặc định theo thang điểm. Truyền màu sách để đồng bộ. */
    color?: string;
}

export function ScoreGauge({ score, color }: ScoreGaugeProps) {
    const t = useTranslations("historyDetail");
    const size = 120;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(10, Math.max(0, score)) / 10;
    const strokeDashoffset = circumference - progress * circumference;

    const strokeColor = color ?? getGaugeColor(score);

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="h-full w-full -rotate-90">
                {/* Track */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-bdc-primary"
                />
                {/* Progress */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.3s ease-out" }}
                />
            </svg>
            <div className="absolute text-center">
                <span
                    className="text-3xl font-bold tabular-nums leading-none"
                    style={{ color: color ?? "var(--color-text-contrast)" }}
                >
                    {score.toFixed(1)}
                </span>
                <span className="mt-0.5 block text-[10px] uppercase tracking-wider text-text-muted">{t("pointsLabel")}</span>
            </div>
        </div>
    );
}

export default ScoreGauge;
