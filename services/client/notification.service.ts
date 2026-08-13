import { ApiResponse } from "@/types/responses/base.response";
import { NotificationResponse } from "@/types/responses/notification.response";

function unwrap<T>(result: unknown, fallback: T): T {
    const r = result as ApiResponse<T> & T;
    return (r?.data ?? r ?? fallback) as T;
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
    return unwrap<NotificationResponse[]>(await res.json(), []);
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

/** Đánh dấu 1 thông báo đã đọc. */
export async function markNotificationRead(id: number): Promise<void> {
    await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
}

/** Đánh dấu tất cả đã đọc. */
export async function markAllNotificationsRead(): Promise<void> {
    await fetch("/api/notifications/read-all", { method: "PATCH" });
}
