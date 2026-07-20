"use client";
import React, { useMemo, useState } from "react";
import { BarChart3, Mic } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Button, Pagination } from "@mui/material";
import { Link } from "@/i18n/navigation";
import { getSpeakingHistoryList } from "@/services/client/speaking.service";
import HistoryHeader from "./history.header";
import HistoryEmptyState from "./history.empty.state";
import ScoreBadge from "./score.badge";

const ITEMS_PER_PAGE = 8;

function formatDate(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function History() {
    const t = useTranslations("history");
    const [page, setPage] = useState(1);

    // BE chưa có endpoint list → hiện rỗng; khi có sẽ tự đổ dữ liệu vào.
    const { data: items = [], isLoading } = useQuery({
        queryKey: ["speaking-history-list"],
        queryFn: getSpeakingHistoryList,
    });

    const sorted = useMemo(
        () =>
            [...items].sort(
                (a, b) =>
                    new Date(b.practicedAt).getTime() -
                    new Date(a.practicedAt).getTime(),
            ),
        [items],
    );

    const totalCount = items.length;
    const avgScore = totalCount
        ? items.reduce((s, e) => s + e.score, 0) / totalCount
        : 0;

    const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
    const paginated = sorted.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE,
    );

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-text-muted">Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-6xl space-y-6">
                <HistoryHeader totalCount={totalCount} avgScore={avgScore} t={t} />

                {sorted.length === 0 ? (
                    <HistoryEmptyState t={t} />
                ) : (
                    <>
                        <div className="border-bdc-primary bg-bgc-app overflow-hidden rounded-2xl border">
                            <table className="w-full text-sm">
                                <thead className="bg-bgc-page text-text-muted border-bdc-primary border-b text-xs tracking-wide uppercase">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold">
                                            {t("tableDate")}
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold">
                                            {t("tableScore")}
                                        </th>
                                        <th className="px-4 py-3 text-right font-semibold">
                                            {t("tableAction")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginated.map((e) => (
                                        <tr
                                            key={e.historyId}
                                            className="border-bdc-primary hover:bg-hbgc-app border-b last:border-0"
                                        >
                                            <td className="text-text-contrast px-4 py-3 whitespace-nowrap tabular-nums">
                                                {formatDate(e.practicedAt)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <ScoreBadge score={e.score} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        component={Link}
                                                        href={`/history/${e.historyId}`}
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={
                                                            <BarChart3 className="h-3.5 w-3.5" />
                                                        }
                                                        sx={{
                                                            textTransform: "none",
                                                            borderColor:
                                                                "var(--color-bdc-muted)",
                                                            color: "var(--color-text-contrast)",
                                                        }}
                                                    >
                                                        {t("viewReport")}
                                                    </Button>
                                                    {e.questionId != null && (
                                                        <Button
                                                            component={Link}
                                                            href={`/sandbox/${e.questionId}`}
                                                            size="small"
                                                            variant="contained"
                                                            startIcon={
                                                                <Mic className="h-3.5 w-3.5" />
                                                            }
                                                            sx={{
                                                                textTransform:
                                                                    "none",
                                                                backgroundColor:
                                                                    "var(--color-bgc-highlight)",
                                                                color: "var(--color-text-pure)",
                                                            }}
                                                        >
                                                            {t("retryBtn")}
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {totalPages > 1 && (
                            <div className="mt-6 flex justify-center">
                                <Pagination
                                    count={totalPages}
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
                    </>
                )}
            </div>
        </div>
    );
}

export default History;
