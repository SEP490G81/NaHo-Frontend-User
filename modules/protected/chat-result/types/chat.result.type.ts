import { SpeakingSessionAssessmentResponse } from "@/types/responses/speaking.llm.response";

export interface ChatResultProps {
    readonly assessment: SpeakingSessionAssessmentResponse | null;
    readonly sessionCode?: string;
    readonly isLoading?: boolean;
}

export interface ResultHeroProps {
    readonly assessment: SpeakingSessionAssessmentResponse;
}

export interface ResultStrengthsWeaknessesProps {
    readonly strengths?: string | null;
    readonly weaknesses?: string | null;
}

export interface ResultAspectFeedbackProps {
    readonly assessment: SpeakingSessionAssessmentResponse;
}

export interface ResultExpressionsProps {
    readonly assessment: SpeakingSessionAssessmentResponse;
}

export interface ResultStudyRecommendationProps {
    readonly focusArea?: string | null;
    readonly recommendation?: string | null;
    readonly encouragement?: string | null;
}
