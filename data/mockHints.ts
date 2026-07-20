/** Kiểu gợi ý (từ vựng + mẫu câu) dùng chung cho sandbox & câu hỏi tự tạo. */
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

/** Gợi ý mặc định cho luồng câu hỏi tự tạo (chưa có gợi ý riêng). */
export const DEFAULT_HINTS: QuestionHints = {
    vocab: [
        { jp: "すみません", furigana: "すみません", vi: "Xin lỗi / Cảm phiền" },
        { jp: "お願いします", furigana: "おねがいします", vi: "Xin nhờ / Làm ơn" },
        { jp: "ありがとうございます", furigana: "ありがとうございます", vi: "Cảm ơn" },
    ],
    structures: [
        { jp: "〜ていただけますか？", vi: "Lịch sự nhờ ai đó làm gì." },
        { jp: "〜たいと思います。", vi: "Tôi muốn / dự định làm gì." },
    ],
};
