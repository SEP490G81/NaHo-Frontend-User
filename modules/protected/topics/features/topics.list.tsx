"use client";
import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getTopics } from "@/modules/protected/topics/services/topic.service";
import { getHistoryList } from "@/modules/protected/history/services/history.service";
import { type Topic } from "@/data/mockTopics";
import { getFiltersConfig } from "../constants/topics.constant";
import { FilterType } from "../types/topics.type";
import TopicCard from "../components/topic.card";
import TopicIntroDialog from "./topic.intro.dialog";

export function TopicsList() {
    const t = useTranslations("page.topics");

    // Nạp dữ liệu các chủ đề qua API (hoặc fallback)
    const { data: topics = [] } = useQuery({
        queryKey: ["topics"],
        queryFn: getTopics,
    });

    // Nạp lịch sử bài làm để tính toán tiến trình
    const { data: history = [] } = useQuery({
        queryKey: ["history"],
        queryFn: getHistoryList,
    });

    // Tính toán map chứa các câu hỏi đã hoàn thành của mỗi topic
    const completedMap = useMemo(() => {
        const map: Record<string, Set<string>> = {};
        for (const entry of history) {
            if (!map[entry.topicId]) {
                map[entry.topicId] = new Set();
            }
            map[entry.topicId].add(entry.questionId);
        }
        return map;
    }, [history]);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterType>("all");
    const [selected, setSelected] = useState<Topic | null>(null);
    const [open, setOpen] = useState(false);

    const filters = getFiltersConfig(t);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return topics.filter((t) => {
            if (filter !== "all" && t.category !== filter) return false;
            if (!q) return true;
            return (
                t.title.toLowerCase().includes(q) ||
                t.jpTitle.toLowerCase().includes(q) ||
                t.jpFurigana.toLowerCase().includes(q)
            );
        });
    }, [topics, search, filter]);

    const openTopic = (topic: Topic) => {
        setSelected(topic);
        setOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Search and Filters */}
            <div className="border-bdc-primary bg-bgc-app space-y-3 rounded-xl border p-4">
                <div className="relative">
                    <Search className="text-text-muted pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t("searchPlaceholder")}
                        className="border-bdc-primary bg-bgc-page text-text-contrast placeholder-text-muted focus:border-bgc-highlight w-full rounded-lg border py-2 pr-4 pl-9 text-sm transition-colors focus:outline-none"
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {filters.map((f) => {
                        const active = filter === f.value;
                        return (
                            <Button
                                key={f.value}
                                type="button"
                                onClick={() => setFilter(f.value)}
                                variant={active ? "contained" : "outlined"}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: "9999px",
                                    fontWeight: "bold",
                                    fontSize: "0.8125rem",
                                    padding: "4px 16px",
                                    backgroundColor: active
                                        ? "var(--color-bgc-highlight)"
                                        : "transparent",
                                    color: active
                                        ? "var(--color-text-pure)"
                                        : "var(--color-text-contrast)",
                                    borderColor: active
                                        ? "var(--color-bgc-highlight)"
                                        : "var(--color-bdc-primary)",
                                    "&:hover": {
                                        backgroundColor: active
                                            ? "var(--color-bgc-highlight)"
                                            : "var(--color-hbgc-app)",
                                        borderColor: active
                                            ? "var(--color-bgc-highlight)"
                                            : "var(--color-bdc-primary)",
                                        opacity: active ? 0.9 : 1,
                                    },
                                }}
                            >
                                {f.label}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Topics Grid */}
            {filtered.length === 0 ? (
                <div className="border-bdc-primary bg-bgc-app text-text-muted rounded-xl border border-dashed p-12 text-center">
                    {t("emptyState")}
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((topic) => (
                        <TopicCard
                            key={topic.id}
                            topic={topic}
                            completedCount={completedMap[topic.id]?.size ?? 0}
                            onOpen={openTopic}
                        />
                    ))}
                </div>
            )}

            {/* Intro Dialog */}
            <TopicIntroDialog
                topic={selected}
                open={open}
                onOpenChange={setOpen}
            />
        </div>
    );
}

export default TopicsList;
