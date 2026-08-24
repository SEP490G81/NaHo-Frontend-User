"use client";
import React, { useEffect, useState } from "react";
import {
    AlertCircle,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Mic,
    Square,
    Volume2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import type { Vocab } from "@/data/marugoto/types";
import { VOCAB_PASS_SCORE } from "@/store/marugotoStore";
import { useVocabPronunciation } from "../hooks/use.vocab.pronunciation";

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
    cardIndex,
    onCardIndexChange,
    onLastCardPassChange,
}: {
    vocab: Vocab[];
    showFurigana: boolean;
    /** Vị trí thẻ đang xem — điều khiển từ VocabDialog để còn nguyên khi đóng/mở lại. */
    cardIndex: number;
    onCardIndexChange: (index: number) => void;
    /**
     * Báo mỗi khi trạng thái "đang ở thẻ cuối VÀ ghi âm đạt" đổi (cả true lẫn
     * false) — không chỉ báo 1 lần lúc đạt. Bắt buộc phải sống (re-check mỗi khi
     * đổi thẻ/ghi âm lại/mount lại) để "Hoàn thành" luôn phản ánh đúng lần ghi âm
     * GẦN NHẤT ở thẻ cuối, không bị kẹt true mãi sau 1 lần đạt rồi ghi âm lại fail.
     */
    onLastCardPassChange?: (passed: boolean) => void;
}) {
    const t = useTranslations("marugoto");
    const total = vocab.length;
    const i = Math.min(Math.max(cardIndex, 0), Math.max(total - 1, 0));
    const [flipped, setFlipped] = useState(false);
    const {
        status: pronStatus,
        score: pronScore,
        passed: pronPassed,
        startRecording,
        stopRecording,
        reset: resetPron,
    } = useVocabPronunciation();

    const isLastCardPassed = total > 0 && i >= total - 1 && pronPassed;
    useEffect(() => {
        onLastCardPassChange?.(isLastCardPassed);
    }, [isLastCardPassed, onLastCardPassChange]);

    // Đổi thẻ → reset kết quả ghi âm của thẻ trước, phải ghi âm lại cho thẻ mới.
    useEffect(() => {
        resetPron();
    }, [i, resetPron]);

    const go = (d: number) => {
        setFlipped(false);
        onCardIndexChange(Math.min(Math.max(i + d, 0), total - 1));
    };

    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                setFlipped(false);
                onCardIndexChange(Math.max(i - 1, 0));
            } else if (e.key === "ArrowRight" && pronPassed) {
                setFlipped(false);
                onCardIndexChange(Math.min(i + 1, total - 1));
            } else if (e.key === " ") {
                e.preventDefault();
                setFlipped((f) => !f);
            }
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [total, pronPassed, i, onCardIndexChange]);

    if (total === 0)
        return (
            <p className="text-text-muted py-6 text-center text-sm">
                {t("vocab.empty")}
            </p>
        );

    const v = vocab[i];
    const isLast = i === total - 1;

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
                            {v.japanese}
                        </span>
                        <span className="text-text-muted text-xs">
                            {t("vocab.flip")}
                        </span>
                    </div>
                    {/* Back */}
                    <div
                        className="absolute inset-0 flex [transform:rotateY(180deg)] flex-col items-center justify-center gap-2 rounded-2xl border p-6 [backface-visibility:hidden]"
                        style={{
                            borderColor:
                                "color-mix(in srgb, var(--book-accent, var(--color-bgc-highlight)) 40%, transparent)",
                            background:
                                "color-mix(in srgb, var(--book-accent, var(--color-bgc-highlight)) 10%, transparent)",
                        }}
                    >
                        {v.reading && (
                            <p
                                className="font-noto-jp text-2xl font-bold"
                                style={{
                                    color: "var(--book-accent, var(--color-bgc-highlight))",
                                }}
                            >
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
                    className="bg-bgc-page inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold text-[var(--book-accent,var(--color-bgc-highlight))] transition-all hover:bg-[var(--book-accent,var(--color-bgc-highlight))] hover:text-white"
                >
                    <Volume2 className="h-4 w-4" />
                    {i + 1}/{total}
                </button>

                <button
                    type="button"
                    onClick={() => go(1)}
                    disabled={isLast || !pronPassed}
                    title={
                        !pronPassed
                            ? t("vocab.recordGateHint", {
                                  min: VOCAB_PASS_SCORE,
                              })
                            : undefined
                    }
                    className="border-bdc-primary text-text-contrast hover:bg-hbgc-app inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-40"
                >
                    {t("vocab.next")}
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Ghi âm + chấm điểm — bắt buộc đạt ngưỡng mới mở khoá "Tiếp". */}
            <div className="border-bdc-primary bg-bgc-page flex w-full flex-col items-center gap-2 rounded-xl border border-dashed p-3">
                {pronStatus === "idle" || pronStatus === "error" ? (
                    <button
                        type="button"
                        onClick={() => startRecording(v.japanese)}
                        className="text-text-pure inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-90"
                        style={{
                            background:
                                "var(--book-accent, var(--color-bgc-highlight))",
                        }}
                    >
                        <Mic className="h-4 w-4" />
                        {t("vocab.recordToCheck")}
                    </button>
                ) : pronStatus === "recording" ? (
                    <button
                        type="button"
                        onClick={() => stopRecording()}
                        className="inline-flex items-center gap-2 rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        <Square className="h-3.5 w-3.5" />
                        {t("vocab.recording")}
                    </button>
                ) : pronStatus === "scoring" ? (
                    <span className="text-text-muted inline-flex items-center gap-2 text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("vocab.scoring")}
                    </span>
                ) : null}

                {pronStatus === "error" && (
                    <p className="flex items-center gap-1.5 text-xs text-red-500">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {t("vocab.recordError")}
                    </p>
                )}

                {pronStatus === "scored" && pronScore != null && (
                    <div
                        className={cn(
                            "flex items-center gap-1.5 text-sm font-semibold",
                            pronPassed ? "text-text-success" : "text-red-500",
                        )}
                    >
                        {pronPassed ? (
                            <CheckCircle2 className="h-4 w-4" />
                        ) : (
                            <AlertCircle className="h-4 w-4" />
                        )}
                        {pronPassed
                            ? t("vocab.recordPassed", {
                                  score: pronScore.toFixed(1),
                              })
                            : t("vocab.recordFailed", {
                                  score: pronScore.toFixed(1),
                                  min: VOCAB_PASS_SCORE,
                              })}
                    </div>
                )}

                {pronStatus === "scored" && !pronPassed && (
                    <button
                        type="button"
                        onClick={() => startRecording(v.japanese)}
                        className="border-bdc-primary text-text-contrast hover:bg-hbgc-app inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors"
                    >
                        <Mic className="h-3.5 w-3.5" />
                        {t("vocab.recordAgain")}
                    </button>
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-1.5">
                {vocab.map((_, idx) => (
                    <span
                        key={idx}
                        className={cn(
                            "h-1.5 rounded-full transition-all",
                            idx === i ? "w-5" : "bg-bdc-primary w-1.5",
                        )}
                        style={
                            idx === i
                                ? {
                                      background:
                                          "var(--book-accent, var(--color-bgc-highlight))",
                                  }
                                : undefined
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default FlashcardDeck;
