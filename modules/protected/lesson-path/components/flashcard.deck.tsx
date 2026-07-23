"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import FuriganaText from "@/components/ui/furigana.text";
import type { Vocab } from "@/data/marugoto/types";

function speak(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
}

export function FlashcardDeck({
    vocab,
    showFurigana,
}: {
    vocab: Vocab[];
    showFurigana: boolean;
}) {
    const t = useTranslations("marugoto");
    const [i, setI] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const total = vocab.length;
    const go = (d: number) => {
        setFlipped(false);
        setI((p) => Math.min(Math.max(p + d, 0), total - 1));
    };

    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                setFlipped(false);
                setI((p) => Math.max(p - 1, 0));
            } else if (e.key === "ArrowRight") {
                setFlipped(false);
                setI((p) => Math.min(p + 1, total - 1));
            } else if (e.key === " ") {
                e.preventDefault();
                setFlipped((f) => !f);
            }
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [total]);

    if (total === 0)
        return <p className="text-text-muted py-6 text-center text-sm">{t("vocab.empty")}</p>;

    const v = vocab[i];

    return (
        <div className="flex flex-col items-center gap-4">
            <button
                type="button"
                onClick={() => setFlipped((f) => !f)}
                aria-label={t("vocab.flip")}
                className="group relative h-52 w-full [perspective:1200px]"
            >
                <div
                    className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
                    style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
                >
                    {/* Front */}
                    <div className="border-bdc-primary bg-bgc-page absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border p-6 shadow-sm [backface-visibility:hidden]">
                        <span className="text-text-contrast font-noto-jp text-4xl font-bold">
                            <FuriganaText
                                text={v.japanese}
                                furigana={v.reading ?? v.japanese}
                                showFurigana={showFurigana && !!v.reading}
                            />
                        </span>
                        <span className="text-text-muted text-xs">{t("vocab.flip")}</span>
                    </div>
                    {/* Back */}
                    <div className="border-bgc-highlight/40 bg-bgc-highlight/10 absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        {v.reading && (
                            <p className="text-bgc-highlight font-noto-jp text-2xl font-bold">
                                {v.reading}
                            </p>
                        )}
                        <p className="text-text-contrast text-center text-lg font-semibold">
                            {v.vi}
                        </p>
                    </div>
                </div>
            </button>

            <div className="flex w-full items-center justify-between">
                <button
                    type="button"
                    onClick={() => go(-1)}
                    disabled={i === 0}
                    className="border-bdc-primary text-text-contrast hover:bg-hbgc-app inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-40"
                >
                    <ChevronLeft className="h-4 w-4" />
                    {t("vocab.prev")}
                </button>

                <button
                    type="button"
                    onClick={() => speak(v.japanese)}
                    aria-label={t("vocab.speak")}
                    className="bg-bgc-highlight/15 text-bgc-highlight hover:bg-bgc-highlight hover:text-white inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-all"
                >
                    <Volume2 className="h-4 w-4" />
                    {i + 1}/{total}
                </button>

                <button
                    type="button"
                    onClick={() => go(1)}
                    disabled={i === total - 1}
                    className="border-bdc-primary text-text-contrast hover:bg-hbgc-app inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-40"
                >
                    {t("vocab.next")}
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5">
                {vocab.map((_, idx) => (
                    <span
                        key={idx}
                        className={cn(
                            "h-1.5 rounded-full transition-all",
                            idx === i
                                ? "bg-bgc-highlight w-5"
                                : "bg-bdc-primary w-1.5",
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

export default FlashcardDeck;
