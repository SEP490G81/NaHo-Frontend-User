"use client";

import React from "react";
import { HeartHandshake, Target } from "lucide-react";
import { ResultStudyRecommendationProps } from "../types/chat.result.type";
import { formatFocusAreaLabel } from "../utils/chat.result.util";

const ResultStudyRecommendationComponent = ({
    focusArea,
    recommendation,
    encouragement,
}: ResultStudyRecommendationProps) => {
    if (!focusArea && !recommendation && !encouragement) return null;

    return (
        <div className="border-bgc-highlight/30 from-bgc-highlight/5 to-bgc-secondary/40 rounded-2xl border bg-gradient-to-r p-5 shadow-xs">
            <div className="text-text-highlight flex items-center gap-2">
                <Target className="h-5 w-5" />
                <h3 className="text-base font-bold">
                    Khuyến nghị lộ trình học tập
                </h3>
            </div>

            {focusArea && (
                <div className="mt-3">
                    <span className="text-text-muted text-xs font-semibold">
                        Khía cạnh ưu tiên cải thiện:
                    </span>
                    <span className="bg-bgc-highlight/15 text-text-highlight ml-2 inline-block rounded-md px-2.5 py-1 text-xs font-extrabold">
                        {formatFocusAreaLabel(focusArea)}
                    </span>
                </div>
            )}

            {recommendation && (
                <div className="border-bdc-primary/40 bg-bgc-app/80 mt-3 rounded-xl border p-4">
                    <h4 className="text-text-contrast text-xs font-bold">
                        Phương pháp thực hành đề xuất:
                    </h4>
                    <p className="text-text-contrast mt-1 text-xs leading-relaxed">
                        {recommendation}
                    </p>
                </div>
            )}

            {encouragement && (
                <div className="text-text-muted mt-3 flex items-start gap-2 text-xs italic">
                    <HeartHandshake className="h-4 w-4 shrink-0 text-rose-500" />
                    <span>"{encouragement}"</span>
                </div>
            )}
        </div>
    );
};

export default ResultStudyRecommendationComponent;
