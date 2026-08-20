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
}

export interface SpeakingSessionListItemResponse {
    id: number;
    sessionCode: string;
    userId: number;
    personaId: number;
    topic: string;
    voiceName: string;
    marugotoLevel: MarugotoLevel;
    formalityLevel: FormalityLevel;
    durationSeconds: number | null;
    totalTurns: number;
    asrConfidence: number | null;
    fullTranscript: string | null;
    status: SpeakingSessionStatus;
    startedAt: string;
    endedAt: string | null;
}

export interface SpeakingSessionResponse {
    id: number;
    sessionCode: string;
    userId: number;
    personaId: number;
    topic: string;
    voiceName: string;
    marugotoLevel: MarugotoLevel;
    formalityLevel: FormalityLevel;
    durationSeconds: number | null;
    totalTurns: number;
    asrConfidence: number | null;
    fullTranscript: string | null;
    status: SpeakingSessionStatus;
    startedAt: string;
    endedAt: string | null;
    messages: SpeakingSessionMessageResponse[];
}

export interface ChatResponse {
    assistantReply: string;
    assistantReplyTranslation: string;
    grammarExplanation: string;
    correctedUserText: string;
    correctionExplanation: string;
    aiReplyAudio: string;
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
