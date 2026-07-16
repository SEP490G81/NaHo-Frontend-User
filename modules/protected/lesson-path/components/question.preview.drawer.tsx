"use client";
import React from "react";
import { Drawer, IconButton } from "@mui/material";
import { BookOpen, Lightbulb, Mic, Sparkles, Trophy, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import type { Question } from "@/data/mockTopics";
import FuriganaText from "@/components/ui/furigana.text";
import MockAudioPlayer from "@/modules/protected/topic-detail/components/mock.audio.player";
import PreviewSection from "./preview.section";
import GrammarList from "./grammar.list";

interface Props {
    open: boolean;
    onOpenChange: (o: boolean) => void;
    question: Question | null;
    /** TODO: BE chưa trả từ vựng/ngữ pháp theo câu hỏi → hiện dùng dữ liệu mock. */
    grammar: string[];
    context: string;
    bestScore: number;
    href: string;
    showFurigana: boolean;
}

export function QuestionPreviewDrawer({
    open,
    onOpenChange,
    question,
    grammar,
    context,
    bestScore,
    href,
    showFurigana,
}: Props) {
    const t = useTranslations("marugoto");

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={() => onOpenChange(false)}
            sx={{
                "& .MuiDrawer-paper": {
                    width: { xs: "100%", sm: 440 },
                    backgroundColor: "var(--color-bgc-app)",
                    backgroundImage: "none",
                    borderLeft: "1px solid var(--color-bdc-primary)",
                },
            }}
        >
            {question && (
                <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3 p-5 pb-3">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="bg-bgc-highlight/15 text-bgc-highlight rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase">
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
                        <div>
                            <h3 className="text-text-contrast font-noto-jp text-2xl leading-snug font-bold">
                                <FuriganaText
                                    text={question.jp}
                                    furigana={question.furigana}
                                    showFurigana={showFurigana}
                                />
                            </h3>
                            <p className="text-text-muted mt-1 text-sm">
                                {question.vi}
                            </p>
                        </div>

                        {context && (
                            <PreviewSection
                                icon={<Lightbulb className="h-4 w-4" />}
                                title={t("preview.context")}
                            >
                                <p className="text-text-muted text-sm">{context}</p>
                            </PreviewSection>
                        )}

                        {grammar.length > 0 && (
                            <PreviewSection
                                icon={<BookOpen className="h-4 w-4" />}
                                title={t("preview.grammar")}
                            >
                                <GrammarList grammar={grammar} />
                            </PreviewSection>
                        )}

                        {question.modelAnswer && (
                            <PreviewSection
                                icon={<Sparkles className="h-4 w-4" />}
                                title={t("preview.modelAnswer")}
                            >
                                <p className="text-text-contrast font-noto-jp text-base leading-relaxed font-medium">
                                    <FuriganaText
                                        text={question.modelAnswer.jp}
                                        furigana={question.modelAnswer.furigana}
                                        showFurigana={showFurigana}
                                    />
                                </p>
                                <p className="text-text-muted text-[13px]">
                                    {question.modelAnswer.vi}
                                </p>
                                <MockAudioPlayer
                                    durationSec={question.modelAnswer.durationSec}
                                />
                            </PreviewSection>
                        )}
                    </div>

                    <div className="border-bdc-primary border-t p-4">
                        <Link
                            href={href as AllRoute}
                            className="bg-bgc-highlight hover:bg-bgc-highlight/90 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition-colors"
                        >
                            <Mic className="h-4 w-4" />
                            {t("preview.practiceNow")}
                        </Link>
                    </div>
                </div>
            )}
        </Drawer>
    );
}

export default QuestionPreviewDrawer;
