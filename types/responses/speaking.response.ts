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

/** Một dòng trong danh sách lịch sử luyện nói (GET /history). */
export interface SpeakingHistoryListItem {
    historyId: number;
    speakingQuestionId: number | null;
    speakingQuestionTitle: string | null;
    topicId: number | null;
    topicName: string | null;
    /** Node lộ trình chứa câu hỏi — để mở lại sandbox đúng đề bài. */
    learningPathNodeId: number | null;
    bookId: number | null;
    score: number;
    durationSec: number;
    /** URL CloudFront phát được trực tiếp. */
    audioUrl: string | null;
    practicedAt: string;
}

/** Shape phân trang của Spring Page (endpoint /history trả trong `data`). */
export interface SpringPage<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    empty: boolean;
}

/** Response của GET /history/{historyId} (chi tiết báo cáo luyện nói). */
export interface SpeakingHistoryDetailResponse {
    historyId: number;
    topicId: number | null;
    questionId: number | null;
    speakingQuestionTitle: string | null;
    topicName: string | null;
    /** Node lộ trình chứa câu hỏi — để mở lại sandbox đúng đề bài. */
    learningPathNodeId: number | null;
    bookId: number | null;
    practicedAt: string;
    durationSec: number;
    score: number;
    audioUrl: string;
    report: SpeakingReport;
}
