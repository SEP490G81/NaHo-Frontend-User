import {
    SpeakingSessionAssessmentResponse,
    SpeakingSessionResponse,
} from "@/types/responses/speaking.llm.response";

export interface ChatResultProps {
    readonly session: SpeakingSessionResponse;
}

export interface ResultPersonaCardProps {
    readonly session: SpeakingSessionResponse;
}

export interface ResultHeroProps {
    readonly assessment: SpeakingSessionAssessmentResponse;
    readonly session?: SpeakingSessionResponse;
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
