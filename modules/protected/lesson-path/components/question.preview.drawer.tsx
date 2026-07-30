"use client";
import React from "react";
import { Drawer, IconButton } from "@mui/material";
import { BookOpen, Lightbulb, Mic, Sparkles, Trophy, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import type { LearningPathNodeDetailResponseSpeakingQuestionDetailResponse } from "@/types/responses/learning.response";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import PreviewSection from "./preview.section";
import NodeTermList from "./node.term.list";

interface Props {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    question: LearningPathNodeDetailResponseSpeakingQuestionDetailResponse | null;
    loading?: boolean;
    context: string;
    bestScore: number;
    href: string;
    showFurigana: boolean;
    accent: string;
}

export function QuestionPreviewDrawer({
    open,
    onOpenChange,
    question,
    loading,
    context,
    bestScore,
    href,
    showFurigana,
    accent,
}: Props) {
    const t = useTranslations("marugoto");

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => onOpenChange(false)}
            sx={{
                // Gieo màu sách vào Paper (dialog/drawer render portal ngoài cây DOM).
                "& .MuiDrawer-paper": {
                    "--book-accent": accent,
                    width: { xs: "100%", sm: 440 },
                    backgroundColor: "var(--color-bgc-app)",
                    backgroundImage: "none",
                    borderLeft: "1px solid var(--color-bdc-primary)",
                },
            }}
        >
            <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3 p-5 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase"
                            style={{
                                background:
                                    "color-mix(in srgb, var(--book-accent, var(--color-bgc-highlight)) 15%, transparent)",
                                color: "var(--book-accent, var(--color-bgc-highlight))",
                            }}
                        >
                            {t("preview.title")}
                        </span>
                        {bestScore > 0 && (
                            <span className="text-text-highlight inline-flex items-center gap-1 text-[11px] font-bold">
                                <Trophy className="h-3 w-3" />
                                {t("preview.bestScore", {
                                    score: bestScore.toFixed(1),
                                })}
                            </span>
                        )}
                    </div>
                    <IconButton
                        size="small"
                        onClick={() => onOpenChange(false)}
                        sx={{ color: "var(--color-text-muted)" }}
                    >
                        <X className="h-5 w-5" />
                    </IconButton>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-5 pb-5">
                    {loading || !question ? (
                        <div className="bg-bgc-page h-40 animate-pulse rounded-xl" />
                    ) : (
                        <>
                            <div>
                                <h3 className="text-text-contrast text-2xl leading-snug font-bold">
                                    <FuriganaMarkup
                                        markup={
                                            question.titleMarkup ||
                                            question.title
                                        }
                                        showFurigana={showFurigana}
                                    />
                                </h3>
                                {question.description && (
                                    <p className="text-text-muted mt-1 text-sm">
                                        {question.description}
                                    </p>
                                )}
                            </div>

                            {context && (
                                <PreviewSection
                                    icon={<Lightbulb className="h-4 w-4" />}
                                    title={t("preview.context")}
                                >
                                    <p className="text-text-muted text-sm">
                                        {context}
                                    </p>
                                </PreviewSection>
                            )}

                            {question.vocabularies.length > 0 && (
                                <PreviewSection
                                    icon={<BookOpen className="h-4 w-4" />}
                                    title={t("path.vocabShort")}
                                >
                                    <NodeTermList
                                        items={question.vocabularies}
                                    />
                                </PreviewSection>
                            )}

                            {question.grammars.length > 0 && (
                                <PreviewSection
                                    icon={<Sparkles className="h-4 w-4" />}
                                    title={t("preview.grammar")}
                                >
                                    <NodeTermList items={question.grammars} />
                                </PreviewSection>
                            )}
                        </>
                    )}
                </div>

                <div className="border-bdc-primary border-t p-4">
                    <Link
                        href={href as AllRoute}
                        className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                        style={{
                            background:
                                "var(--book-accent, var(--color-bgc-highlight))",
                        }}
                    >
                        <Mic className="h-4 w-4" />
                        {t("preview.practiceNow")}
                    </Link>
                </div>
            </div>
        </Drawer>
    );
}

export default QuestionPreviewDrawer;
