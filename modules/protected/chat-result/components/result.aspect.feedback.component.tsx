"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { ResultAspectFeedbackProps } from "../types/chat.result.type";

interface AspectItem {
    id: string;
    label: string;
    feedback?: string | null;
    score?: number | null;
}

const ResultAspectFeedbackComponent = ({
    assessment,
}: ResultAspectFeedbackProps) => {
    const aspects: AspectItem[] = [
        {
            id: "fluency",
            label: "Trôi chảy",
            feedback: assessment.feedbackFluency,
            score: assessment.fluencyScore,
        },
        {
            id: "pronunciation",
            label: "Phát âm",
            feedback: assessment.feedbackPronunciation,
            score: assessment.pronunciationScore,
        },
        {
            id: "grammar",
            label: "Ngữ pháp",
            feedback: assessment.feedbackGrammar,
            score: assessment.grammarScore,
        },
        {
            id: "vocabulary",
            label: "Từ vựng",
            feedback: assessment.feedbackVocabulary,
            score: assessment.vocabularyScore,
        },
        {
            id: "interaction",
            label: "Tương tác",
            feedback: assessment.feedbackInteraction,
            score: assessment.interactionScore,
        },
        {
            id: "naturalness",
            label: "Tự nhiên",
            feedback: assessment.feedbackNaturalness,
            score: assessment.naturalnessScore,
        },
        {
            id: "coherence",
            label: "Mạch lạc",
            feedback: assessment.feedbackCoherence,
            score: assessment.coherenceScore,
        },
    ].filter((a) => Boolean(a.feedback));

    const [activeTab, setActiveTab] = useState<number>(0);

    if (aspects.length === 0) return null;

    const currentAspect = aspects[activeTab] || aspects[0];

    return (
        <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-5 shadow-xs">
            <h3 className="text-base font-bold text-text-contrast">
                Nhận xét chi tiết theo tiêu chí
            </h3>

            {/* Horizontal Tabs */}
            <div className="mt-3 border-b border-bdc-primary/50">
                <Tabs
                    value={activeTab}
                    onChange={(_, val) => setActiveTab(val)}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        "& .MuiTab-root": {
                            fontSize: "12px",
                            fontWeight: "bold",
                            textTransform: "none",
                            color: "var(--color-text-muted)",
                            "&.Mui-selected": {
                                color: "var(--color-bgc-highlight)",
                            },
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "var(--color-bgc-highlight)",
                        },
                    }}
                >
                    {aspects.map((aspect) => (
                        <Tab key={aspect.id} label={aspect.label} />
                    ))}
                </Tabs>
            </div>

            {/* Feedback Content */}
            <div className="mt-4 rounded-xl border border-bdc-primary/40 bg-bgc-secondary/20 p-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-text-contrast">
                        {currentAspect.label}
                    </h4>
                    {typeof currentAspect.score === "number" && (
                        <span className="rounded-full bg-bgc-highlight/10 px-2.5 py-0.5 text-xs font-extrabold text-text-highlight">
                            {currentAspect.score.toFixed(1)} / 10
                        </span>
                    )}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-text-contrast">
                    {currentAspect.feedback}
                </p>
            </div>
        </div>
    );
};

export default ResultAspectFeedbackComponent;
