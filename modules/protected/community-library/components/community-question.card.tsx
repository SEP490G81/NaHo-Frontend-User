"use client";
import React from "react";
import { Mic, Repeat2, User } from "lucide-react";
import { Button } from "@mui/material";
import { useRouter } from "@/i18n/navigation";
import FuriganaText from "@/components/ui/furigana.text";
import {
    CATEGORY_LABEL,
    type CommunityQuestion,
} from "@/data/mockCommunityQuestions";
import { useCustomQuestionStore } from "@/store/customQuestionStore";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const CATEGORY_TONE: Record<CommunityQuestion["category"], string> = {
    brse: "bg-bgc-highlight/15 text-bgc-highlight",
    it: "bg-blue-500/15 text-blue-600 dark:text-blue-300",
    office: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    daily: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
};

interface Props {
    question: CommunityQuestion;
    showFurigana: boolean;
}

export function CommunityQuestionCard({ question, showFurigana }: Props) {
    const { push } = useRouter();
    const t = useTranslations("communityLibrary");
    const setQuestion = useCustomQuestionStore((s) => s.setQuestion);

    const handlePractice = () => {
        const id = `cq-${Date.now()}`;
        setQuestion({
            id,
            questionJp: question.jp,
            hintVi: question.vi,
            shareToCommunity: false,
        });
        push(`/sandbox-custom/${id}`);
    };

    return (
        <article className="border-bdc-primary bg-bgc-app hover:border-bgc-highlight/40 flex flex-col justify-between gap-4 rounded-xl border p-5 shadow-sm transition-colors">
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                    <span
                        className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                            CATEGORY_TONE[question.category],
                        )}
                    >
                        {CATEGORY_LABEL[question.category]}
                    </span>
                    <span className="text-text-muted inline-flex items-center gap-1 text-xs">
                        <User className="h-3 w-3" />
                        {question.contributorName} • {question.contributorLevel}
                    </span>
                </div>

                <p className="text-text-contrast text-base leading-snug">
                    <FuriganaText
                        text={question.jp}
                        furigana={question.furigana}
                        showFurigana={showFurigana}
                    />
                </p>
                <p className="text-text-muted text-sm">{question.vi}</p>
            </div>

            <div className="border-bdc-primary flex items-center justify-between gap-3 border-t pt-3">
                <span className="text-text-muted inline-flex items-center gap-1 text-xs">
                    <Repeat2 className="h-3.5 w-3.5" />
                    {t("practiceCount", { count: question.practiceCount })}
                </span>
                <Button
                    onClick={handlePractice}
                    variant="contained"
                    size="small"
                    startIcon={<Mic className="h-4 w-4" />}
                    sx={{
                        textTransform: "none",
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-pure)",
                        fontWeight: "bold",
                        "&:hover": { opacity: 0.9 },
                    }}
                >
                    {t("practiceNow")}
                </Button>
            </div>
        </article>
    );
}

export default CommunityQuestionCard;
