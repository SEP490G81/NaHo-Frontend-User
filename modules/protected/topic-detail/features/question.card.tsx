"use client";
import React, { useState } from "react";
import { ChevronDown, History, Mic, Volume2 } from "lucide-react";
import { Link } from "@/intl/i18n/navigation";
import { Collapse, Button, Tooltip } from "@mui/material";
import { useTranslations } from "next-intl";
import { cn, slugifyText } from "@/lib/utils";
import type { Question } from "@/data/mockTopics";
import FuriganaText from "@/components/ui/furigana.text";
import MockAudioPlayer from "../components/mock.audio.player";

interface QuestionCardProps {
    index: number;
    question: Question;
    showFurigana: boolean;
    history?: { historyId: string; score: number };
}

export function QuestionCard({ index, question, showFurigana, history }: QuestionCardProps) {
    const t = useTranslations("page.topicDetail");
    const [open, setOpen] = useState(false);
    const completed = !!history;

    return (
        <article className="space-y-4 rounded-xl border border-bdc-primary bg-bgc-app p-5">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-bgc-highlight/15 text-xs font-semibold text-bgc-highlight">
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
                        <p className="text-sm text-text-muted">{question.vi}</p>
                    </div>
                </div>

                {completed ? (
                    <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-bgc-highlight px-3 py-0.5 text-xs font-semibold text-text-pure">
                            {t("completed", { score: history!.score.toFixed(1) })}
                        </span>
                        <Tooltip title={t("viewHistory")} placement="top">
                            <Link
                                href={`/history/${slugifyText(history!.historyId + "-bao-cao-luyen-tap")}`}
                                className="flex items-center gap-1.5 rounded bg-blue-50 px-2 py-1 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40"
                            >
                                <History className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                {t("viewHistory")}
                            </Link>
                        </Tooltip>
                    </div>
                ) : (
                    <span className="inline-flex shrink-0 items-center rounded-full border border-bdc-muted bg-bgc-page px-3 py-0.5 text-xs font-medium text-text-muted">
                        {t("notCompleted")}
                    </span>
                )}
            </div>

            <div>
                <div className="flex flex-wrap gap-2">
                    <Link
                        href={`/sandbox/${question.id}`}
                        className="inline-flex h-9 items-center justify-center rounded-md bg-bgc-highlight px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-bgc-highlight/90"
                    >
                        {t("practiceNow")}
                    </Link>
                    
                    <Button
                        onClick={() => setOpen((prev) => !prev)}
                        variant="outlined"
                        startIcon={<Volume2 className="h-4 w-4" />}
                        endIcon={
                            <ChevronDown
                                className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
                            />
                        }
                        sx={{
                            textTransform: "none",
                            borderColor: "var(--color-bdc-muted)",
                            color: "var(--color-text-contrast)",
                            fontWeight: "semibold",
                            borderRadius: "8px",
                            padding: "6px 16px",
                            "&:hover": {
                                borderColor: "var(--color-bdc-primary)",
                                backgroundColor: "var(--color-hbgc-app)",
                            },
                        }}
                    >
                        {open ? t("hideModelAnswer") : t("showModelAnswer")}
                    </Button>
                </div>

                <Collapse in={open} timeout="auto" unmountOnExit>
                    <div className="mt-4 space-y-3 rounded-lg border border-dashed border-bdc-primary bg-bgc-page p-4">
                        <h4 className="text-sm font-semibold text-bgc-highlight">
                            {t("modelAnswer")}
                        </h4>

                        {question.modelAnswer ? (
                            <>
                                <MockAudioPlayer durationSec={question.modelAnswer.durationSec} />

                                <div className="space-y-2 rounded-lg border border-bdc-primary bg-bgc-app p-3">
                                    <div className="text-base leading-relaxed text-text-contrast">
                                        <FuriganaText
                                            text={question.modelAnswer.jp}
                                            furigana={question.modelAnswer.furigana}
                                            showFurigana={showFurigana}
                                        />
                                    </div>
                                    <div className="border-t border-dashed border-bdc-primary pt-2">
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-text-muted">
                                            {t("vietnameseTranslation")}
                                        </p>
                                        <p className="mt-1 text-sm text-text-muted">{question.modelAnswer.vi}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-text-muted">{t("noModelAnswer")}</p>
                        )}
                    </div>
                </Collapse>
            </div>
        </article>
    );
}

export default QuestionCard;
