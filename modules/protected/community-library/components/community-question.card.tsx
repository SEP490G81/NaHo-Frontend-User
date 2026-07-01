"use client";
import React from "react";
import { Repeat2, User } from "lucide-react";
import { Button } from "@mui/material";
import { Link } from "@/i18n/navigation";
import FuriganaText from "@/components/ui/furigana.text";
import {
    CATEGORY_LABEL,
    type CommunityQuestion,
} from "@/data/mockCommunityQuestions";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";

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
    const t = useTranslations("communityLibrary");

    return (
        <article className="border-bdc-primary bg-bgc-app hover:border-bgc-highlight/40 grid grid-cols-1 md:grid-cols-12 items-start md:items-center gap-4 rounded-md border p-4 shadow-sm transition-colors">
            {/* Column 1: Text content (5/12 cols) */}
            <div className="md:col-span-5 space-y-1.5 min-w-0">
                <p className="text-text-contrast text-base font-semibold leading-snug">
                    <FuriganaText
                        text={question.jp}
                        furigana={question.furigana}
                        showFurigana={showFurigana}
                    />
                </p>
                <p className="text-text-muted text-sm">{question.vi}</p>
            </div>

            {/* Column 2: Category Badge (2/12 cols) */}
            <div className="md:col-span-2 flex justify-start md:justify-center">
                <span
                    className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
                        CATEGORY_TONE[question.category],
                    )}
                >
                    {CATEGORY_LABEL[question.category]}
                </span>
            </div>

            {/* Column 3: Metadata stats (3/12 cols) */}
            <div className="md:col-span-3 flex flex-col gap-1.5 text-text-muted text-xs">
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <Repeat2 className="h-3.5 w-3.5" />
                    {t("practiceCount", { count: question.practiceCount })}
                </span>
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <User className="h-3 w-3" />
                    {question.contributorName} • {question.contributorLevel}
                </span>
            </div>

            {/* Column 4: Practice Button (2/12 cols) */}
            <div className="md:col-span-2 flex justify-start md:justify-end w-full">
                <Button
                    component={Link as any}
                    href={`/community-library/${question.id}`}
                    variant="contained"
                    size="small"
                    sx={{
                        textTransform: "none",
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-pure)",
                        fontWeight: "bold",
                        "&:hover": { opacity: 0.9 },
                        width: { xs: "100%", md: "auto" },
                        py: 0.75,
                        px: 2,
                    }}
                >
                    {t("viewDetail")}
                </Button>
            </div>
        </article>
    );
}

export default CommunityQuestionCard;
