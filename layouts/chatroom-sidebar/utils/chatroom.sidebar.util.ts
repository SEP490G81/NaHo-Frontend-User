export const isChatroomActive = (
    currentPathname: string,
    sessionCode: string,
): boolean => {
    return (
        currentPathname === `/live-chatroom/${sessionCode}` ||
        currentPathname.startsWith(`/live-chatroom/${sessionCode}/`)
    );
};

export const truncateChatTitle = (
    title: string,
    maxLength: number = 22,
): string => {
    if (!title) return "";
    return title.length > maxLength
        ? `${title.slice(0, maxLength).trim()}...`
        : title;
};

export const formatVietnamDateTime = (dateStr?: string | null): string => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";

    return date.toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
};
