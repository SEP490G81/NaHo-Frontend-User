/** Loại thông báo (đồng bộ enum NotificationType phía BE). */
export type NotificationType = "SOCIAL" | "REPORT" | "SYSTEM" | string;

/** Một thông báo (GET /notifications). */
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
