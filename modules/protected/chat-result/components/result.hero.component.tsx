"use client";

import React from "react";
import { ResultHeroProps } from "../types/chat.result.type";
import { Award } from "lucide-react";

const ResultHeroComponent = ({ assessment }: ResultHeroProps) => {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-bdc-primary bg-bgc-app p-6 shadow-xs">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                {/* Left: Assessment Title Info */}
                <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-bgc-highlight/10 px-2.5 py-0.5 text-xs font-semibold text-text-highlight">
                        <Award className="h-3.5 w-3.5" />
                        Đánh Giá Kết Quả Luyện Nói AI
                    </span>
                    <h2 className="mt-1.5 text-xl font-extrabold text-text-contrast">
                        Báo Cáo Đánh Giá Khả Năng Giao Tiếp
                    </h2>
                </div>

                {/* Right Summary Badge */}
                {assessment.overallScore !== undefined && (
                    <div className="flex min-w-36 items-center justify-center rounded-2xl border border-bdc-primary/60 bg-bgc-secondary/50 p-4 text-center">
                        <div>
                            <p className="text-2xl font-black text-text-highlight">
                                {assessment.overallScore > 0
                                    ? assessment.overallScore.toFixed(1)
                                    : "Báo cáo AI"}
                            </p>
                            <p className="text-xs font-medium text-text-muted">
                                {assessment.jlptEstimate
                                    ? `Trình độ JLPT ${assessment.jlptEstimate}`
                                    : "Tổng quan phiên"}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Assessment Summary paragraph */}
            {assessment.summary && (
                <div className="mt-5 rounded-xl border border-bdc-primary/40 bg-bgc-secondary/30 p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
                        Tóm tắt đánh giá tổng quan
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-text-contrast">
                        {assessment.summary}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ResultHeroComponent;
