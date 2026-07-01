"use client";
import React from "react";
import { User, Repeat2 } from "lucide-react";
import type { CommunityQuestion } from "@/data/mockCommunityQuestions";
import FuriganaText from "@/components/ui/furigana.text";

interface CustomQuestionCardViewProps {
    question: CommunityQuestion;
}

export function CustomQuestionCardView({ question }: CustomQuestionCardViewProps) {
    return (
        <section className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-text-contrast">
                <span className="bg-bgc-highlight/10 text-bgc-highlight flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
                    ?
                </span>
                <h2 className="text-lg font-bold">Câu hỏi cộng đồng</h2>
            </div>

            <div className="space-y-4">
                <div className="text-2xl font-bold leading-relaxed text-text-contrast">
                    <FuriganaText
                        text={question.jp}
                        furigana={question.furigana}
                        showFurigana={true}
                    />
                </div>
                <p className="text-text-muted text-base">{question.vi}</p>

                {/* Contribution Meta */}
                <div className="flex flex-wrap gap-4 border-t border-bdc-primary pt-3 text-text-muted text-xs">
                    <span className="inline-flex items-center gap-1.5">
                        <User className="h-4 w-4 text-bgc-highlight" />
                        Người đóng góp: <strong className="text-text-contrast">{question.contributorName}</strong> ({question.contributorLevel})
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Repeat2 className="h-4 w-4" />
                        Lượt luyện tập toàn bộ: <strong>{question.practiceCount}</strong>
                    </span>
                </div>
            </div>
        </section>
    );
}

export default CustomQuestionCardView;
