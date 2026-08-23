"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { ResultExpressionsProps } from "../types/chat.result.type";

const ResultExpressionsComponent = ({
    assessment,
}: ResultExpressionsProps) => {
    const expressions = assessment.speakingImprovedExpressions || [];

    if (expressions.length === 0) return null;

    return (
        <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-5 shadow-xs">
            <div className="flex items-center gap-2 text-text-contrast">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h3 className="text-base font-bold">Gợi ý cách diễn đạt chuẩn hơn</h3>
            </div>
            <p className="mt-1 text-xs text-text-muted">
                Các câu tiếng Nhật bạn đã nói cùng phương án diễn đạt tự nhiên hơn từ AI:
            </p>

            <div className="mt-4 space-y-3">
                {expressions.map((exp, idx) => (
                    <div
                        key={exp.id || idx}
                        className="rounded-xl border border-bdc-primary/50 bg-bgc-secondary/30 p-4 transition-colors hover:border-bgc-highlight/40"
                    >
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            {/* Original */}
                            <div className="flex-1 rounded-lg bg-red-500/5 p-2.5 text-xs border border-red-500/10">
                                <span className="font-semibold text-red-600 dark:text-red-400">
                                    Đã nói:
                                </span>{" "}
                                <span className="text-text-contrast font-medium">
                                    {exp.originalText}
                                </span>
                            </div>

                            <ArrowRight className="hidden h-4 w-4 shrink-0 text-text-muted md:block" />

                            {/* Improved */}
                            <div className="flex-1 rounded-lg bg-emerald-500/5 p-2.5 text-xs border border-emerald-500/10">
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                    Gợi ý sửa:
                                </span>{" "}
                                <span className="text-text-contrast font-bold">
                                    {exp.improvedText}
                                </span>
                            </div>
                        </div>

                        {exp.explanationVietnamese && (
                            <p className="mt-2 text-xs italic text-text-muted">
                                💡 {exp.explanationVietnamese}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultExpressionsComponent;
