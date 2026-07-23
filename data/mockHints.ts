/** Kiểu gợi ý (từ vựng + mẫu câu) dùng chung cho sandbox. */
export interface VocabHint {
    jp: string;
    furigana: string;
    vi: string;
}
export interface StructureHint {
    jp: string;
    vi: string;
}
export interface QuestionHints {
    vocab: VocabHint[];
    structures: StructureHint[];
}
