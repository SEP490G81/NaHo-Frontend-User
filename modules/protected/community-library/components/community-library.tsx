"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import CommunityLibraryHeader from "./community-library-header";
import CommunityLibraryFilterPanel from "./community-library-filter-panel";
import CommunityQuestionCard from "./community-question.card";
import { Pagination } from "@mui/material";
import {
    type CommunityCategory,
    mockCommunityQuestions,
} from "@/data/mockCommunityQuestions";

export function CommunityLibrary() {
    const { push } = useRouter();
    const t = useTranslations("communityLibrary");

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<CommunityCategory | "all">("all");
    const [showFurigana, setShowFurigana] = useState(true);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return mockCommunityQuestions.filter((item) => {
            if (category !== "all" && item.category !== category) return false;
            if (!q) return true;
            return (
                item.jp.toLowerCase().includes(q) ||
                item.vi.toLowerCase().includes(q) ||
                item.furigana.toLowerCase().includes(q)
            );
        });
    }, [query, category]);

    // Reset pagination page to 1 whenever filters change
    useEffect(() => {
        setPage(1);
    }, [query, category]);

    // Pagination constants and calculations
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const paginatedQuestions = useMemo(() => {
        return filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }, [filtered, page]);

    const handleContributeClick = () => {
        push({
            pathname: "/custom-question",
        });
    };

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <CommunityLibraryHeader t={t} onContributeClick={handleContributeClick} />

                <CommunityLibraryFilterPanel
                    t={t}
                    showFurigana={showFurigana}
                    onFuriganaChange={setShowFurigana}
                    query={query}
                    onQueryChange={setQuery}
                    category={category}
                    onCategoryChange={setCategory}
                />

                {filtered.length === 0 ? (
                    <div className="border-bdc-primary bg-bgc-app text-text-muted rounded-md border border-dashed p-10 text-center text-sm shadow-sm">
                        {t("emptyState")}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {paginatedQuestions.map((q) => (
                            <CommunityQuestionCard
                                key={q.id}
                                question={q}
                                showFurigana={showFurigana}
                            />
                        ))}
                    </div>
                )}

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
            </div>
        </div>
    );
}

export default CommunityLibrary;
