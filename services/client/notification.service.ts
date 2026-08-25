import {
    NotificationResponse,
    RawNotificationResponse,
} from "@/types/responses/notification.response";
import { clientFetch, clientFetchJson } from "./client.fetch";

/**
 * Chuẩn hoá 1 thông báo từ BE. Cờ đã đọc có thể về dưới tên `isRead` hoặc `read`
 * (Jackson đổi tên field boolean), nếu không map thì chấm "chưa đọc" trên UI
 * không bao giờ tắt dù đã gọi mark-read thành công.
 */
export function normalizeNotification(
    raw: RawNotificationResponse,
): NotificationResponse {
    return {
        id: raw.id,
        type: raw.type,
        title: raw.title,
        content: raw.content,
        isRead: raw.isRead ?? raw.read ?? false,
        targetUrl: raw.targetUrl ?? null,
        metadata: raw.metadata,
        createdTime: raw.createdTime,
    };
}

/** Danh sách thông báo (mới nhất trước). */
export async function getNotifications(
    limit = 15,
    offset = 0,
): Promise<NotificationResponse[]> {
    try {
        const raw = await clientFetchJson<RawNotificationResponse[]>(
            `/api/notifications?limit=${limit}&offset=${offset}`,
            { cache: "no-store" },
        );
        return Array.isArray(raw) ? raw.map(normalizeNotification) : [];
    } catch {
        return [];
    }
}

/** Số thông báo chưa đọc (badge). */
export async function getUnreadCount(): Promise<number> {
    try {
        const val = await clientFetchJson<number>(
            "/api/notifications/unread-count",
            { cache: "no-store" },
        );
        return typeof val === "number" ? val : 0;
    } catch {
        return 0;
    }
}

/** Đánh dấu 1 thông báo đã đọc. Ném lỗi để mutation rollback optimistic update. */
export async function markNotificationRead(id: number): Promise<void> {
    const res = await clientFetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
    });
    if (!res.ok) throw new Error("MARK_NOTIFICATION_READ_FAILED");
}

/** Đánh dấu tất cả đã đọc. Ném lỗi để mutation rollback optimistic update. */
export async function markAllNotificationsRead(): Promise<void> {
    const res = await clientFetch("/api/notifications/read-all", {
        method: "PATCH",
    });
    if (!res.ok) throw new Error("MARK_ALL_NOTIFICATIONS_READ_FAILED");
}
