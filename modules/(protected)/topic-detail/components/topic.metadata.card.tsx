"use client";
import React from "react";
import { ArrowLeft, Target } from "lucide-react";
import { Link } from "@/intl/i18n/navigation";
import { LinearProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { CATEGORY_LABEL, type Topic } from "@/data/mockTopics";
import FuriganaText from "@/components/ui/furigana.text";
import { SakuraIllustration } from "./sakura.illustration";

interface TopicMetadataCardProps {
    topic: Topic;
}

export function TopicMetadataCard({ topic }: TopicMetadataCardProps) {
    const t = useTranslations("page.topicDetail");

    return (
        <aside className="space-y-4 rounded-xl border border-bdc-primary bg-bgc-app p-5 lg:sticky lg:top-6">
            <Link
                href="/topics"
                className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-bgc-highlight"
            >
                <ArrowLeft className="h-4 w-4" />
                {t("backToTopics")}
            </Link>

            <SakuraIllustration />

            <div className="space-y-2">
                <span className="inline-block rounded-full bg-bgc-highlight/15 px-2.5 py-0.5 text-xs font-medium text-bgc-highlight">
                    {CATEGORY_LABEL[topic.category]}
                </span>
                <h1 className="text-2xl font-bold leading-tight text-text-contrast">{topic.title}</h1>
                <div className="text-base text-text-muted">
                    <FuriganaText text={topic.jpTitle} furigana={topic.jpFurigana} />
                </div>
            </div>

            <p className="text-sm text-text-muted">{topic.description}</p>

            <section className="space-y-2 rounded-lg border border-bdc-primary bg-bgc-page p-3">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-text-contrast">
                    <Target className="h-4 w-4 text-bgc-highlight" />
                    {t("learningGoals")}
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-text-muted">
                    {topic.goals.map((g) => (
                        <li key={g}>{g}</li>
                    ))}
                </ul>
            </section>

            <section className="space-y-2 rounded-lg border border-bdc-primary bg-bgc-page p-3">
                <div className="flex items-baseline justify-between">
                    <h3 className="text-sm font-semibold text-text-contrast">{t("averageScore")}</h3>
                    <p>
                        <span className="text-2xl font-bold text-bgc-highlight">
                            {topic.averageScore.toFixed(1)}
                        </span>
                        <span className="text-sm text-text-muted">/10</span>
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
