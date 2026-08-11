"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { ContainerBox } from "@/components/ui/container.box";
import { getSpeakingHistoryList } from "@/services/client/speaking.service";
import type { SpeakingHistoryListItem } from "@/types/responses/speaking.response";
import {
    DAY_NAMES_VI,
    DEFAULT_CHART_HISTORY_PAGE_SIZE,
} from "../constants/dashboard.constant";

export function PracticeTimeChart({ className = "" }: { className?: string }) {
    const t = useTranslations("dashboard");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["speaking-history-chart"],
        queryFn: () =>
            getSpeakingHistoryList({
                page: 0,
                size: DEFAULT_CHART_HISTORY_PAGE_SIZE,
            }),
    });

    const items = useMemo<SpeakingHistoryListItem[]>(
        () => data?.items ?? [],
        [data],
    );

    const { chartData, totalSec, avgSec, trendPercent } = useMemo(() => {
        const now = new Date();
        const dateMap = new Map<string, { totalSec: number; count: number }>();

        const todayEnd = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            23,
            59,
            59,
            999,
        ).getTime();
        const startCurrent7 = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 6,
            0,
            0,
            0,
            0,
        ).getTime();
        const startPrev7 = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - 13,
            0,
            0,
            0,
            0,
        ).getTime();

        let current7TotalSec = 0;
        let prev7TotalSec = 0;

        items.forEach((item) => {
            if (!item.practicedAt) return;
            const d = new Date(item.practicedAt);
            const time = d.getTime();
            if (Number.isNaN(time)) return;

            const sec = item.durationSec || 0;

            if (time >= startCurrent7 && time <= todayEnd) {
                current7TotalSec += sec;

                const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                const prev = dateMap.get(dateKey) || {
                    totalSec: 0,
                    count: 0,
                };
                dateMap.set(dateKey, {
                    totalSec: prev.totalSec + sec,
                    count: prev.count + 1,
                });
            } else if (time >= startPrev7 && time < startCurrent7) {
                prev7TotalSec += sec;
            }
        });

        const result = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() - i,
            );
            const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
            const stat = dateMap.get(dateKey) || { totalSec: 0, count: 0 };

            const dayName = DAY_NAMES_VI[d.getDay()];
            const fullLabel = `${dayName} (${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")})`;

            result.push({
                day: dayName,
                fullLabel,
                seconds: stat.totalSec,
                count: stat.count,
            });
        }

        const averageSec = Math.round((current7TotalSec / 7) * 10) / 10;

        let trend = 0;
        if (prev7TotalSec > 0) {
            trend = Math.round(
                ((current7TotalSec - prev7TotalSec) / prev7TotalSec) * 100,
            );
        } else if (current7TotalSec > 0) {
            trend = 100;
        }

        return {
            chartData: result,
            totalSec: current7TotalSec,
            avgSec: averageSec,
            trendPercent: trend,
        };
    }, [items]);

    if (!mounted || isLoading) {
        return (
            <ContainerBox
                className={`border-bdc-primary h-full border ${className}`}
            >
                <div className="bg-bdc-primary/30 h-6 w-48 animate-pulse rounded" />
                <div className="bg-bgc-subtle text-text-muted mt-6 flex h-64 w-full items-center justify-center rounded-lg text-xs">
                    {t("loadingChart")}
                </div>
            </ContainerBox>
        );
    }

    if (isError) {
        return (
            <ContainerBox
                className={`border-bdc-primary h-full border ${className}`}
            >
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                    <p className="text-text-muted text-sm">
                        {t("errorLoadingChart")}
                    </p>
                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="mt-3 rounded-lg bg-[#ff758f] px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90"
                    >
                        {t("retryBtn")}
                    </button>
                </div>
            </ContainerBox>
        );
    }

    return (
        <ContainerBox
            className={`border-bdc-primary flex h-full flex-col justify-between border ${className}`}
        >
            {/* Header & Quick stats */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-text-primary flex items-center gap-2 text-lg font-bold">
                        <AccessTimeIcon
                            className="text-[#ff758f]"
                            fontSize="small"
                        />
                        {t("chartTitle")}
                    </h3>
                    <p className="text-text-muted mt-1 text-xs">
                        {t("chartSubtitle")}
                    </p>
                </div>

                <div className="bg-bgc-subtle flex flex-wrap items-center gap-3 rounded-xl p-3 text-xs sm:gap-4">
                    <div>
                        <span className="text-text-muted block text-[10px] font-semibold uppercase">
                            {t("chartTotal")}
                        </span>
                        <span className="text-sm font-extrabold text-[#ff758f]">
                            {t("chartSeconds", { count: totalSec })}
                        </span>
                    </div>
                    <div className="bg-bdc-primary/50 h-8 w-px" />
                    <div>
                        <span className="text-text-muted block text-[10px] font-semibold uppercase">
                            {t("chartAvg")}
                        </span>
                        <span className="text-text-primary text-sm font-extrabold">
                            {t("chartSeconds", { count: avgSec })}
                        </span>
                    </div>
                    <div className="bg-bdc-primary/50 h-8 w-px" />
                    <div className="flex items-center gap-1 font-bold text-emerald-500">
                        <TrendingUpIcon fontSize="small" />
                        <span>
                            {trendPercent >= 0
                                ? `+${trendPercent}%`
                                : `${trendPercent}%`}
                        </span>
                    </div>
                </div>
            </div>

            {/* Chart Area flex-1 tự giãn bằng độ cao của Quiz */}
            <div className="mt-6 min-h-[220px] w-full flex-1">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart
                        data={chartData}
                        margin={{ top: 12, right: 12, left: -16, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="colorSecondsSakura"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#ff99ac"
                                    stopOpacity={0.5}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#ff99ac"
                                    stopOpacity={0.0}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="currentColor"
                            className="text-bdc-primary/30"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="day"
                            stroke="currentColor"
                            className="text-text-muted"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="currentColor"
                            className="text-text-muted"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            cursor={{
                                stroke: "#ff758f",
                                strokeWidth: 1.5,
                                strokeDasharray: "4 4",
                            }}
                            contentStyle={{
                                backgroundColor: "var(--color-bgc-card)",
                                border: "1px solid #ff99ac",
                                borderRadius: 12,
                                fontSize: 13,
                                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                                color: "var(--color-text-primary)",
                            }}
                            formatter={(value: any, _name: any, item: any) => {
                                const payload = item?.payload;
                                const count = payload?.count || 0;
                                return [
                                    t("chartTooltipDetail", {
                                        seconds: value,
                                        count,
                                    }),
                                    t("chartTooltipTime"),
                                ];
                            }}
                            labelFormatter={(label, items) => {
                                const payload = items?.[0]?.payload;
                                return payload?.fullLabel
                                    ? t("chartTooltipDate", {
                                          date: payload.fullLabel,
                                      })
                                    : t("chartTooltipDay", { label });
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="seconds"
                            stroke="#ff758f"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSecondsSakura)"
                            activeDot={{
                                r: 6,
                                fill: "#ff758f",
                                stroke: "#fff",
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </ContainerBox>
    );
}

export default PracticeTimeChart;
