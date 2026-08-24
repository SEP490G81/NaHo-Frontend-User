"use client";

import React from "react";
import { ResultHeroProps } from "../types/chat.result.type";
import { Award } from "lucide-react";

const ResultHeroComponent = ({ assessment }: ResultHeroProps) => {
    return (
        <div className="border-bdc-primary bg-bgc-app relative overflow-hidden rounded-2xl border p-6 shadow-xs">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                {/* Left: Assessment Title Info */}
                <div>
                    <span className="bg-bgc-highlight/10 text-text-highlight inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                        <Award className="h-3.5 w-3.5" />
                        Đánh Giá Kết Quả Luyện Nói AI
                    </span>
                    <h2 className="text-text-contrast mt-1.5 text-xl font-extrabold">
                        Báo Cáo Đánh Giá Khả Năng Giao Tiếp
                    </h2>
                </div>

                {/* Right Summary Badge */}
                {assessment.overallScore !== undefined && (
                    <div className="border-bdc-primary/60 bg-bgc-secondary/50 flex min-w-36 items-center justify-center rounded-2xl border p-4 text-center">
                        <div>
                            <p className="text-text-highlight text-2xl font-black">
                                {assessment.overallScore > 0
                                    ? assessment.overallScore.toFixed(1)
                                    : "Báo cáo AI"}
                            </p>
                            <p className="text-text-muted text-xs font-medium">
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
                <div className="border-bdc-primary/40 bg-bgc-secondary/30 mt-5 rounded-xl border p-4">
                    <h4 className="text-text-muted text-xs font-bold tracking-wider uppercase">
                        Tóm tắt đánh giá tổng quan
                    </h4>
                    <p className="text-text-contrast mt-1 text-sm leading-relaxed">
                        {assessment.summary}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ResultHeroComponent;
