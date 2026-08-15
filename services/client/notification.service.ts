import { ApiResponse } from "@/types/responses/base.response";
import {
    NotificationResponse,
    RawNotificationResponse,
} from "@/types/responses/notification.response";

function unwrap<T>(result: unknown, fallback: T): T {
    const r = result as ApiResponse<T> & T;
    return (r?.data ?? r ?? fallback) as T;
}

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
    const res = await fetch(
        `/api/notifications?limit=${limit}&offset=${offset}`,
        { cache: "no-store" },
    );
    if (!res.ok) return [];
    const raw = unwrap<RawNotificationResponse[]>(await res.json(), []);
    return Array.isArray(raw) ? raw.map(normalizeNotification) : [];
}

/** Số thông báo chưa đọc (badge). */
export async function getUnreadCount(): Promise<number> {
    const res = await fetch("/api/notifications/unread-count", {
        cache: "no-store",
    });
    if (!res.ok) return 0;
    const val = unwrap<number>(await res.json(), 0);
    return typeof val === "number" ? val : 0;
}

/** Đánh dấu 1 thông báo đã đọc. Ném lỗi để mutation rollback optimistic update. */
export async function markNotificationRead(id: number): Promise<void> {
    const res = await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
    });
    if (!res.ok) throw new Error("MARK_NOTIFICATION_READ_FAILED");
}

/** Đánh dấu tất cả đã đọc. Ném lỗi để mutation rollback optimistic update. */
export async function markAllNotificationsRead(): Promise<void> {
    const res = await fetch("/api/notifications/read-all", { method: "PATCH" });
    if (!res.ok) throw new Error("MARK_ALL_NOTIFICATIONS_READ_FAILED");
}
