/** Response của POST /analysis (chấm điểm phát âm). */
export interface SpeakingAnalysisResponse {
    historyId: number;
    score: number;
}

export interface SpeakingReportScores {
    pronunciation: number;
    vocabulary: number;
    grammar: number;
    naturalness: number;
}

export interface SpeakingTranscriptError {
    type: string;
    explanation: string;
    suggestion: string;
}

export interface SpeakingTranscriptItem {
    text: string;
    error: SpeakingTranscriptError | null;
}

export interface SpeakingAiSuggestion {
    jp: string;
    furigana: string;
    vi: string;
}

export interface SpeakingPronunciationItem {
    text: string;
    furigana: string;
    severity: string;
    note: string;
}

export interface SpeakingExpressionItem {
    jp: string;
    furigana: string;
    vi: string;
    note: string;
}

export interface SpeakingVocabItem {
    term: string;
    reading: string;
    meaning: string;
}

export interface SpeakingReport {
    average: number;
    scores: SpeakingReportScores;
    userTranscript: SpeakingTranscriptItem[];
    aiSuggestion: SpeakingAiSuggestion | null;
    pronunciation: SpeakingPronunciationItem[];
    pronunciationNote: string;
    expressions: SpeakingExpressionItem[];
    itVocab: SpeakingVocabItem[];
}

/** Response của GET /history/{historyId} (chi tiết báo cáo luyện nói). */
export interface SpeakingHistoryDetailResponse {
    historyId: number;
    topicId: number | null;
    questionId: number | null;
    practicedAt: string;
    durationSec: number;
    score: number;
    audioUrl: string;
    report: SpeakingReport;
}
