"use client";

import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { RefreshCw, ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SpeakingSessionAssessmentResponse } from "@/types/responses/speaking.llm.response";
import { getOrEndSpeakingSessionAssessment } from "@/services/client/speaking.llm.service";
import { ChatResultProps } from "../types/chat.result.type";
import ResultHeroComponent from "../components/result.hero.component";
import ResultStrengthsWeaknessesComponent from "../components/result.strengths.weaknesses.component";
import ResultAspectFeedbackComponent from "../components/result.aspect.feedback.component";
import ResultExpressionsComponent from "../components/result.expressions.component";
import ResultStudyRecommendationComponent from "../components/result.study.recommendation.component";

const ChatResultView = ({
    assessment: initialAssessment,
    sessionCode,
    isLoading: initialIsLoading = false,
}: ChatResultProps) => {
    const [assessment, setAssessment] =
        useState<SpeakingSessionAssessmentResponse | null>(initialAssessment);
    const [isLoading, setIsLoading] = useState<boolean>(initialIsLoading);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        setAssessment(initialAssessment);
    }, [initialAssessment]);

    useEffect(() => {
        if (!assessment && sessionCode) {
            let isMounted = true;
            setIsFetching(true);

            const fetchAssessment = async () => {
                try {
                    const data = await getOrEndSpeakingSessionAssessment(sessionCode);
                    if (isMounted && data) {
                        setAssessment(data);
                    }
                } catch {
                    // ignore error
                } finally {
                    if (isMounted) setIsFetching(false);
                }
            };

            fetchAssessment();

            return () => {
                isMounted = false;
            };
        }
    }, [assessment, sessionCode]);

    if (isLoading || isFetching) {
        return (
            <div className="flex h-[calc(100vh-140px)] flex-col items-center justify-center space-y-3 py-20 text-center">
                <div className="relative flex items-center justify-center">
                    <CircularProgress size={44} sx={{ color: "var(--color-bgc-highlight)" }} />
                    <Sparkles className="absolute h-5 w-5 animate-pulse text-amber-500" />
                </div>
                <p className="text-sm font-bold text-text-contrast">
                    AI đang phân tích & chấm điểm kết quả luyện nói...
                </p>
                <p className="text-xs text-text-muted">
                    Vui lòng chờ trong giây lát để nhận báo cáo đánh giá chi tiết.
                </p>
            </div>
        );
    }

    if (!assessment) {
        return (
            <div className="flex h-[calc(100vh-140px)] flex-col items-center justify-center space-y-4 py-20 text-center">
                <p className="text-sm font-medium text-text-muted">
                    Không tìm thấy kết quả đánh giá cho phiên hội thoại này.
                </p>
                <Button
                    component={Link}
                    href="/persona-setup"
                    variant="contained"
                    color="primary"
                    startIcon={<RefreshCw className="h-4 w-4" />}
                    sx={{ borderRadius: "12px", fontWeight: "bold" }}
                >
                    Tạo phiên hội thoại mới
                </Button>
            </div>
        );
    }

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
                    }}
                >
                    Tạo phiên chat mới
                </Button>
            </div>

            {/* Hero Section */}
            <ResultHeroComponent assessment={assessment} />

            {/* Strengths & Weaknesses */}
            <ResultStrengthsWeaknessesComponent
                strengths={assessment.strengths}
                weaknesses={assessment.weaknesses}
            />

            {/* Criteria Detailed Feedback */}
            <ResultAspectFeedbackComponent assessment={assessment} />

            {/* Improved Expressions */}
            <ResultExpressionsComponent assessment={assessment} />

            {/* Study Recommendation */}
            <ResultStudyRecommendationComponent
                focusArea={assessment.studyFocusArea}
                recommendation={assessment.studyRecommendation}
                encouragement={assessment.studyEncouragement}
            />
        </div>
    );
};

export default ChatResultView;
