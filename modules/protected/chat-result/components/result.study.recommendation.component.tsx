"use client";

import React from "react";
import { Target, HeartHandshake } from "lucide-react";
import { ResultStudyRecommendationProps } from "../types/chat.result.type";
import { formatFocusAreaLabel } from "../utils/chat.result.util";

const ResultStudyRecommendationComponent = ({
    focusArea,
    recommendation,
    encouragement,
}: ResultStudyRecommendationProps) => {
    if (!focusArea && !recommendation && !encouragement) return null;

    return (
        <div className="rounded-2xl border border-bgc-highlight/30 bg-gradient-to-r from-bgc-highlight/5 to-bgc-secondary/40 p-5 shadow-xs">
            <div className="flex items-center gap-2 text-text-highlight">
                <Target className="h-5 w-5" />
                <h3 className="text-base font-bold">Khuyến nghị lộ trình học tập</h3>
            </div>

            {focusArea && (
                <div className="mt-3">
                    <span className="text-xs font-semibold text-text-muted">
                        Khía cạnh ưu tiên cải thiện:
                    </span>
                    <span className="ml-2 inline-block rounded-md bg-bgc-highlight/15 px-2.5 py-1 text-xs font-extrabold text-text-highlight">
                        {formatFocusAreaLabel(focusArea)}
                    </span>
                </div>
            )}

            {recommendation && (
                <div className="mt-3 rounded-xl border border-bdc-primary/40 bg-bgc-app/80 p-4">
                    <h4 className="text-xs font-bold text-text-contrast">
                        Phương pháp thực hành đề xuất:
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-text-contrast">
                        {recommendation}
                    </p>
                </div>
            )}

            {encouragement && (
                <div className="mt-3 flex items-start gap-2 text-xs italic text-text-muted">
                    <HeartHandshake className="h-4 w-4 shrink-0 text-rose-500" />
                    <span>"{encouragement}"</span>
                </div>
            )}
        </div>
    );
};

export default ResultStudyRecommendationComponent;
