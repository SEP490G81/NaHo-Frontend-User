/* ─── AI 1:1 Dialogue (luồng nói chuyện với persona) ─────────────── */

/** POST /speaking/session/persona/{personaId} — bắt đầu hội thoại với AI. */
export interface StartConversationResponse {
    sessionCode: string;
    /** WAV base64 (không có tiền tố data:) của câu chào — phát bằng TTS. */
    audioBase64: string;
    aiGreeting: string;
    /** Bản dịch tiếng Việt của câu chào. */
    aiGreetingTranslation: string | null;
    /** Giải thích ngữ pháp của câu chào. */
    grammarExplanation: string | null;
}

/** POST /speaking/session/{sessionCode}/audio — STT + điểm phát âm + reply + phụ trợ học. */
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

/** POST /speaking/session/{sessionCode}/message — reply text (kèm phụ trợ học). */
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

/** POST /speaking/session/{sessionCode}/end — báo cáo chấm điểm cả phiên. */
export interface SessionScoringResponse {
    sessionCode: string;
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

/* ─── Answer History (chấm điểm + báo cáo luyện nói theo câu hỏi) ─── */

export type SpeechAssessmentErrorType =
    | "OMISSION"
    | "INSERTION"
    | "MISPRONUNCIATION"
    | "NONE";

export type LanguageCategory = "VOCABULARY" | "GRAMMAR";

/** Điểm phát âm một từ (Azure Pronunciation Assessment). */
export interface WordAssessmentResponse {
    id: number;
    word: string;
    accuracyScore: number | null;
    errorType: SpeechAssessmentErrorType;
}

/** Kết quả chấm phát âm từ Azure — accuracy/fluency/completeness/pronunciation đều thang 0-100. */
export interface SpeechAssessmentResponse {
    id: number;
    /** Bản STT đầy đủ, thật từ Azure — nguồn hiển thị chính cho "Bản ghi âm của bạn". */
    transcriptText: string | null;
    accuracyScore: number | null;
    fluencyScore: number | null;
    completenessScore: number | null;
    pronunciationScore: number | null;
    averageScore: number | null;
    words: WordAssessmentResponse[];
}

/** Một cụm từ vựng/ngữ pháp học viên đã dùng đúng trong câu trả lời. */
export interface UsedVocabularyAndGrammarResponse {
    id: number;
    expression: string;
    category: LanguageCategory;
}

/** Một lỗi trong câu trả lời của học viên kèm bản sửa. */
export interface UserAnswerErrorResponse {
    id: number;
    incorrect: string;
    correction: string;
}

/** Nhận xét của AI (LLM) — điểm ngữ pháp/từ vựng/tự nhiên/độ bám sát đề bài đều thang 0-100. */
export interface AiFeedbackResponse {
    id: number;
    grammarScore: number | null;
    vocabularyScore: number | null;
    naturalnessScore: number | null;
    contentRelevantScore: number | null;
    averageScore: number | null;
    suggestJapaneseAnswer: string | null;
    suggestAnswerTranslation: string | null;
    usedVocabulariesAndGrammars: UsedVocabularyAndGrammarResponse[];
    userAnswerErrors: UserAnswerErrorResponse[];
}

/** Đề bài rút gọn đính kèm trong answer history (không phải DTO đầy đủ của câu hỏi). */
export interface AnswerHistorySpeakingQuestion {
    id: number;
    japaneseName: string;
    japaneseNameMarkup: string | null;
    vietnameseName: string | null;
    description: string | null;
    descriptionMarkup: string | null;
    japaneseSampleAnswer: string | null;
    japaneseSampleAnswerMarkup: string | null;
    vietnameseSampleAnswer: string | null;
}

export interface AnswerHistoryAudioFile {
    id: number;
    /** Đã là presigned URL phát được trực tiếp, không cần gọi thêm endpoint nào khác. */
    accessUrl: string | null;
    originalFileName: string | null;
    contentType: string | null;
}

/**
 * Chi tiết một lượt luyện nói — response CHUNG cho cả POST /speaking/analysis
 * (vừa nộp bài) lẫn GET /answer-histories/{id} (xem lại lịch sử). overallScore
 * thang 0-10 (so với PASS_SCORE để biết đạt/chưa đạt).
 */
export interface AnswerHistoryResponse {
    id: number;
    userId: number;
    speakingQuestion: AnswerHistorySpeakingQuestion;
    speechAssessment: SpeechAssessmentResponse;
    aiFeedback: AiFeedbackResponse;
    audioFile: AnswerHistoryAudioFile | null;
    duration: number | null;
    overallScore: number | null;
    createdTime: string | null;
    modifiedTime: string | null;
}

/** Một dòng trong danh sách lịch sử luyện nói theo câu hỏi (GET /answer-histories/speaking-question/{id}). */
export interface AnswerHistoryListItemResponse {
    id: number;
    userId: number;
    speakingQuestion: AnswerHistorySpeakingQuestion;
    audioFile: AnswerHistoryAudioFile | null;
    duration: number | null;
    overallScore: number | null;
    createdTime: string | null;
    modifiedTime: string | null;
}

