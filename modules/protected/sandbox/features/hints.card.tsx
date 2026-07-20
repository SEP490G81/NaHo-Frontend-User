"use client";
import React, { useState } from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import FuriganaText from "@/components/ui/furigana.text";
import type { QuestionHints } from "@/data/mockHints";

interface HintsCardProps {
    hints: QuestionHints;
    showFurigana: boolean;
    accent: string;
}

function TabButton({
    active,
    accent,
    onClick,
    icon,
    label,
    count,
}: {
    active: boolean;
    accent: string;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
    count: number;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-bold transition-colors",
                active
                    ? "text-text-contrast"
                    : "border-transparent text-text-muted hover:text-text-contrast",
            )}
            style={active ? { borderColor: accent, color: accent } : undefined}
        >
            {icon}
            {label}
            <span className="text-text-muted font-medium">({count})</span>
        </button>
    );
}

export function HintsCard({ hints, showFurigana, accent }: HintsCardProps) {
    const t = useTranslations("sandbox");
    const [tab, setTab] = useState<"vocab" | "grammar">("vocab");

    return (
        <div className="border-bdc-primary bg-bgc-app overflow-hidden rounded-2xl border">
            <div className="border-bdc-primary flex border-b">
                <TabButton
                    active={tab === "vocab"}
                    accent={accent}
                    onClick={() => setTab("vocab")}
                    icon={<BookOpen className="h-4 w-4" />}
                    label={t("hintsTitle")}
                    count={hints.vocab.length}
                />
                <TabButton
                    active={tab === "grammar"}
                    accent={accent}
                    onClick={() => setTab("grammar")}
                    icon={<Sparkles className="h-4 w-4" />}
                    label={t("hintsGrammar")}
                    count={hints.structures.length}
                />
            </div>

            <div className="max-h-[320px] overflow-y-auto p-4">
                {tab === "vocab" ? (
                    hints.vocab.length === 0 ? (
                        <p className="text-text-muted py-4 text-center text-xs italic">
                            {t("hintsNoVocab")}
                        </p>
                    ) : (
                        <ul className="flex flex-wrap gap-2">
                            {hints.vocab.map((v) => (
                                <li
                                    key={v.jp}
                                    className="border-bdc-primary bg-bgc-page rounded-md border px-2.5 py-1.5 text-xs"
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
                    )
                ) : hints.structures.length === 0 ? (
                    <p className="text-text-muted py-4 text-center text-xs italic">
                        {t("hintsNoGrammar")}
                    </p>
                ) : (
                    <ul className="space-y-2 text-sm">
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
                )}
            </div>
        </div>
    );
}

export default HintsCard;
