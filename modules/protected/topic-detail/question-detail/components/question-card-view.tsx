"use client";
import React from "react";
import { Mic, History } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { QuestionHistoryEntry } from "@/data/mockHistory";
import { slugifyText } from "@/libs/utils";
import FuriganaText from "@/components/ui/furigana.text";

interface QuestionCardViewProps {
    questionId: string;
    jp: string;
    furigana: string;
    vi: string;
    historyEntry?: QuestionHistoryEntry;
}

export function QuestionCardView({
    questionId,
    jp,
    furigana,
    vi,
    historyEntry,
}: QuestionCardViewProps) {
    const t = useTranslations("topicDetail");

    return (
        <section className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-text-contrast">
                <span className="bg-bgc-highlight/10 text-bgc-highlight flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                    ?
                </span>
                <h2 className="text-lg font-bold">{t("practiceQuestion")}</h2>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="text-2xl font-bold leading-relaxed text-text-contrast">
                        <FuriganaText
                            text={jp}
                            furigana={furigana}
                            showFurigana={true}
                        />
                    </div>
                    <p className="text-text-muted text-base">{vi}</p>
                </div>

                <div className="border-t border-bdc-primary border-dashed pt-4 flex flex-wrap items-center justify-between gap-4">
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
                            <span className="text-text-muted text-xs">{t("latestPracticeScore")}</span>
                            <p className="text-bgc-highlight text-2xl font-bold">{historyEntry.score.toFixed(1)} / 10</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default QuestionCardView;
