"use client";
import React from "react";
import { DEFAULT_HINTS } from "@/data/mockHints";
import FuriganaText from "@/components/ui/furigana.text";
import { useTranslations } from "next-intl";

export function CustomHintsView() {
    const t = useTranslations("topicDetail");

    return (
        <section className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm space-y-6">
            <h3 className="text-text-contrast text-base font-bold border-b border-bdc-primary pb-3">
                {t("reflexHints")}
            </h3>

            {/* Vocab hints */}
            <div className="space-y-3">
                <h4 className="text-text-contrast text-sm font-semibold">{t("recommendedVocab")}</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                    {DEFAULT_HINTS.vocab.map((v, idx) => (
                        <div key={idx} className="border-bdc-primary bg-bgc-page rounded-lg border p-3 flex flex-col gap-1">
                            <span className="text-text-contrast text-base font-bold">
                                <FuriganaText text={v.jp} furigana={v.furigana} showFurigana={true} />
                            </span>
                            <span className="text-text-muted text-xs">{v.vi}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Structure hints */}
            <div className="space-y-3 pt-3 border-t border-bdc-primary border-dashed">
                <h4 className="text-text-contrast text-sm font-semibold">{t("recommendedStructures")}</h4>
                <div className="space-y-2">
                    {DEFAULT_HINTS.structures.map((s, idx) => (
                        <div key={idx} className="border-bdc-primary bg-bgc-page rounded-lg border p-3">
                            <p className="text-bgc-highlight text-sm font-semibold">{s.jp}</p>
                            <p className="text-text-muted text-xs mt-1">{s.vi}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CustomHintsView;
