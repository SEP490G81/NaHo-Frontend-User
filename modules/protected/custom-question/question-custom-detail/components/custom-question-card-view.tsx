"use client";
import React from "react";
import { User, Repeat2, Mic, History, Flag } from "lucide-react";
import type { CommunityQuestion } from "@/data/mockCommunityQuestions";
import type { QuestionHistoryEntry } from "@/data/mockHistory";
import FuriganaText from "@/components/ui/furigana.text";
import { Button } from "@mui/material";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useReportStore } from "@/store/reportStore";

interface CustomQuestionCardViewProps {
    question: CommunityQuestion;
    handlePractice: () => void;
    historyEntry?: QuestionHistoryEntry | null;
}

export function CustomQuestionCardView({
    question,
    handlePractice,
    historyEntry,
}: CustomQuestionCardViewProps) {
    const t = useTranslations("communityLibrary");
    const openReportModal = useReportStore((s) => s.openModal);

    return (
        <section className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-bdc-primary pb-3">
                <div className="flex items-center gap-2 text-text-contrast">
                    <span className="bg-bgc-highlight/10 text-bgc-highlight flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                        ?
                    </span>
                    <h2 className="text-lg font-bold">{t("communityQuestion")}</h2>
                </div>
                <button
                    onClick={() => openReportModal("QUESTION", question.id)}
                    className="text-text-muted hover:text-bgc-highlight flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-bdc-primary hover:border-bgc-highlight/30 transition-colors cursor-pointer"
                >
                    <Flag className="h-3.5 w-3.5" />
                    <span>Feedback</span>
                </button>
            </div>

            <div className="space-y-4">
                <div className="text-2xl font-bold leading-relaxed text-text-contrast">
                    <FuriganaText
                        text={question.jp}
                        furigana={question.furigana}
                        showFurigana={true}
                    />
                </div>
                <p className="text-text-muted text-base">{question.vi}</p>

                {/* Contribution Meta */}
                <div className="flex flex-wrap gap-4 border-t border-bdc-primary pt-3 text-text-muted text-xs">
                    <span className="inline-flex items-center gap-1.5">
                        <User className="h-4 w-4 text-bgc-highlight" />
                        {t("contributor")}<strong className="text-text-contrast">{question.contributorName}</strong> ({question.contributorLevel})
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Repeat2 className="h-4 w-4" />
                        {t("totalPracticeCount")}<strong>{question.practiceCount}</strong>
                    </span>
                </div>

                {/* Actions Block */}
                <div className="border-t border-bdc-primary border-dashed pt-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex gap-3">
                        <Button
                            onClick={handlePractice}
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                backgroundColor: "var(--color-bgc-highlight)",
                                color: "var(--color-text-pure)",
                                fontWeight: "bold",
                                borderRadius: "8px",
                                height: "44px",
                                px: 4,
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 1,
                                "&:hover": { opacity: 0.9 },
                            }}
                        >
                            <Mic className="h-5 w-5" />
                            {t("practiceNow")}
                        </Button>

                        {historyEntry && (
                            <Link
                                href="/history-custom"
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

export default CustomQuestionCardView;
