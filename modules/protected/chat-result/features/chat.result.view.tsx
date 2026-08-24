"use client";

import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { ChatResultProps } from "../types/chat.result.type";
import ResultPersonaCardComponent from "../components/result.persona.card.component";
import ResultHeroComponent from "../components/result.hero.component";
import ResultStrengthsWeaknessesComponent from "../components/result.strengths.weaknesses.component";
import ResultAspectFeedbackComponent from "../components/result.aspect.feedback.component";
import ResultExpressionsComponent from "../components/result.expressions.component";
import ResultStudyRecommendationComponent from "../components/result.study.recommendation.component";

const ChatResultView = ({ session }: ChatResultProps) => {
    const assessment = session.speakingSessionAssessment;
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries({
            queryKey: ["user-learning-progress"],
        });
        queryClient.invalidateQueries({
            queryKey: ["user-daily-missions"],
        });
    }, [queryClient]);

    return (
        <div className="mx-auto max-w-5xl space-y-6 pb-12">
            {/* Action Bar */}
            <div className="flex items-center justify-between">
                <Button
                    component={Link}
                    href="/persona-setup"
                    variant="outlined"
                    startIcon={<ArrowLeft className="h-4 w-4" />}
                    sx={{
                        borderRadius: "10px",
                        fontSize: "12px",
                        color: "var(--color-text-contrast)",
                        borderColor: "var(--color-bdc-primary)",
                        "&:hover": {
                            backgroundColor: "var(--color-hbgc-app)",
                        },
                    }}
                >
                    Tạo phiên chat mới
                </Button>
            </div>

            {/* Persona Overview Card */}
            <ResultPersonaCardComponent session={session} />

            {/* Assessment Sections (if available) */}
            {assessment ? (
                <>
                    {/* Hero Score Overview */}
                    <ResultHeroComponent
                        assessment={assessment}
                        session={session}
                    />

                    {/* Strengths & Weaknesses */}
                    <ResultStrengthsWeaknessesComponent
                        strengths={assessment.strengths}
                        weaknesses={assessment.weaknesses}
                    />

                    {/* Detailed Feedback by Criteria */}
                    <ResultAspectFeedbackComponent assessment={assessment} />

                    {/* Improved Expressions */}
                    <ResultExpressionsComponent assessment={assessment} />

                    {/* Study Recommendation */}
                    <ResultStudyRecommendationComponent
                        focusArea={assessment.studyFocusArea}
                        recommendation={assessment.studyRecommendation}
                        encouragement={assessment.studyEncouragement}
                    />
                </>
            ) : (
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-8 text-center shadow-xs">
                    <p className="text-text-muted text-sm">
                        Phiên hội thoại này chưa có dữ liệu đánh giá chi tiết.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ChatResultView;
