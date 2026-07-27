"use client";
import React from "react";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn, formatPoints } from "@/libs/utils";
import type {
    PointSortColumn,
    SortDirection,
} from "@/types/responses/point.response";
import { formatPointTime, tintOf } from "../utils/point.util";
import type { PointRow } from "../hooks/use.point.rows";

interface Props {
    rows: PointRow[];
    sortColumn: PointSortColumn;
    sortDirection: SortDirection;
    onSort: (col: PointSortColumn) => void;
}

function SortHead({
    label,
    active,
    direction,
    align,
    onClick,
    tooltip,
}: {
    label: string;
    active: boolean;
    direction: SortDirection;
    align: "left" | "right";
    onClick: () => void;
    tooltip: string;
}) {
    return (
        <th className={cn("px-4 py-3", align === "right" ? "text-right" : "text-left")}>
            <button
                type="button"
                onClick={onClick}
                title={tooltip}
                className={cn(
                    "group inline-flex cursor-pointer items-center gap-1 font-semibold transition-colors",
                    align === "right" && "flex-row-reverse",
                    active ? "text-bgc-highlight" : "hover:text-text-contrast",
                )}
            >
                {label}
                {active ? (
                    direction === "ASC" ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                    )
                ) : (
                    // Icon mờ báo cột có thể sắp xếp; đậm dần khi rê chuột.
                    <ChevronsUpDown className="h-3.5 w-3.5 opacity-35 transition-opacity group-hover:opacity-70" />
                )}
            </button>
        </th>
    );
}

/** Bảng lịch sử điểm với 2 cột sắp xếp được (Thời gian · Điểm). */
export function PointHistoryTable({ rows, sortColumn, sortDirection, onSort }: Props) {
    const t = useTranslations("pointHistory");

    return (
        <div className="border-bdc-primary bg-bgc-app overflow-x-auto rounded-2xl border shadow-sm">
            <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-bgc-page text-text-muted border-bdc-primary border-b text-xs tracking-wide uppercase">
                    <tr>
                        <SortHead
                            label={t("colTime")}
                            active={sortColumn === "TRANSACTION_TIME"}
                            direction={sortDirection}
                            align="left"
                            tooltip={t("sortTooltip")}
                            onClick={() => onSort("TRANSACTION_TIME")}
                        />
                        <th className="px-4 py-3 text-left font-semibold">
                            {t("colType")}
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">
                            {t("colContext")}
                        </th>
                        <SortHead
                            label={t("colPoint")}
                            active={sortColumn === "POINT"}
                            direction={sortDirection}
                            align="right"
                            tooltip={t("sortTooltip")}
                            onClick={() => onSort("POINT")}
                        />
                    </tr>
                </thead>
                <tbody>
                    {rows.map((it) => {
                        const positive = it.point >= 0;
                        const tint = tintOf(it.transactionType);
                        return (
                            <tr
                                key={it.id}
                                className="border-bdc-primary hover:bg-bgc-page border-b transition-colors last:border-0"
                            >
                                <td className="text-text-muted px-4 py-3.5 whitespace-nowrap tabular-nums">
                                    {formatPointTime(it.transactionTime)}
                                </td>
                                <td className="px-4 py-3.5">
                                    <span
                                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap"
                                        style={{
                                            color: tint,
                                            borderColor: `color-mix(in srgb, ${tint} 35%, transparent)`,
                                            background: `color-mix(in srgb, ${tint} 12%, transparent)`,
                                        }}
                                    >
                                        {t(`types.${it.transactionType}`)}
                                    </span>
                                </td>
                                <td className="text-text-muted max-w-[22rem] truncate px-4 py-3.5">
                                    {it.content}
                                </td>
                                <td
                                    className={cn(
                                        "px-4 py-3.5 text-right font-bold tabular-nums",
                                        positive ? "text-text-success" : "text-bgc-error",
                                    )}
                                >
                                    {positive ? "+" : ""}
                                    {formatPoints(it.point)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PointHistoryTable;
