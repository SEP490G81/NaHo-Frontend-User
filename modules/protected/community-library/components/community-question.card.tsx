"use client";
import React from "react";
import { Mic, Repeat2, User } from "lucide-react";
import { Button } from "@mui/material";
import { useRouter } from "@/intl/i18n/navigation";
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
  const t = useTranslations("page.communityLibrary");
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
    <article className="flex flex-col justify-between gap-4 rounded-xl border border-bdc-primary bg-bgc-app p-5 transition-colors hover:border-bgc-highlight/40 shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
              CATEGORY_TONE[question.category]
            )}
          >
            {CATEGORY_LABEL[question.category]}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-text-muted">
            <User className="h-3 w-3" />
            {question.contributorName} • {question.contributorLevel}
          </span>
        </div>

        <p className="text-base leading-snug text-text-contrast">
          <FuriganaText
            text={question.jp}
            furigana={question.furigana}
            showFurigana={showFurigana}
          />
        </p>
        <p className="text-sm text-text-muted">{question.vi}</p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-bdc-primary pt-3">
        <span className="inline-flex items-center gap-1 text-xs text-text-muted">
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
