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
    /** Style hội thoại mặc định của persona (conversation_styles.id). */
    suggestedConversationStyleId?: number | null;
}

export type AiChatMessage = {
    id: string;
    role: "ai";
    /** Câu tiếng Nhật của AI (greeting hoặc reply). */
    text: string;
    /** WAV base64 (chỉ có ở câu chào — BE chưa trả TTS cho reply). */
    audioBase64?: string;
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
    timestamp: string;
};

export type ChatMessage = AiChatMessage | UserChatMessage;
