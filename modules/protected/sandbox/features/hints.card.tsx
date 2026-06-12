"use client";
import React from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import FuriganaText from "@/components/ui/furigana.text";
import type { QuestionHints } from "@/data/mockHints";

interface HintsCardProps {
    hints: QuestionHints;
    showFurigana: boolean;
}

export function HintsCard({ hints, showFurigana }: HintsCardProps) {
    const t = useTranslations("sandbox");

    return (
        <div className="rounded-xl border border-bdc-primary bg-bgc-app">
            <div className="border-b border-bdc-primary p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-text-contrast">
                    <BookOpen className="h-4 w-4 text-bgc-highlight" />
                    {t("hintsTitle")}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                    {hints.vocab.map((v) => (
                        <li
                            key={v.jp}
                            className="group rounded-md border border-bdc-primary bg-bgc-page px-2.5 py-1.5 text-xs"
                            title={v.vi}
                        >
                            <FuriganaText
                                text={v.jp}
                                furigana={v.furigana}
                                showFurigana={showFurigana}
                                className="text-sm text-text-contrast"
                            />
                            <span className="ml-1 text-text-muted">· {v.vi}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-text-contrast">
                    <Sparkles className="h-4 w-4 text-bgc-highlight" />
                    {t("hintsModelAnswer")}
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                    {hints.structures.map((s) => (
                        <li key={s.jp} className="rounded-md border border-bdc-primary bg-bgc-page p-2.5">
                            <p className="font-noto-jp text-text-contrast">{s.jp}</p>
                            <p className="mt-0.5 text-xs text-text-muted">{s.vi}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HintsCard;
