"use client";
import React from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export interface Expression {
    jp: string;
    furigana: string;
    vi: string;
    note: string;
}

export interface ItVocab {
    jp: string;
    furigana: string;
    romaji: string;
    vi: string;
    en: string;
}

/** Dạng thô của một từ vựng — chấp nhận cả field cũ (term/reading/meaning)
 *  lẫn field mở rộng (jp/furigana/vi/romaji/en). */
interface RawItVocab {
    jp?: string;
    term?: string;
    furigana?: string;
    reading?: string;
    vi?: string;
    meaning?: string;
    romaji?: string;
    en?: string;
}

interface AdvancedHintsViewProps {
    expressions: Expression[];
    itVocab: RawItVocab[];
    showFurigana: boolean;
}

export function AdvancedHintsView({
    expressions,
    itVocab,
    showFurigana,
}: AdvancedHintsViewProps) {
    const t = useTranslations("historyDetail");

    const normalizedItVocab = React.useMemo(() => {
        if (!itVocab || !Array.isArray(itVocab)) return [];
        return itVocab.map((v: RawItVocab) => {
            const jp = v.jp ?? v.term ?? "";
            const furigana = v.furigana ?? v.reading ?? "";
            const vi = v.vi ?? v.meaning ?? "";
            const romaji = v.romaji ?? "";
            const en = v.en ?? "IT";
            return { jp, furigana, vi, romaji, en };
        });
    }, [itVocab]);

    return (
        <div className="grid gap-5 lg:grid-cols-2">
            {/* Expressions */}
            <div className="border-bdc-primary bg-bgc-app space-y-4 rounded-2xl border p-5">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-semibold">
                    <Sparkles
                        className="h-4 w-4"
                        style={{
                            color: "var(--book-accent, var(--color-bgc-highlight))",
                        }}
                    />
                    {t("hintsTitle")}
                </h3>

                <div className="space-y-3">
                    {expressions.map((e, idx) => (
                        <div
                            key={idx}
                            className="bg-bgc-page border-bdc-primary space-y-2 rounded-md border p-4"
                        >
                            <div className="text-text-contrast text-base leading-relaxed font-semibold">
                                <span className="font-noto-jp">{e.jp}</span>
                            </div>
                            <p className="text-text-contrast text-sm">{e.vi}</p>
                            {e.note && (
                                <p className="text-text-muted border-bdc-primary mt-1 border-t border-dashed pt-1.5 text-xs">
                                    💡 {e.note}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* IT Vocab */}
            <div className="border-bdc-primary bg-bgc-app space-y-4 rounded-2xl border p-5">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-semibold">
                    <BookOpen
                        className="h-4 w-4"
                        style={{
                            color: "var(--book-accent, var(--color-bgc-highlight))",
                        }}
                    />
                    {t("hintsItVocab")}
                </h3>

                <div className="space-y-3">
                    {normalizedItVocab.length === 0 ? (
                        <p className="text-text-muted py-6 text-center text-sm">
                            {t("noItVocabFeedback")}
                        </p>
                    ) : (
                        normalizedItVocab.map((v, idx) => (
                            <div
                                key={idx}
                                className="bg-bgc-page border-bdc-primary flex items-center gap-4 rounded-md border p-4"
                            >
                                <div className="flex-1 space-y-1">
                                    <div className="text-text-contrast text-base leading-none font-semibold">
                                        <span className="font-noto-jp">
                                            {v.jp}
                                        </span>
                                    </div>
                                    <p className="text-text-muted text-xs">
                                        {v.romaji} {v.romaji && v.vi ? "·" : ""}{" "}
                                        {v.vi}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span
                                        className="rounded px-2 py-1 text-xs font-semibold"
                                        style={{
                                            background:
                                                "color-mix(in srgb, var(--book-accent, var(--color-bgc-highlight)) 10%, transparent)",
                                            color: "var(--book-accent, var(--color-bgc-highlight))",
                                        }}
                                    >
                                        {v.en}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdvancedHintsView;
