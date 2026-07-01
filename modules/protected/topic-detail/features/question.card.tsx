"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { Question } from "@/data/mockTopics";
import FuriganaText from "@/components/ui/furigana.text";

interface QuestionCardProps {
    index: number;
    question: Question;
    showFurigana: boolean;
    history?: { historyId: string; score: number };
}

export function QuestionCard({
    index,
    question,
    showFurigana,
    history,
}: QuestionCardProps) {
    const t = useTranslations("topicDetail");
    const params = useParams();
    const rawTopicId = params?.topicId as string;
    const completed = !!history;

    return (
        <article className="border-bdc-primary bg-bgc-app space-y-4 rounded-md border p-5">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <span className="bg-bgc-highlight/15 text-bgc-highlight mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                        {index + 1}
                    </span>
                    <div className="space-y-1.5">
                        <div className="text-lg leading-snug">
                            <FuriganaText
                                text={question.jp}
                                furigana={question.furigana}
                                showFurigana={showFurigana}
                            />
                        </div>
                        <p className="text-text-muted text-sm">{question.vi}</p>
                    </div>
                </div>

                {completed ? (
                    <span className="bg-bgc-highlight text-text-pure inline-flex shrink-0 items-center rounded-full px-3 py-0.5 text-xs font-semibold">
                        {t("completed", {
                            score: history!.score.toFixed(1),
                        })}
                    </span>
                ) : (
                    <span className="border-bdc-muted bg-bgc-page text-text-muted inline-flex shrink-0 items-center rounded-full border px-3 py-0.5 text-xs font-medium">
                        {t("notCompleted")}
                    </span>
                )}
            </div>

            <div>
                <Link
                    href={`/topics/${rawTopicId}/${question.id}`}
                    className="bg-bgc-highlight hover:bg-bgc-highlight/90 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors cursor-pointer"
                >
                    {t("viewDetail")}
                </Link>
            </div>
        </article>
    );
}

export default QuestionCard;
