"use client";
import React from "react";
import FuriganaText from "@/components/ui/furigana.text";
import { useTranslations } from "next-intl";

interface CustomQuestionCardProps {
  jp: string;
  vi?: string;
  showFurigana: boolean;
}

export function CustomQuestionCard({ jp, vi, showFurigana }: CustomQuestionCardProps) {
  const t = useTranslations("page.sandboxCustom");

  return (
    <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-5 md:p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-bgc-highlight/15 px-2.5 py-0.5 text-xs font-medium text-bgc-highlight">
          {t("customQuestion")}
        </span>
      </div>
      <h1 className="mt-3 text-xl font-bold leading-snug md:text-2xl text-text-contrast">
        <FuriganaText text={jp} furigana={jp} showFurigana={showFurigana} />
      </h1>
      <p className="mt-2 text-sm text-text-muted">
        {vi || `(${t("guideTitle")})`}
      </p>
    </div>
  );
}

export default CustomQuestionCard;
