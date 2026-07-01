"use client";
import React from "react";
import { Mic, History } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { QuestionHistoryEntry } from "@/data/mockHistory";
import { slugifyText } from "@/libs/utils";

interface ActionsFooterProps {
    questionId: string;
    historyEntry?: QuestionHistoryEntry;
}

export function ActionsFooter({ questionId, historyEntry }: ActionsFooterProps) {
    const t = useTranslations("topicDetail");

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <div className="flex gap-3">
                <Link
                    href={`/sandbox/${questionId}`}
                    className="bg-bgc-highlight hover:bg-bgc-highlight/90 inline-flex h-11 items-center justify-center rounded-lg px-6 text-base font-semibold text-white shadow-md transition-colors gap-2 cursor-pointer"
                >
                    <Mic className="h-5 w-5" />
                    {t("practiceNow")}
                </Link>

                {historyEntry && (
                    <Link
                        href={`/history/${slugifyText(historyEntry.historyId + "-bao-cao-luyen-tap")}`}
                        className="border-bdc-primary bg-bgc-app hover:bg-hbgc-app inline-flex h-11 items-center justify-center rounded-lg border px-5 text-sm font-semibold text-text-contrast transition-colors gap-2 cursor-pointer"
                    >
                        <History className="h-4.5 w-4.5 text-text-muted" />
                        {t("viewHistory")}
                    </Link>
                )}
            </div>

            {historyEntry && (
                <div className="text-right">
                    <span className="text-text-muted text-xs">Điểm số lượt luyện gần nhất:</span>
                    <p className="text-bgc-highlight text-2xl font-bold">{historyEntry.score.toFixed(1)} / 10</p>
                </div>
            )}
        </div>
    );
}

export default ActionsFooter;
