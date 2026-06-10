export interface PronunciationWordInfo {
    word: string;
    score: number; // 0..100
    feedback: string;
}

export interface ExpressionSuggestion {
    jp: string;
    furigana: string;
    vi: string;
    note: string;
}
