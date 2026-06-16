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
    const percent =
        total === 0 ? 0 : Math.round((completedCount / total) * 100);

    return (
        <button
            type="button"
            onClick={() => onOpen(topic)}
            className="group border-bdc-primary bg-bgc-app hover:border-bgc-highlight focus-visible:ring-bgc-highlight flex h-full w-full flex-col gap-3 rounded-md border p-5 text-left transition-all hover:shadow-md focus-visible:ring-2 focus-visible:outline-none cursor-pointer"
        >
            <div className="flex w-full items-start justify-between gap-2">
                <span className="bg-bgc-highlight/15 text-bgc-highlight rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {CATEGORY_LABEL[topic.category]}
                </span>
                <span className="text-text-muted inline-flex items-center gap-1 text-xs">
                    <BookOpen className="h-3.5 w-3.5" />
                    {t("questionCount", { count: total })}
                </span>
            </div>

            <div className="space-y-1">
                <h3 className="text-text-contrast text-lg leading-snug font-semibold">
                    {topic.title}
                </h3>
                <p className="text-text-muted text-sm">
                    <FuriganaText
                        text={topic.jpTitle}
                        furigana={topic.jpFurigana}
                    />
                </p>
            </div>

            <p className="text-text-muted line-clamp-2 text-sm">
                {topic.description}
            </p>

            <div className="mt-auto w-full space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">
                        {t("completedCount", {
                            completed: completedCount,
                            total,
                        })}
                    </span>
                    <span className="text-bgc-highlight font-medium">
                        {percent}%
                    </span>
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
