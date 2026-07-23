/** Kiểu dữ liệu báo cáo chi tiết bài luyện (BE map vào qua speaking.mapper). */

export interface TranscriptError {
    type: string;
    explanation: string;
    suggestion: string;
}

export interface TranscriptSegment {
    text: string;
    error?: TranscriptError;
}

export interface PronSegment {
    text: string;
    furigana?: string;
    severity: "ok" | "warn" | "bad";
    note?: string;
}

export interface ExpressionHint {
    jp: string;
    furigana: string;
    vi: string;
    note: string;
}

export interface VocabHint {
    term: string;
    reading: string;
    meaning: string;
}

export interface ReportDetail {
    scores: {
        pronunciation: number;
        vocabulary: number;
        grammar: number;
        naturalness: number;
    };
    average: number;
    userTranscript: TranscriptSegment[];
    aiSuggestion: { jp: string; furigana: string; vi: string };
    pronunciation: PronSegment[];
    pronunciationNote: string;
    expressions: ExpressionHint[];
    itVocab: VocabHint[];
}
