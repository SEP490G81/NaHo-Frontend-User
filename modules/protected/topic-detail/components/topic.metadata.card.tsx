"use client";
import React from "react";
import { ArrowLeft, Target } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { LinearProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { CATEGORY_LABEL, type Topic } from "@/data/mockTopics";
import FuriganaText from "@/components/ui/furigana.text";
import { SakuraIllustration } from "./sakura.illustration";

interface TopicMetadataCardProps {
    topic: Topic;
}

export function TopicMetadataCard({ topic }: TopicMetadataCardProps) {
    const t = useTranslations("topicDetail");

    return (
        <aside className="border-bdc-primary bg-bgc-app space-y-4 rounded-md border p-5 lg:sticky lg:top-6">
            <Link
                href="/topics"
                className="text-text-muted hover:text-bgc-highlight inline-flex items-center gap-1.5 text-sm cursor-pointer"
            >
                <ArrowLeft className="h-4 w-4" />
                {t("backToTopics")}
            </Link>

            <SakuraIllustration />

            <div className="space-y-2">
                <span className="bg-bgc-highlight/15 text-bgc-highlight inline-block rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {CATEGORY_LABEL[topic.category]}
                </span>
                <h1 className="text-text-contrast text-2xl leading-tight font-bold">
                    {topic.title}
                </h1>
                <div className="text-text-muted text-base">
                    <FuriganaText
                        text={topic.jpTitle}
                        furigana={topic.jpFurigana}
                    />
                </div>
            </div>

            <p className="text-text-muted text-sm">{topic.description}</p>

            <section className="border-bdc-primary bg-bgc-page space-y-2 rounded-lg border p-3">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-semibold">
                    <Target className="text-bgc-highlight h-4 w-4" />
                    {t("learningGoals")}
                </h3>
                <ul className="text-text-muted list-disc space-y-1 pl-5 text-sm">
                    {topic.goals.map((g) => (
                        <li key={g}>{g}</li>
                    ))}
                </ul>
            </section>

            <section className="border-bdc-primary bg-bgc-page space-y-2 rounded-lg border p-3">
                <div className="flex items-baseline justify-between">
                    <h3 className="text-text-contrast text-sm font-semibold">
                        {t("averageScore")}
                    </h3>
                    <p>
                        <span className="text-bgc-highlight text-2xl font-bold">
                            {topic.averageScore.toFixed(1)}
                        </span>
                        <span className="text-text-muted text-sm">/10</span>
                    </p>
                </div>
                <LinearProgress
                    variant="determinate"
                    value={topic.averageScore * 10}
                    sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: "var(--color-bgc-page)",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            borderRadius: 3,
                        },
                    }}
                />
            </section>
        </aside>
    );
}

export default TopicMetadataCard;
