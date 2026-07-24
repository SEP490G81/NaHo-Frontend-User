/** Kiểu một bản ghi lịch sử luyện (dùng chung cho luồng câu hỏi tự tạo). */
export interface QuestionHistoryEntry {
    historyId: string;
    topicId: string;
    questionId: string;
    /** ISO date string */
    practicedAt: string;
    durationSec: number;
    /** Score 0–10 */
    score: number;
    customJp?: string;
    customHintVi?: string;
}
