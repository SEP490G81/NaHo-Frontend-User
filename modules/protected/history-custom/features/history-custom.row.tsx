"use client";
import React from "react";
import { RotateCcw, Wand2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { QuestionHistoryEntry } from "@/data/mockHistory";
import ScoreBadge from "../../history/components/score.badge";
import MockAudioBar from "../../history-detail/components/mock.audio.bar";

function formatDate(iso: string) {
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

interface Props {
    entry: QuestionHistoryEntry;
}

const CUSTOM_BADGE = (
    <span className="bg-bgc-highlight/15 text-bgc-highlight inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium">
        <Wand2 className="h-3 w-3" /> Đề tự soạn
    </span>
);

export function HistoryCustomRowDesktop({ entry }: Props) {
    const t = useTranslations("historyCustom");

    return (
        <tr className="border-bdc-primary hover:bg-hbgc-app border-b transition-colors">
            <td className="text-text-muted px-4 py-3 align-middle text-sm whitespace-nowrap">
                {formatDate(entry.practicedAt)}
            </td>
            <td className="px-4 py-3 align-middle">
                <div className="text-text-contrast flex flex-col gap-1">
                    <span className="leading-tight font-semibold">
                        Đề chọn tự phát
                    </span>
                    {CUSTOM_BADGE}
                </div>
            </td>
            <td className="px-4 py-3 align-middle">
                <div className="max-w-xs">
                    <p className="font-noto-jp text-text-contrast text-sm leading-snug">
                        {entry.customJp || "Câu hỏi tự soạn"}
                    </p>
                    {entry.customHintVi && (
                        <p className="text-text-muted mt-0.5 line-clamp-1 text-xs">
                            {entry.customHintVi}
                        </p>
                    )}
                </div>
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
                        href="/custom-question"
                        className="bg-bgc-highlight hover:bg-bgc-highlight/90 inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-semibold text-white shadow-sm transition-colors"
                    >
                        <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                        {t("retryBtn")}
                    </Link>
                </div>
            </td>
        </tr>
    );
}

export function HistoryCustomRowCard({ entry }: Props) {
    const t = useTranslations("historyCustom");

    return (
        <article className="border-bdc-primary bg-bgc-app space-y-3 rounded-md border p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                    <p className="text-text-muted text-xs">
                        {formatDate(entry.practicedAt)}
                    </p>
                    <span className="bg-bgc-highlight/15 text-bgc-highlight inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium">
                        <Wand2 className="h-3 w-3" /> Đề chọn tự phát
                    </span>
                </div>
                <ScoreBadge score={entry.score} />
            </div>

            <div className="max-w-xs">
                <p className="font-noto-jp text-text-contrast text-sm leading-snug">
                    {entry.customJp || "Câu hỏi tự soạn"}
                </p>
                {entry.customHintVi && (
                    <p className="text-text-muted mt-0.5 text-xs">
                        {entry.customHintVi}
                    </p>
                )}
            </div>

            <MockAudioBar durationSec={entry.durationSec} />

            <div className="flex items-center justify-end gap-2 pt-1">
                <Link
                    href="/custom-question"
                    className="bg-bgc-highlight hover:bg-bgc-highlight/90 inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-semibold text-white shadow-sm transition-colors"
                >
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                    {t("retryBtn")}
                </Link>
            </div>
        </article>
    );
}
