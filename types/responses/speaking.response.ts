/** Response của POST /analysis (chấm điểm phát âm). */
export interface SpeakingAnalysisResponse {
    historyId: number;
    score: number;
}

/* ─── AI 1:1 Dialogue (luồng nói chuyện với persona) ─────────────── */

/** POST /speaking/session/{personaId} — bắt đầu hội thoại với AI. */
export interface StartConversationResponse {
    sessionId: string;
    /** WAV base64 (không có tiền tố data:) của câu chào — phát bằng TTS. */
    audioBase64: string;
    aiGreeting: string;
}

/** POST /speaking/session/{sessionId}/audio — STT + điểm phát âm + reply. */
export interface AudioChatResponse {
    transcribedText: string;
    assistantReply: string;
    accuracyScore: number | null;
    fluencyScore: number | null;
    completenessScore: number | null;
    pronunciationScore: number | null;
}

/** POST /speaking/session/{sessionId}/message — reply cho tin nhắn text. */
export interface ChatReplyResponse {
    assistantReply: string;
}

/** 7 chiều điểm trong báo cáo cuối phiên. */
export interface SessionScoreBreakdown {
    fluency: number;
    pronunciation: number;
    grammar: number;
    vocabulary: number;
    interaction: number;
    naturalness: number;
    coherence: number;
}

export interface SessionImprovedExpression {
    original: string;
    improved: string;
}

/** POST /speaking/session/{sessionId}/end — báo cáo chấm điểm cả phiên. */
export interface SessionScoringResponse {
    sessionId: string;
    overallScore: number;
    jlptEstimate: string;
    scores: SessionScoreBreakdown;
    summary: string;
    strengths: string[];
    weaknesses: string[];
    /** Map key→tip, ví dụ pronunciation_tip / grammar_tip. */
    feedback: Record<string, string>;
    improvedExpressions: SessionImprovedExpression[];
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
