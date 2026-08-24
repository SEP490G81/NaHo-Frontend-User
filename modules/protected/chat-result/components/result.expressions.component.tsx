"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { ResultExpressionsProps } from "../types/chat.result.type";

const ResultExpressionsComponent = ({ assessment }: ResultExpressionsProps) => {
    const expressions = assessment.speakingImprovedExpressions || [];

    if (expressions.length === 0) return null;

    return (
        <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-xs">
            <div className="text-text-contrast flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h3 className="text-base font-bold">
                    Gợi ý cách diễn đạt chuẩn hơn
                </h3>
            </div>
            <p className="text-text-muted mt-1 text-xs">
                Các câu tiếng Nhật bạn đã nói cùng phương án diễn đạt tự nhiên
                hơn từ AI:
            </p>

            <div className="mt-4 space-y-3">
                {expressions.map((exp, idx) => (
                    <div
                        key={exp.id || idx}
                        className="border-bdc-primary/50 bg-bgc-secondary/30 hover:border-bgc-highlight/40 rounded-xl border p-4 transition-colors"
                    >
                        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            {/* Original */}
                            <div className="flex-1 rounded-lg border border-red-500/10 bg-red-500/5 p-2.5 text-xs">
                                <span className="font-semibold text-red-600 dark:text-red-400">
                                    Đã nói:
                                </span>{" "}
                                <span className="text-text-contrast font-medium">
                                    {exp.originalText}
                                </span>
                            </div>

                            <ArrowRight className="text-text-muted hidden h-4 w-4 shrink-0 md:block" />

                            {/* Improved */}
                            <div className="flex-1 rounded-lg border border-emerald-500/10 bg-emerald-500/5 p-2.5 text-xs">
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                    Gợi ý sửa:
                                </span>{" "}
                                <span className="text-text-contrast font-bold">
                                    {exp.improvedText}
                                </span>
                            </div>
                        </div>

                        {exp.explanationVietnamese && (
                            <p className="text-text-muted mt-2 text-xs italic">
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
