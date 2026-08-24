"use client";

import React, { useMemo, useSyncExternalStore } from "react";
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
import { getPointHistory } from "@/services/client/point.service";
import type { PointTransactionType } from "@/types/responses/point.response";
import { DAY_NAMES_VI } from "../constants/dashboard.constant";

/**
 * Các loại giao dịch tính là 1 "lượt luyện tập" (không tính thưởng điểm danh/
 * streak/thành tựu/phạt — đó là thưởng, không phải hành động luyện tập).
 * BE hiện chưa có API liệt kê answer-history tổng hợp có phân trang (chỉ còn
 * GET theo từng speakingQuestionId), nên dùng point-history đã có sẵn để suy
 * ra hoạt động luyện tập theo ngày thay vì đo trực tiếp bằng giây.
 */
const PRACTICE_TRANSACTION_TYPES: readonly PointTransactionType[] = [
    "LEARNING_PATH_NODE_COMPLETION",
    "LEARNING_PATH_NODE_RETAKE",
    "CAN_DO_COMPLETION",
];

function subscribeNever() {
    return () => {};
}

/** Chỉ true sau khi hydrate xong ở client — tránh Recharts đo container 0px
 *  lúc SSR. useSyncExternalStore thay vì setState trong effect (rule
 *  react-hooks/set-state-in-effect của repo, xem use.hash.anchor.ts). */
function useHasMounted() {
    return useSyncExternalStore(
        subscribeNever,
        () => true,
        () => false,
    );
}

export function PracticeTimeChart({ className = "" }: { className?: string }) {
    const t = useTranslations("dashboard");
    const mounted = useHasMounted();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["point-history-chart"],
        queryFn: () => {
            const now = new Date();
            const from = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate() - 13,
                0,
                0,
                0,
                0,
            );
            return getPointHistory({
                page: 0,
                size: 100,
                sortColumn: "TRANSACTION_TIME",
                sortDirection: "DESC",
                transactionTimeFrom: from.toISOString(),
                transactionTimeTo: now.toISOString(),
            });
        },
    });

    const items = useMemo(() => data?.items ?? [], [data]);

    const { chartData, totalCount, avgCount, trendPercent } = useMemo(() => {
        const now = new Date();
        const dateMap = new Map<string, number>();

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

        let current7Count = 0;
        let prev7Count = 0;

        items.forEach((item) => {
            if (!PRACTICE_TRANSACTION_TYPES.includes(item.transactionType))
                return;
            const d = new Date(item.transactionTime);
            const time = d.getTime();
            if (Number.isNaN(time)) return;

            if (time >= startCurrent7 && time <= todayEnd) {
                current7Count += 1;
                const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
                dateMap.set(dateKey, (dateMap.get(dateKey) ?? 0) + 1);
            } else if (time >= startPrev7 && time < startCurrent7) {
                prev7Count += 1;
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
            const count = dateMap.get(dateKey) ?? 0;

            const dayName = DAY_NAMES_VI[d.getDay()];
            const fullLabel = `${dayName} (${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")})`;

            result.push({ day: dayName, fullLabel, count });
        }

        const average = Math.round((current7Count / 7) * 10) / 10;

        let trend = 0;
        if (prev7Count > 0) {
            trend = Math.round(
                ((current7Count - prev7Count) / prev7Count) * 100,
            );
        } else if (current7Count > 0) {
            trend = 100;
        }

        return {
            chartData: result,
            totalCount: current7Count,
            avgCount: average,
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
                            {t("chartCount", { count: totalCount })}
                        </span>
                    </div>
                    <div className="bg-bdc-primary/50 h-8 w-px" />
                    <div>
                        <span className="text-text-muted block text-[10px] font-semibold uppercase">
                            {t("chartAvg")}
                        </span>
                        <span className="text-text-primary text-sm font-extrabold">
                            {t("chartCount", { count: avgCount })}
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
                            allowDecimals={false}
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
                            formatter={(value) => [
                                t("chartTooltipDetail", {
                                    count: Number(value),
                                }),
                                t("chartTooltipTime"),
                            ]}
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
                            dataKey="count"
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
