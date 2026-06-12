"use client";
import React from "react";
import { BarChart3, PlayCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { slugifyText } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { CATEGORY_LABEL, type Question, type Topic } from "@/data/mockTopics";
import type { QuestionHistoryEntry } from "@/data/mockHistory";
import ScoreBadge from "../components/score.badge";
import MockAudioBar from "../../history-detail/components/mock.audio.bar";

function formatDate(iso: string) {
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface Props {
    entry: QuestionHistoryEntry;
    topic: Topic | undefined;
    question: Question | undefined;
}

export function HistoryRowDesktop({ entry, topic, question }: Props) {
    const t = useTranslations("history");

    return (
        <tr className="border-bdc-primary hover:bg-hbgc-app border-b transition-colors">
            <td className="text-text-muted px-4 py-3 align-middle text-sm whitespace-nowrap">
                {formatDate(entry.practicedAt)}
            </td>
            <td className="px-4 py-3 align-middle">
                {topic ? (
                    <div className="flex flex-col gap-1">
                        <span className="text-text-contrast leading-tight font-semibold">
                            {topic.title}
                        </span>
                        <span className="bg-bgc-highlight/15 text-bgc-highlight w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold">
                            {CATEGORY_LABEL[topic.category]}
                        </span>
                    </div>
                ) : (
                    <span className="text-text-muted">—</span>
                )}
            </td>
            <td className="px-4 py-3 align-middle">
                {question ? (
                    <div className="max-w-xs">
                        <p className="font-noto-jp text-text-contrast text-sm leading-snug">
                            {question.jp}
                        </p>
                        <p className="text-text-muted mt-0.5 line-clamp-1 text-xs">
                            {question.vi}
                        </p>
                    </div>
                ) : (
                    <span className="text-text-muted">—</span>
                )}
            </td>
            <td className="px-4 py-3 align-middle">
                <MockAudioBar durationSec={entry.durationSec} />
            </td>
            <td className="px-4 py-3 align-middle">
                <ScoreBadge score={entry.score} />
            </td>
            <td className="px-4 py-3 align-middle">
                <div className="flex items-center justify-end gap-2">
                    <Link
                        href={`/history/${slugifyText(entry.historyId + "-bao-cao-luyen-tap")}`}
                        className="border-bdc-primary bg-bgc-page text-text-contrast hover:bg-hbgc-app inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-semibold transition-colors"
                    >
                        <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
                        {t("viewReport")}
                    </Link>
                    <Link
                        href={`/sandbox/${entry.questionId}`}
                        className="bg-bgc-highlight hover:bg-bgc-highlight/90 inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-semibold text-white transition-colors"
                    >
                        <PlayCircle className="mr-1.5 h-3.5 w-3.5" />
                        {t("retryBtn")}
                    </Link>
                </div>
            </td>
        </tr>
    );
}

export function HistoryRowCard({ entry, topic, question }: Props) {
    const t = useTranslations("history");

    return (
        <article className="border-bdc-primary bg-bgc-app space-y-3 rounded-xl border p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                    <p className="text-text-muted text-xs">
                        {formatDate(entry.practicedAt)}
                    </p>
                    {topic && (
                        <span className="bg-bgc-highlight/15 text-bgc-highlight inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold">
                            {CATEGORY_LABEL[topic.category]} · {topic.title}
                        </span>
                    )}
                </div>
                <ScoreBadge score={entry.score} />
            </div>

            {question && (
                <div>
                    <p className="font-noto-jp text-text-contrast text-sm leading-snug">
                        {question.jp}
                    </p>
                    <p className="text-text-muted mt-0.5 text-xs">
                        {question.vi}
                    </p>
                </div>
            )}

            <MockAudioBar durationSec={entry.durationSec} />

            <div className="flex items-center justify-end gap-2 pt-1">
                <Link
                    href={`/history/${slugifyText(entry.historyId + "-bao-cao-luyen-tap")}`}
                    className="border-bdc-primary bg-bgc-page text-text-contrast hover:bg-hbgc-app inline-flex h-8 items-center justify-center rounded-md border px-3 text-xs font-semibold transition-colors"
                >
                    <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
                    {t("viewReport")}
                </Link>
                <Link
                    href={`/sandbox/${entry.questionId}`}
                    className="bg-bgc-highlight hover:bg-bgc-highlight/90 inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-semibold text-white transition-colors"
                >
                    <PlayCircle className="mr-1.5 h-3.5 w-3.5" />
                    {t("retryBtn")}
                </Link>
            </div>
        </article>
    );
}
