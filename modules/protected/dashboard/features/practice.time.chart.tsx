"use client";
import React, { useState, useEffect } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { useTranslations } from "next-intl";
import { dailyPractice } from "@/data/mockLearnerDashboard";
import { CHART_COLOR, CHART_HOVER_FILL } from "../constants/dashboard.constant";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export function PracticeTimeChart() {
    const t = useTranslations("dashboard");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="border-bdc-primary bg-bgc-app rounded-md border p-6">
                <h3 className="text-text-contrast text-lg font-semibold">
                    {t("chartTitle")}
                </h3>
                <p className="text-text-muted mt-1 text-sm">
                    {t("chartSubtitle")}
                </p>
                <div className="bg-bgc-page/50 text-text-muted mt-6 flex h-64 w-full animate-pulse items-center justify-center rounded-lg text-xs">
                    {t("loadingChart")}
                </div>
            </div>
        );
    }

    return (
        <div className="border-bdc-primary bg-bgc-app rounded-md border p-6">
            <h3 className="text-text-contrast text-lg font-semibold">
                {t("chartTitle")}
            </h3>
            <p className="text-text-muted mt-1 text-sm">{t("chartSubtitle")}</p>
            <div className="mt-6 h-64 w-full">
                <ResponsiveContainer width="100%" height={256} minWidth={0}>
                    <BarChart
                        data={dailyPractice}
                        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="currentColor"
                            className="text-bdc-primary"
                        />
                        <XAxis
                            dataKey="day"
                            stroke="currentColor"
                            className="text-text-muted"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="currentColor"
                            className="text-text-muted"
                            fontSize={12}
                        />
                        <Tooltip
                            cursor={{ fill: CHART_HOVER_FILL }}
                            contentStyle={{
                                background: "var(--color-bgc-app)",
                                border: "1px solid var(--color-bdc-primary)",
                                borderRadius: 8,
                                fontSize: 12,
                                color: "var(--color-text-contrast)",
                            }}
                            formatter={(value: any) =>
                                [
                                    `${value} ${t("chartTooltipMinute")}`,
                                    t("chartTooltipTime"),
                                ] as any
                            }
                            labelFormatter={(label) =>
                                t("chartTooltipDay", { label })
                            }
                        />
                        <Bar
                            dataKey="minutes"
                            fill={CHART_COLOR}
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default PracticeTimeChart;
