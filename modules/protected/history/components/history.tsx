"use client";
import React, { useState } from "react";
import { BarChart3, Mic, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Button, Pagination } from "@mui/material";
import { Link } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import { getSpeakingHistoryList } from "@/services/client/speaking.service";
import type { SpeakingHistoryListItem } from "@/types/responses/speaking.response";
import HistoryHeader from "./history.header";
import HistoryEmptyState from "./history.empty.state";
import ScoreBadge from "./score.badge";
import AudioPlayButton from "./audio.play.button";

const PAGE_SIZE = 10;

function formatDate(iso: string): string {
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
    const [term, setTerm] = useState("");
    const [search, setSearch] = useState("");

    const { data, isLoading } = useQuery({
        queryKey: ["speaking-history-list", page, search],
        queryFn: () =>
            getSpeakingHistoryList({
                page: page - 1,
                size: PAGE_SIZE,
                search: search || null,
            }),
        placeholderData: keepPreviousData,
    });

    const items = data?.items ?? [];
    const totalCount = data?.totalElements ?? 0;
    const totalPages = data?.totalPages ?? 0;
    const avgScore = items.length
        ? items.reduce((s, e) => s + e.score, 0) / items.length
        : 0;

    const applySearch = () => {
        setSearch(term.trim());
        setPage(1);
    };

    // Mở lại sandbox kèm ngữ cảnh để nạp đúng đề bài + từ vựng/ngữ pháp gốc.
    const practiceHref = (e: SpeakingHistoryListItem) => {
        const ctx = new URLSearchParams();
        if (e.learningPathNodeId) ctx.set("node", String(e.learningPathNodeId));
        if (e.bookId) ctx.set("book", String(e.bookId));
        if (e.topicId) ctx.set("topic", String(e.topicId));
        const qs = ctx.toString();
        return `/sandbox/${e.speakingQuestionId}${qs ? `?${qs}` : ""}` as AllRoute;
    };

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
                <HistoryHeader
                    totalCount={totalCount}
                    avgScore={avgScore}
                    t={t}
                />

                <div className="border-bdc-primary bg-bgc-app flex items-center gap-2 rounded-2xl border px-4 py-3">
                    <Search className="text-text-muted h-4 w-4 shrink-0" />
                    <input
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && applySearch()}
                        placeholder={t("filterPlaceholder")}
                        className="text-text-contrast placeholder:text-text-muted min-w-0 flex-1 bg-transparent text-sm outline-none"
                    />
                    <Button
                        size="small"
                        onClick={applySearch}
                        sx={{
                            textTransform: "none",
                            color: "var(--color-bgc-highlight)",
                            fontWeight: 600,
                        }}
                    >
                        {t("searchBtn")}
                    </Button>
                </div>

                {items.length === 0 ? (
                    <HistoryEmptyState t={t} />
                ) : (
                    <>
                        <div className="border-bdc-primary bg-bgc-app overflow-x-auto rounded-2xl border">
                            <table className="w-full min-w-[720px] text-sm">
                                <thead className="bg-bgc-page text-text-muted border-bdc-primary border-b text-xs tracking-wide uppercase">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold">
                                            {t("tableDate")}
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold">
                                            {t("tableTopic")}
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold">
                                            {t("tableQuestion")}
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold">
                                            {t("tableAudio")}
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
                                    {items.map((e) => (
                                        <tr
                                            key={e.historyId}
                                            className="border-bdc-primary hover:bg-hbgc-app border-b last:border-0"
                                        >
                                            <td className="text-text-muted px-4 py-3 whitespace-nowrap tabular-nums">
                                                {formatDate(e.practicedAt)}
                                            </td>
                                            <td className="text-text-contrast px-4 py-3">
                                                {e.topicName || "—"}
                                            </td>
                                            <td className="text-text-contrast max-w-80 truncate px-4 py-3">
                                                {e.speakingQuestionTitle || "—"}
                                            </td>
                                            <td className="px-4 py-3">
                                                {e.audioUrl ? (
                                                    <AudioPlayButton
                                                        src={e.audioUrl}
                                                    />
                                                ) : (
                                                    <span className="text-text-muted">
                                                        —
                                                    </span>
                                                )}
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
                                                            textTransform:
                                                                "none",
                                                            borderColor:
                                                                "var(--color-bdc-muted)",
                                                            color: "var(--color-text-contrast)",
                                                        }}
                                                    >
                                                        {t("viewReport")}
                                                    </Button>
                                                    {e.speakingQuestionId !=
                                                        null && (
                                                        <Button
                                                            component={Link}
                                                            href={practiceHref(
                                                                e,
                                                            )}
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
                            <div className="flex justify-center">
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
