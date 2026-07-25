"use client";

import React, { useState, useEffect } from "react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useTranslations } from "next-intl";
import { dailyPractice } from "@/data/mockLearnerDashboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export function PracticeTimeChart() {
    const t = useTranslations("dashboard");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalMinutes = dailyPractice.reduce((acc, curr) => acc + curr.minutes, 0);
    const avgMinutes = Math.round(totalMinutes / dailyPractice.length);

    if (!mounted) {
        return (
            <div className="rounded-2xl border border-bdc-primary bg-bgc-card p-6 shadow-sm">
                <div className="h-6 w-48 bg-bdc-primary/30 rounded animate-pulse" />
                <div className="mt-6 flex h-64 w-full items-center justify-center rounded-lg bg-bgc-subtle text-text-muted text-xs">
                    {t("loadingChart")}
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border border-bdc-primary bg-bgc-card p-6 shadow-sm transition-all hover:shadow-md">
            {/* Header & Quick stats */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                        <AccessTimeIcon className="text-[#ff758f]" fontSize="small" />
                        {t("chartTitle")}
                    </h3>
                    <p className="mt-1 text-xs text-text-muted">{t("chartSubtitle")}</p>
                </div>

                <div className="flex items-center gap-4 rounded-xl bg-bgc-subtle p-3 text-xs">
                    <div>
                        <span className="text-text-muted block text-[10px] uppercase font-semibold">
                            {t("chartTotal")}
                        </span>
                        <span className="text-sm font-extrabold text-[#ff758f]">
                            {totalMinutes} {t("chartTooltipMinute")}
                        </span>
                    </div>
                    <div className="h-8 w-px bg-bdc-primary/50" />
                    <div>
                        <span className="text-text-muted block text-[10px] uppercase font-semibold">
                            {t("chartAvg")}
                        </span>
                        <span className="text-sm font-extrabold text-text-primary">
                            {avgMinutes} {t("chartTooltipMinute")}
                        </span>
                    </div>
                    <div className="h-8 w-px bg-bdc-primary/50" />
                    <div className="flex items-center gap-1 font-bold text-emerald-500">
                        <TrendingUpIcon fontSize="small" />
                        <span>{t("chartTrend")}</span>
                    </div>
                </div>
            </div>

            {/* Chart Area */}
            <div className="mt-6 h-64 w-full">
                <ResponsiveContainer width="100%" height={256} minWidth={0}>
                    <AreaChart
                        data={dailyPractice}
                        margin={{ top: 12, right: 12, left: -16, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorMinutesSakura" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ff99ac" stopOpacity={0.5} />
                                <stop offset="95%" stopColor="#ff99ac" stopOpacity={0.0} />
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
                            cursor={{ stroke: "#ff758f", strokeWidth: 1.5, strokeDasharray: "4 4" }}
                            contentStyle={{
                                backgroundColor: "var(--color-bgc-card)",
                                border: "1px solid #ff99ac",
                                borderRadius: 12,
                                fontSize: 13,
                                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                                color: "var(--color-text-primary)",
                            }}
                            formatter={(value: any) => [
                                `${value} ${t("chartTooltipMinute")}`,
                                t("chartTooltipTime"),
                            ]}
                            labelFormatter={(label) => t("chartTooltipDay", { label })}
                        />
                        <Area
                            type="monotone"
                            dataKey="minutes"
                            stroke="#ff758f"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorMinutesSakura)"
                            activeDot={{ r: 6, fill: "#ff758f", stroke: "#fff", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default PracticeTimeChart;
