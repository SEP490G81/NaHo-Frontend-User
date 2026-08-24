export interface GenericSessionMessage {
    senderType?: string | null;
    content?: string | null;
}

/**
 * Lấy câu cuối cùng để hiển thị trên Sidebar:
 * - Ưu tiên câu cuối cùng người dùng nói (senderType = "USER").
 * - Nếu người dùng chưa nói câu nào thì lấy câu cuối cùng AI nói (senderType = "ASSISTANT").
 * - Nếu không có tin nhắn nào thì trả về chuỗi rỗng.
 */
export function getLastSessionMessage(
    messages?:
        | readonly GenericSessionMessage[]
        | GenericSessionMessage[]
        | null,
): string {
    if (!messages || messages.length === 0) return "";

    // Tìm câu cuối của USER từ dưới lên
    for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (msg?.senderType?.toUpperCase().includes("USER") && msg.content) {
            return msg.content;
        }
    }

    // Nếu chưa có câu của USER, tìm câu cuối của ASSISTANT
    for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        if (
            msg?.senderType?.toUpperCase().includes("ASSISTANT") &&
            msg.content
        ) {
            return msg.content;
        }
    }

    return messages[messages.length - 1]?.content || "";
}
