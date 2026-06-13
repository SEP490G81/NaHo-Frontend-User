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
        <div className="border-bdc-primary bg-bgc-app rounded-md border">
            <div className="border-bdc-primary border-b p-4">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-semibold">
                    <BookOpen className="text-bgc-highlight h-4 w-4" />
                    {t("hintsTitle")}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                    {hints.vocab.map((v) => (
                        <li
                            key={v.jp}
                            className="group border-bdc-primary bg-bgc-page rounded-md border px-2.5 py-1.5 text-xs"
                            title={v.vi}
                        >
                            <FuriganaText
                                text={v.jp}
                                furigana={v.furigana}
                                showFurigana={showFurigana}
                                className="text-text-contrast text-sm"
                            />
                            <span className="text-text-muted ml-1">
                                · {v.vi}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-4">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="text-bgc-highlight h-4 w-4" />
                    {t("hintsModelAnswer")}
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                    {hints.structures.map((s) => (
                        <li
                            key={s.jp}
                            className="border-bdc-primary bg-bgc-page rounded-md border p-2.5"
                        >
                            <p className="font-noto-jp text-text-contrast">
                                {s.jp}
                            </p>
                            <p className="text-text-muted mt-0.5 text-xs">
                                {s.vi}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HintsCard;
