"use client";
import React from "react";
import { Clock, PlayCircle, BarChart3, ChevronRight, ExternalLink, RotateCcw } from "lucide-react";
import { Link } from "@/intl/i18n/navigation";
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
    const t = useTranslations("page.history");

    return (
        <tr className="border-b border-bdc-primary transition-colors hover:bg-hbgc-app">
            <td className="px-4 py-3 align-middle text-sm whitespace-nowrap text-text-muted">
                {formatDate(entry.practicedAt)}
            </td>
            <td className="px-4 py-3 align-middle">
                {topic ? (
                    <div className="flex flex-col gap-1">
                        <span className="font-semibold leading-tight text-text-contrast">{topic.title}</span>
                        <span className="w-fit rounded-full bg-bgc-highlight/15 px-2 py-0.5 text-[10px] font-semibold text-bgc-highlight">
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
                        <p className="font-noto-jp text-sm leading-snug text-text-contrast">{question.jp}</p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-text-muted">{question.vi}</p>
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
                        href={{
                            pathname: "/history/[historyId]",
                            params: { historyId: slugifyText(entry.historyId + "-bao-cao-luyen-tap") }
                        }}
                        className="inline-flex h-8 items-center justify-center rounded-md border border-bdc-primary bg-bgc-page px-3 text-xs font-semibold text-text-contrast transition-colors hover:bg-hbgc-app"
                    >
                        <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
                        {t("viewReport")}
                    </Link>
                    <Link
                        href={{
                            pathname: "/sandbox/[questionId]",
                            params: { questionId: entry.questionId }
                        }}
                        className="inline-flex h-8 items-center justify-center rounded-md bg-bgc-highlight px-3 text-xs font-semibold text-white transition-colors hover:bg-bgc-highlight/90"
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
    const t = useTranslations("page.history");

    return (
        <article className="rounded-xl border border-bdc-primary bg-bgc-app p-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                    <p className="text-xs text-text-muted">{formatDate(entry.practicedAt)}</p>
                    {topic && (
                        <span className="inline-block rounded-full bg-bgc-highlight/15 px-2 py-0.5 text-[10px] font-semibold text-bgc-highlight">
                            {CATEGORY_LABEL[topic.category]} · {topic.title}
                        </span>
                    )}
                </div>
                <ScoreBadge score={entry.score} />
            </div>

            {question && (
                <div>
                    <p className="font-noto-jp text-sm leading-snug text-text-contrast">{question.jp}</p>
                    <p className="mt-0.5 text-xs text-text-muted">{question.vi}</p>
                </div>
            )}

            <MockAudioBar durationSec={entry.durationSec} />

            <div className="flex items-center justify-end gap-2 pt-1">
                <Link
                    href={{
                        pathname: "/history/[historyId]",
                        params: { historyId: slugifyText(entry.historyId + "-bao-cao-luyen-tap") }
                    }}
                    className="inline-flex h-8 items-center justify-center rounded-md border border-bdc-primary bg-bgc-page px-3 text-xs font-semibold text-text-contrast transition-colors hover:bg-hbgc-app"
                >
                    <BarChart3 className="mr-1.5 h-3.5 w-3.5" />
                    {t("viewReport")}
                </Link>
                <Link
                    href={{
                        pathname: "/sandbox/[questionId]",
                        params: { questionId: entry.questionId }
                    }}
                    className="inline-flex h-8 items-center justify-center rounded-md bg-bgc-highlight px-3 text-xs font-semibold text-white transition-colors hover:bg-bgc-highlight/90"
                >
                    <PlayCircle className="mr-1.5 h-3.5 w-3.5" />
                    {t("retryBtn")}
                </Link>
            </div>
        </article>
    );
}
