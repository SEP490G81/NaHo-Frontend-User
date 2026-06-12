"use client";
import React from "react";
import { BookOpen, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import FuriganaText from "@/components/ui/furigana.text";

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

interface AdvancedHintsViewProps {
    expressions: Expression[];
    itVocab: any[];
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
        return itVocab.map((v: any) => {
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
            <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-5 space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-text-contrast">
                    <Sparkles className="h-4 w-4 text-bgc-highlight" />
                    {t("hintsTitle")}
                </h3>

                <div className="space-y-3">
                    {expressions.map((e, idx) => (
                        <div key={idx} className="rounded-xl bg-bgc-page p-4 border border-bdc-primary space-y-2">
                            <div className="text-base font-semibold leading-relaxed text-text-contrast">
                                <FuriganaText text={e.jp} furigana={e.furigana} showFurigana={showFurigana} />
                            </div>
                            <p className="text-sm text-text-contrast">{e.vi}</p>
                            {e.note && (
                                <p className="text-xs text-text-muted border-t border-dashed border-bdc-primary pt-1.5 mt-1">
                                    💡 {e.note}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* IT Vocab */}
            <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-5 space-y-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-text-contrast">
                    <BookOpen className="h-4 w-4 text-bgc-highlight" />
                    {t("hintsItVocab")}
                </h3>

                <div className="space-y-3">
                    {normalizedItVocab.length === 0 ? (
                        <p className="text-sm text-text-muted text-center py-6">
                            {t("noItVocabFeedback")}
                        </p>
                    ) : (
                        normalizedItVocab.map((v, idx) => (
                            <div key={idx} className="flex gap-4 rounded-xl bg-bgc-page p-4 border border-bdc-primary items-center">
                                <div className="flex-1 space-y-1">
                                    <div className="text-base font-semibold leading-none text-text-contrast">
                                        <FuriganaText text={v.jp} furigana={v.furigana} showFurigana={showFurigana} />
                                    </div>
                                    <p className="text-xs text-text-muted">{v.romaji} {v.romaji && v.vi ? "·" : ""} {v.vi}</p>
                                </div>
                                <div className="text-right">
                                    <span className="rounded bg-bgc-highlight/10 px-2 py-1 text-xs font-semibold text-bgc-highlight">
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
