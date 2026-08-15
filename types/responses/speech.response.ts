export type SpeechAssessmentErrorType =
    | "OMISSION"
    | "INSERTION"
    | "MISPRONUNCIATION"
    | "NONE";

export interface PronunciationAssessmentResponse {
    id: number;
    transcriptText: string;
    accuracyScore: number;
    fluencyScore: number;
    completenessScore: number;
    pronunciationScore: number;
    words: WordAssessmentResponse[];
}

export interface WordAssessmentResponse {
    id: number;
    word: string;
    accuracyScore: number;
    errorType: SpeechAssessmentErrorType;
}

export interface AudioChatResponse {
    transcribedText: string;
    assistantReply: string;
    accuracyScore: number;
    fluencyScore: number;
    completenessScore: number;
    pronunciationScore: number;
}

export interface ChatResponse {
    assistantReply: string;
}

export interface ScoringResponse {
    sessionCode: string;
    overallScore: number;
    jlptEstimate: string;
    scores: ScoringResponseScores;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    feedback: Record<string, string>;
    improvedExpressions: ScoringResponseImprovedExpression[];
}

export interface ScoringResponseScores {
    fluency: number;
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    interaction: number;
    naturalness: number;
    coherence: number;
}

export interface ScoringResponseImprovedExpression {
    original: string;
    improved: string;
}

import { SpeakingAnalysisResponse } from "./speaking.response";

export type { SpeakingAnalysisResponse };

export interface SpeakingHistoryDetailResponse {
    historyId: string;
    topicId: string;
    questionId: string;
    practicedAt: string;
    durationSec: number;
    score: number;
    audioUrl: string;
    report: SpeakingHistoryDetailResponseReport;
}

export interface SpeakingHistoryDetailResponseReport {
    average: number;
    scores: SpeakingHistoryDetailResponseScores;
    userTranscript: SpeakingHistoryDetailResponseUserTranscriptItem[];
    aiSuggestion: SpeakingHistoryDetailResponseAiSuggestion;
    pronunciation: SpeakingHistoryDetailResponsePronunciationItem[];
    pronunciationNote: string;
    expressions: SpeakingHistoryDetailResponseExpressionItem[];
    itVocab: SpeakingHistoryDetailResponseItVocabItem[];
}

export interface SpeakingHistoryDetailResponseScores {
    pronunciation: number;
    vocabulary: number;
    grammar: number;
    naturalness: number;
}

export interface SpeakingHistoryDetailResponseUserTranscriptItem {
    text: string;
    error: SpeakingHistoryDetailResponseErrorDetail;
}

export interface SpeakingHistoryDetailResponseErrorDetail {
    type: string;
    explanation: string;
    suggestion: string;
}

export interface SpeakingHistoryDetailResponseAiSuggestion {
    jp: string;
    furigana: string;
    vi: string;
}

export interface SpeakingHistoryDetailResponsePronunciationItem {
    text: string;
    furigana: string;
    severity: string;
    note: string;
}

export interface SpeakingHistoryDetailResponseExpressionItem {
    jp: string;
    furigana: string;
    vi: string;
    note: string;
}

export interface SpeakingHistoryDetailResponseItVocabItem {
    term: string;
    reading: string;
    meaning: string;
}

export interface StartSessionResponse {
    sessionCode: string;
}

export interface StartTopicResponse {
    sessionCode: string;
    topic: string;
    aiGreeting: string;
}

export interface SuggestedTopicsResponse {
    topics: SuggestedTopicsResponseTopicItem[];
}

export interface SuggestedTopicsResponseTopicItem {
    nameJa: string;
    nameVie: string;
    description: string;
    jlptLevel: string;
}
