import { PersonaResponse } from "@/types/responses/persona.response";
import {
    FormalityLevel,
    MarugotoLevel,
    MessageType,
    SpeakingSessionStatus,
} from "@/types/enums/speaking.llm.enum";

export interface StartConversationResponse {
    sessionCode: string;
    audioBase64: string;
    content: string;
    contentTranslation: string;
    grammarNote: string;
}

export interface SpeakingSessionMessageResponse {
    id: number;
    sessionId: number;
    audioFileId: number | null;
    turnIndex: number;
    senderType: string;
    messageType: MessageType;
    content: string;
    contentTranslation: string | null;
    correctedText: string | null;
    correctionExplanation: string | null;
    grammarNote: string | null;
    hintForLearner: string | null;
    pronunciationScore: number | null;
    aiReplyAudio: string | null;
    userRecordAudio: string | null;
    suggestedReplies?: string[] | null;
}

export interface SpeakingSessionListItemResponse {
    id: number;
    sessionCode: string;
    userId: number;
    persona: PersonaResponse;
    topic: string;
    voiceName: string;
    marugotoLevel: MarugotoLevel;
    formalityLevel: FormalityLevel;
    durationSeconds: number | null;
    totalTurns: number;
    status: SpeakingSessionStatus;
    startedAt: string;
    endedAt: string | null;
}

export interface SpeakingImprovedExpressionResponse {
    id: number;
    speakingSessionAssessmentId: number;
    turnIndex: number;
    originalText: string;
    improvedText: string;
    explanationVietnamese: string;
}

export interface SpeakingSessionAssessmentResponse {
    id: number;
    speakingSessionId: number;
    overallScore: number;
    jlptEstimate: string;
    fluencyScore: number;
    pronunciationScore: number;
    grammarScore: number;
    vocabularyScore: number;
    interactionScore: number;
    naturalnessScore: number;
    coherenceScore: number;
    summary: string;
    strengths: string;
    weaknesses: string;
    feedbackFluency: string;
    feedbackPronunciation: string;
    feedbackGrammar: string;
    feedbackVocabulary: string;
    feedbackInteraction: string;
    feedbackNaturalness: string;
    feedbackCoherence: string;
    studyFocusArea: string;
    studyRecommendation: string;
    studyEncouragement: string;
    speakingImprovedExpressions?: SpeakingImprovedExpressionResponse[];
}

export interface SpeakingSessionResponse {
    id: number;
    sessionCode: string;
    userId: number;
    persona: PersonaResponse;
    topic?: string | null;
    voiceName?: string | null;
    marugotoLevel: MarugotoLevel;
    formalityLevel: FormalityLevel;
    durationSeconds?: number | null;
    totalTurns: number;
    asrConfidence?: number | null;
    fullTranscript?: string | null;
    status: SpeakingSessionStatus;
    startedAt: string;
    endedAt: string | null;
    speakingSessionAssessment?: SpeakingSessionAssessmentResponse | null;
    speakingSessionMessages?: SpeakingSessionMessageResponse[] | null;
    messages?: SpeakingSessionMessageResponse[] | null;
}

export interface ChatResponse {
    userMessage: SpeakingSessionMessageResponse;
    aiMessage: SpeakingSessionMessageResponse;
}

export interface AudioChatResponse {
    transcribedText: string;
    assistantReply: string;
    assistantReplyTranslation: string;
    grammarExplanation: string;
    correctedUserText: string;
    correctionExplanation: string;
    aiReplyAudio: string;
    accuracyScore: number;
    fluencyScore: number;
    completenessScore: number;
    pronunciationScore: number;
    suggestedReplies: string[];
}

export interface Scores {
    fluency: number;
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    interaction: number;
    naturalness: number;
    coherence: number;
}

export interface ImprovedExpression {
    original: string;
    improved: string;
}

export interface ScoringResponse {
    sessionCode: string;
    overallScore: number;
    jlptEstimate: string;
    scores: Scores;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    feedback: Record<string, string>;
    improvedExpressions: ImprovedExpression[];
}
