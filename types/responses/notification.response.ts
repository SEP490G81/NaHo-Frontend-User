/** Loại thông báo (đồng bộ enum NotificationType phía BE). */
export type NotificationType = "SOCIAL" | "REPORT" | "SYSTEM" | string;

/** Một thông báo (GET /notifications) sau khi đã chuẩn hoá cho UI. */
export interface NotificationResponse {
    id: number;
    type: NotificationType;
    title: string;
    content: string;
    isRead: boolean;
    targetUrl: string | null;
    metadata?: unknown;
    createdTime: string;
}

/**
 * Payload thô của BE. Jackson đổi tên field boolean `isRead` thành `read` khi
 * serialize, nên tuỳ cấu hình mà cờ đã đọc về dưới tên nào — phải chuẩn hoá
 * trước khi dùng, không thì UI luôn coi mọi thông báo là chưa đọc.
 */
export type RawNotificationResponse = Omit<NotificationResponse, "isRead"> & {
    isRead?: boolean;
    read?: boolean;
};
