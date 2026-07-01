"use client";
import React from "react";
import FuriganaText from "@/components/ui/furigana.text";

interface QuestionCardViewProps {
    jp: string;
    furigana: string;
    vi: string;
}

export function QuestionCardView({ jp, furigana, vi }: QuestionCardViewProps) {
    return (
        <section className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-text-contrast">
                <span className="bg-bgc-highlight/10 text-bgc-highlight flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                    ?
                </span>
                <h2 className="text-lg font-bold">Câu hỏi luyện tập</h2>
            </div>

            <div className="space-y-2">
                <div className="text-2xl font-bold leading-relaxed text-text-contrast">
                    <FuriganaText
                        text={jp}
                        furigana={furigana}
                        showFurigana={true}
                    />
                </div>
                <p className="text-text-muted text-base">{vi}</p>
            </div>
        </section>
    );
}

export default QuestionCardView;
