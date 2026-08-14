import { FileResponse } from "@/types/responses/file.response";

/** Response của POST /analysis (chấm điểm phát âm). */
export interface SpeakingAnalysisResponse {
    answerHistoryId: number;
    overallScore: number;
    audioFile: FileResponse;
}

/* ─── AI 1:1 Dialogue (luồng nói chuyện với persona) ─────────────── */

/** POST /speaking/session/{personaId} — bắt đầu hội thoại với AI. */
export interface StartConversationResponse {
    sessionId: string;
    /** WAV base64 (không có tiền tố data:) của câu chào — phát bằng TTS. */
    audioBase64: string;
    aiGreeting: string;
    /** Bản dịch tiếng Việt của câu chào. */
    aiGreetingTranslation: string | null;
    /** Giải thích ngữ pháp của câu chào. */
    grammarExplanation: string | null;
}

/** POST /speaking/session/{sessionId}/audio — STT + điểm phát âm + reply + phụ trợ học. */
export interface AudioChatResponse {
    transcribedText: string;
    assistantReply: string;
    /** Bản dịch tiếng Việt của câu AI trả lời. */
    assistantReplyTranslation: string | null;
    /** Giải thích ngữ pháp câu AI. */
    grammarExplanation: string | null;
    /** Câu của người dùng sau khi sửa lỗi. */
    correctedUserText: string | null;
    /** Giải thích lỗi/sửa của câu người dùng. */
    correctionExplanation: string | null;
    /** WAV base64 giọng AI đọc câu trả lời (TTS). */
    aiReplyAudio: string | null;
    accuracyScore: number | null;
    fluencyScore: number | null;
    completenessScore: number | null;
    pronunciationScore: number | null;
}

/** POST /speaking/session/{sessionId}/message — reply text (kèm phụ trợ học). */
export interface ChatReplyResponse {
    assistantReply: string;
    assistantReplyTranslation: string | null;
    grammarExplanation: string | null;
    correctedUserText: string | null;
    correctionExplanation: string | null;
    aiReplyAudio: string | null;
}

/* ─── AI 1:1 Session persistence: resume + history (#59) ─────────── */

export type SpeakingSessionStatus = "IN_PROGRESS" | "COMPLETED";

/** Một tin nhắn đã lưu trong phiên (dùng khi resume / xem chi tiết). */
export interface SessionMessageItem {
    turnIndex: number;
    /** "USER" | "ASSISTANT" (hoặc tương đương từ BE). */
    senderType: string;
    content: string;
    correctedText: string | null;
    correctionExplanation: string | null;
    grammarNote: string | null;
    hintForLearner: string | null;
    /** URL audio TTS của câu (nếu có) — dùng phát lại khi resume. */
    audioUrl: string | null;
}

/** GET /speaking/session/active — phiên đang dở của user (null nếu không có). */
export interface ActiveSpeakingSessionResponse {
    id: number;
    sessionCode: string;
    personaId: number | null;
    topic: string | null;
    marugotoLevel: string | null;
    formalityLevel: string | null;
    totalTurns: number;
    startedAt: string;
    messages: SessionMessageItem[];
}

/** Một dòng trong danh sách lịch sử phiên (POST /speaking/session/history). */
export interface SpeakingSessionListItem {
    id: number;
    sessionCode: string;
    topic: string | null;
    personaId: number | null;
    marugotoLevel: string | null;
    formalityLevel: string | null;
    overallScore: number;
    jlptEstimate: string | null;
    totalTurns: number;
    durationSeconds: number;
    startedAt: string;
    endedAt: string | null;
    status: SpeakingSessionStatus;
}

export interface SpeakingSessionQuery {
    page?: number;
    size?: number;
    sortColumn?: string;
    sortDirection?: "ASC" | "DESC";
    personaId?: number | null;
    search?: string | null;
    status?: SpeakingSessionStatus | null;
}

/** Gợi ý học tập (chỉ có ở chi tiết phiên, /end chưa trả). */
export interface SessionStudyRecommendation {
    focusArea: string;
    reason: string;
    suggestedPractice: string;
    encouragement: string;
}

export interface SessionImprovedExpressionDetail {
    original: string;
    improved: string;
    explanationVi: string | null;
}

/** GET /speaking/session/history/{sessionCode} — chi tiết đầy đủ 1 phiên. */
export interface SpeakingSessionDetail {
    id: number;
    sessionCode: string;
    topic: string | null;
    personaId: number | null;
    marugotoLevel: string | null;
    formalityLevel: string | null;
    totalTurns: number;
    durationSeconds: number;
    asrConfidence: number | null;
    fullTranscript: string | null;
    startedAt: string;
    endedAt: string | null;
    overallScore: number;
    jlptEstimate: string | null;
    fluencyScore: number;
    pronunciationScore: number;
    grammarScore: number;
    vocabularyScore: number;
    interactionScore: number;
    naturalnessScore: number;
    coherenceScore: number;
    summary: string | null;
    strengths: string[];
    weaknesses: string[];
    feedback: Record<string, string>;
    improvedExpressions: SessionImprovedExpressionDetail[];
    studyRecommendation: SessionStudyRecommendation | null;
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
    audioUrl: string | null;
    report: SpeakingReport;
}
