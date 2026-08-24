import {CHAT_RESULT_ROUTE_PREFIX, CHAT_SESSION_ROUTE_PREFIX,} from "../constants/chat.sidebar.constant";

/**
 * Format thời gian bắt đầu của session một cách thân thiện.
 */
export function formatSessionTime(dateString: string): string {
    if (!dateString) return "";
    try {
        const date = new Date(dateString);
        if (Number.isNaN(date.getTime())) return dateString;

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${hours}:${minutes} · ${day}/${month}/${year}`;
    } catch {
        return dateString;
    }
}

/**
 * Kiểm tra xem session có đang active trên pathname hiện tại không.
 * Khớp cả trang hội thoại (/live-chatroom/[sessionCode]) lẫn trang kết quả (/chat-result/[sessionCode]).
 */
export function isSessionActive(
    sessionCode: string,
    pathname: string,
): boolean {
    if (!sessionCode || !pathname) return false;
    const sessionPath = `${CHAT_SESSION_ROUTE_PREFIX}/${sessionCode}`;
    const resultPath = `${CHAT_RESULT_ROUTE_PREFIX}/${sessionCode}`;

    return (
        pathname === sessionPath ||
        pathname.startsWith(`${sessionPath}/`) ||
        pathname === resultPath ||
        pathname.startsWith(`${resultPath}/`)
    );
}
