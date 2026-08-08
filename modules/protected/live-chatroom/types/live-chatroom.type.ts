export interface Companion {
    id: string;
    name: string;
    role: string;
    description: string;
    level: string;
    accent: string; // tailwind bg/text style for avatar tint
    /** Từ khoá khớp tên persona bên BE (GET /personas), so khớp không phân biệt hoa/thường. */
    matchKeyword: string;
    /** ID persona thật sau khi resolve từ API (null nếu chưa map được). */
    personaId?: number | null;
    /** Thể lịch sự mặc định của persona (từ conversationStyle.formalityLevel). */
    defaultFormality?:
        | import("@/types/responses/persona.response").FormalityLevel
        | null;
    /** Cấp độ Marugoto mặc định của persona (từ conversationStyle.marugotoLevel). */
    defaultMarugotoLevel?:
        | import("@/types/responses/persona.response").MarugotoLevel
        | null;
}

export type AiChatMessage = {
    id: string;
    role: "ai";
    /** Câu tiếng Nhật của AI (greeting hoặc reply). */
    text: string;
    /** WAV base64 giọng AI (câu chào + mỗi reply đều có TTS). */
    audioBase64?: string;
    /** Bản dịch tiếng Việt. */
    translation?: string | null;
    /** Giải thích ngữ pháp. */
    grammar?: string | null;
    timestamp: string;
    autoPlay?: boolean;
};

export type UserChatMessage = {
    id: string;
    role: "user";
    /** Nội dung gõ tay hoặc transcript từ STT. */
    text: string;
    /** Điểm phát âm tổng thể (chỉ có khi gửi audio). */
    pronunciationScore?: number | null;
    /** Đề xuất sửa lỗi: câu đã sửa + giải thích. */
    correction?: { correctedText: string; explanation: string } | null;
    timestamp: string;
};

export type ChatMessage = AiChatMessage | UserChatMessage;
