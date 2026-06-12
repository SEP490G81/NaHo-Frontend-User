"use client";
import React from "react";
import { BookOpen } from "lucide-react";
import { LinearProgress } from "@mui/material";
import { CATEGORY_LABEL, type Topic } from "@/data/mockTopics";
import { useTranslations } from "next-intl";
import FuriganaText from "@/components/ui/furigana.text";

interface TopicCardProps {
    topic: Topic;
    completedCount: number;
    onOpen: (topic: Topic) => void;
}

export function TopicCard({ topic, completedCount, onOpen }: TopicCardProps) {
    const t = useTranslations("topics");
    const total = topic.questions.length;
    const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

    return (
        <button
            type="button"
            onClick={() => onOpen(topic)}
            className="group flex h-full w-full flex-col gap-3 rounded-xl border border-bdc-primary bg-bgc-app p-5 text-left transition-all hover:border-bgc-highlight hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bgc-highlight"
        >
            <div className="flex items-start justify-between gap-2 w-full">
                <span className="rounded-full bg-bgc-highlight/15 px-2.5 py-0.5 text-xs font-medium text-bgc-highlight">
                    {CATEGORY_LABEL[topic.category]}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-text-muted">
                    <BookOpen className="h-3.5 w-3.5" />
                    {t("questionCount", { count: total })}
                </span>
            </div>

            <div className="space-y-1">
                <h3 className="text-lg font-semibold leading-snug text-text-contrast">{topic.title}</h3>
                <p className="text-sm text-text-muted">
                    <FuriganaText text={topic.jpTitle} furigana={topic.jpFurigana} />
                </p>
            </div>

            <p className="line-clamp-2 text-sm text-text-muted">{topic.description}</p>

            <div className="mt-auto space-y-2 pt-2 w-full">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">
                        {t("completedCount", { completed: completedCount, total })}
                    </span>
                    <span className="font-medium text-bgc-highlight">{percent}%</span>
                </div>
                <LinearProgress
                    variant="determinate"
                    value={percent}
                    sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "var(--color-bgc-page)",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            borderRadius: 4,
                        },
                    }}
                />
            </div>
        </button>
    );
}

export default TopicCard;
