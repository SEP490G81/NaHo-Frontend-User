"use client";
import React from "react";
import { CalendarDays, Clock } from "lucide-react";
import { CATEGORY_LABEL } from "@/data/mockTopics";
import FuriganaText from "@/components/ui/furigana.text";
import MockAudioBar from "./mock.audio.bar";

interface HistoryDetailQuestionCardProps {
    topic: {
        category: string;
        title: string;
    };
    entry: {
        practicedAt: string;
        durationSec: number;
    };
    question: {
        vi: string;
        jp: string;
        furigana: any;
    };
    showFurigana: boolean;
    t: any;
}

function formatDate(iso: string) {
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function HistoryDetailQuestionCard({
    topic,
    entry,
    question,
    showFurigana,
    t,
}: HistoryDetailQuestionCardProps) {
    return (
        <section className="rounded-2xl border border-bdc-primary bg-bgc-app p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-2">
                    <span className="inline-block rounded-full bg-bgc-highlight/15 px-2.5 py-0.5 text-xs font-semibold text-bgc-highlight">
                        {(CATEGORY_LABEL as any)[topic.category]} · {topic.title}
                    </span>
                    <h1 className="text-xl font-bold md:text-2xl text-text-contrast">
                        {t("reportTitle")}
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-muted">
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(entry.practicedAt)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {entry.durationSec}s
                        </span>
                    </div>
                </div>
                <MockAudioBar durationSec={entry.durationSec} />
            </div>

            <div className="mt-4 rounded-xl border border-bdc-primary bg-bgc-page p-4">
                <p className="text-xs text-text-muted font-medium">{t("questionTitle")}</p>
                <p className="mt-1 text-sm text-text-muted">{question.vi}</p>
                <div className="mt-2 text-lg text-text-contrast leading-snug">
                    <FuriganaText
                        text={question.jp}
                        furigana={question.furigana}
                        showFurigana={showFurigana}
                    />
                </div>
            </div>
        </section>
    );
}

export default HistoryDetailQuestionCard;
