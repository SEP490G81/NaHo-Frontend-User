"use client";
import React, { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { MenuItem, Pagination, Select } from "@mui/material";
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import { getPointHistory } from "@/services/client/point.service";
import { getLearningPathNodeDetail } from "@/services/client/book.service";
import type {
    PointAmountType,
    PointTransactionType,
} from "@/types/responses/point.response";

const TYPES: PointTransactionType[] = [
    "LEARNING_PATH_NODE_COMPLETION",
    "CAN_DO_COMPLETION",
    "LESSON_COMPLETION",
    "TOPIC_COMPLETION",
    "BOOK_COMPLETION",
    "DAILY_REWARD",
    "STREAK_BONUS",
    "ACHIEVEMENT_REWARD",
    "PENALTY",
];
const PAGE_SIZE = 15;

const selectSx = {
    minWidth: 180,
    backgroundColor: "var(--color-bgc-app)",
    color: "var(--color-text-contrast)",
    borderRadius: "10px",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--color-bdc-primary)",
    },
    "& .MuiSvgIcon-root": { color: "var(--color-text-muted)" },
};

function fmt(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function PointHistory() {
    const t = useTranslations("pointHistory");
    const [page, setPage] = useState(1);
    const [type, setType] = useState<PointTransactionType | "ALL">("ALL");
    const [amount, setAmount] = useState<PointAmountType | "ALL">("ALL");

    const { data, isLoading, isError } = useQuery({
        queryKey: ["point-history", page, type, amount],
        queryFn: () =>
            getPointHistory({
                page: page - 1,
                size: PAGE_SIZE,
                sortColumn: "TRANSACTION_TIME",
                sortDirection: "DESC",
                transactionType: type === "ALL" ? null : type,
                amountType: amount === "ALL" ? null : amount,
            }),
        placeholderData: keepPreviousData,
    });

    const items = data?.items ?? [];
    const meta = data?.pageMeta;

    // Resolve ngữ cảnh: learningPathNodeId → nội dung node (câu hỏi / rương / từ vựng).
    const nodeIds = Array.from(
        new Set(
            items
                .map((i) => i.learningPathNodeId)
                .filter((x): x is number => x != null),
        ),
    );
    const nodeQs = useQueries({
        queries: nodeIds.map((id) => ({
            queryKey: ["learning-node", id],
            queryFn: () => getLearningPathNodeDetail(id),
        })),
    });
    const nodeMap = new Map(nodeIds.map((id, i) => [id, nodeQs[i]?.data]));
    const contextOf = (nodeId: number | null): string => {
        if (nodeId == null) return "—";
        const d = nodeMap.get(nodeId);
        if (!d) return "…";
        if (d.nodeType === "SPEAKING_QUESTION")
            return d.speakingQuestion?.title || "—";
        if (d.nodeType === "CHEST") return d.chest?.title || t("ctxChest");
        if (d.nodeType === "VOCABULARY_QUESTION") return t("ctxVocab");
        return "—";
    };

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-5xl space-y-6">
                <header className="border-bdc-primary bg-bgc-app rounded-2xl border p-6 shadow-sm">
                    <Link
                        href="/books"
                        className="text-text-muted hover:text-text-contrast mb-3 inline-flex items-center gap-1.5 text-sm font-medium"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t("back")}
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="bg-bgc-highlight/15 text-bgc-highlight flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                            <Sparkles className="h-5 w-5" />
                        </span>
                        <div>
                            <h1 className="text-text-contrast text-xl font-bold md:text-2xl">
                                {t("title")}
                            </h1>
                            <p className="text-text-muted text-sm">
                                {t("subtitle")}
                                {meta
                                    ? ` · ${t("totalLabel", { count: meta.totalElements })}`
                                    : ""}
                            </p>
                        </div>
                    </div>
                </header>

                <div className="flex flex-wrap gap-3">
                    <Select
                        size="small"
                        value={type}
                        onChange={(e) => {
                            setType(
                                e.target.value as PointTransactionType | "ALL",
                            );
                            setPage(1);
                        }}
                        sx={selectSx}
                    >
                        <MenuItem value="ALL">
                            {t("filterType")}: {t("all")}
                        </MenuItem>
                        {TYPES.map((ty) => (
                            <MenuItem key={ty} value={ty}>
                                {t(`types.${ty}`)}
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        size="small"
                        value={amount}
                        onChange={(e) => {
                            setAmount(
                                e.target.value as PointAmountType | "ALL",
                            );
                            setPage(1);
                        }}
                        sx={selectSx}
                    >
                        <MenuItem value="ALL">
                            {t("filterAmount")}: {t("all")}
                        </MenuItem>
                        <MenuItem value="POSITIVE">
                            {t("amountPositive")}
                        </MenuItem>
                        <MenuItem value="NEGATIVE">
                            {t("amountNegative")}
                        </MenuItem>
                    </Select>
                </div>

                {isLoading ? (
                    <p className="text-text-muted py-16 text-center">
                        {t("loading")}
                    </p>
                ) : isError ? (
                    <p className="text-text-muted py-16 text-center">
                        {t("error")}
                    </p>
                ) : items.length === 0 ? (
                    <div className="border-bdc-muted bg-bgc-app flex flex-col items-center gap-2 rounded-2xl border border-dashed p-12 text-center">
                        <Sparkles className="text-text-muted h-9 w-9" />
                        <p className="text-text-contrast font-semibold">
                            {t("empty")}
                        </p>
                        <p className="text-text-muted max-w-md text-sm">
                            {t("emptyHint")}
                        </p>
                    </div>
                ) : (
                    <div className="border-bdc-primary bg-bgc-app overflow-hidden rounded-2xl border">
                        <table className="w-full text-sm">
                            <thead className="bg-bgc-page text-text-muted border-bdc-primary border-b text-xs tracking-wide uppercase">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">
                                        {t("colTime")}
                                    </th>
                                    <th className="px-4 py-3 text-left font-semibold">
                                        {t("colType")}
                                    </th>
                                    <th className="hidden px-4 py-3 text-left font-semibold sm:table-cell">
                                        {t("colContext")}
                                    </th>
                                    <th className="px-4 py-3 text-right font-semibold">
                                        {t("colPoint")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((it) => {
                                    const positive = it.point >= 0;
                                    return (
                                        <tr
                                            key={it.id}
                                            className="border-bdc-primary border-b last:border-0"
                                        >
                                            <td className="text-text-muted px-4 py-3 whitespace-nowrap tabular-nums">
                                                {fmt(it.transactionTime)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="border-bdc-primary bg-bgc-page text-text-contrast inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium">
                                                    {t(
                                                        `types.${it.transactionType}`,
                                                    )}
                                                </span>
                                            </td>
                                            <td className="text-text-muted hidden max-w-70 truncate px-4 py-3 sm:table-cell">
                                                {contextOf(
                                                    it.learningPathNodeId,
                                                )}
                                            </td>
                                            <td
                                                className={cn(
                                                    "px-4 py-3 text-right font-bold tabular-nums",
                                                    positive
                                                        ? "text-text-success"
                                                        : "text-bgc-error",
                                                )}
                                            >
                                                {positive ? "+" : ""}
                                                {Math.round(it.point)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {meta && meta.totalPages > 1 && (
                    <div className="flex justify-center">
                        <Pagination
                            count={meta.totalPages}
                            page={page}
                            onChange={(_, v) => setPage(v)}
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: "var(--color-text-contrast)",
                                    "&.Mui-selected": {
                                        backgroundColor:
                                            "var(--color-bgc-highlight)",
                                        color: "var(--color-text-pure)",
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default PointHistory;
