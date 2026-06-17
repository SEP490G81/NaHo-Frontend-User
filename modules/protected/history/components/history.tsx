"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getHistoryList } from "@/modules/protected/history/services/history.service";
import { mockTopics } from "@/data/mockTopics";
import { Pagination } from "@mui/material";
import HistoryFilters from "../features/history.filters";
import HistoryHeader from "./history.header";
import HistoryEmptyState from "./history.empty.state";
import HistoryList from "./history.list";

export function History() {
    const t = useTranslations("history");

    // Nạp lịch sử bài làm từ API với fallback thông minh
    const { data: entries = [], isLoading } = useQuery({
        queryKey: ["history"],
        queryFn: getHistoryList,
    });

    const [query, setQuery] = useState("");
    const [topicFilter, setTopicFilter] = useState("all");
    const [page, setPage] = useState(1);

    const sortedEntries = useMemo(
        () =>
            [...entries].sort(
                (a, b) =>
                    new Date(b.practicedAt).getTime() -
                    new Date(a.practicedAt).getTime(),
            ),
        [entries],
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return sortedEntries.filter((e) => {
            if (topicFilter !== "all" && e.topicId !== topicFilter)
                return false;
            if (!q) return true;
            const topic = mockTopics.find((t) => t.id === e.topicId);
            const question = topic?.questions.find(
                (qq) => qq.id === e.questionId,
            );
            const hay =
                `${topic?.title ?? ""} ${question?.jp ?? ""} ${question?.vi ?? ""}`.toLowerCase();
            return hay.includes(q);
        });
    }, [sortedEntries, query, topicFilter]);

    // Reset pagination to page 1 when query or filters change
    useEffect(() => {
        setPage(1);
    }, [query, topicFilter]);

    // Pagination constants and calculations
    const itemsPerPage = 8;
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginatedEntries = useMemo(() => {
        return filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }, [filtered, page]);

    const totalCount = entries.length;
    const avgScore =
        totalCount === 0
            ? 0
            : entries.reduce((sum, e) => sum + e.score, 0) / totalCount;

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

                <HistoryFilters
                    query={query}
                    onQueryChange={setQuery}
                    topicId={topicFilter}
                    onTopicChange={setTopicFilter}
                />

                {filtered.length === 0 ? (
                    <HistoryEmptyState t={t} />
                ) : (
                    <>
                        <HistoryList filtered={paginatedEntries} t={t} />

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-6">
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={(_, value) => setPage(value)}
                                    sx={{
                                        "& .MuiPaginationItem-root": {
                                            color: "var(--color-text-contrast)",
                                            "&.Mui-selected": {
                                                backgroundColor: "var(--color-bgc-highlight)",
                                                color: "var(--color-text-pure)",
                                            },
                                            "&:hover": {
                                                backgroundColor: "var(--color-hbgc-app)",
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
