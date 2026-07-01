"use client";
import React from "react";
import type { QuestionHints } from "@/data/mockHints";
import FuriganaText from "@/components/ui/furigana.text";

interface HintsViewProps {
    hints: QuestionHints;
}

export function HintsView({ hints }: HintsViewProps) {
    return (
        <section className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm space-y-6">
            <h3 className="text-text-contrast text-base font-bold border-b border-bdc-primary pb-3">
                Gợi ý nói phản xạ
            </h3>

            {/* Vocab hints */}
            <div className="space-y-3">
                <h4 className="text-text-contrast text-sm font-semibold">Từ vựng khuyên dùng:</h4>
                <div className="grid gap-3 sm:grid-cols-2">
                    {hints.vocab.map((v, idx) => (
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
                <h4 className="text-text-contrast text-sm font-semibold">Cấu trúc ngữ pháp gợi ý:</h4>
                <div className="space-y-2">
                    {hints.structures.map((s, idx) => (
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

export default HintsView;
