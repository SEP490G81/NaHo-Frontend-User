/** Query key dùng chung cho badge chưa đọc và danh sách trong popover chuông. */
export const NOTIFICATION_QUERY_KEYS = {
    unread: ["notifications-unread"] as const,
    list: ["notifications-list"] as const,
};

/** Số thông báo nạp mỗi lần mở popover. */
export const NOTIFICATION_PAGE_SIZE = 15;

/** Poll dự phòng cho badge khi luồng SSE rớt (ms). */
export const NOTIFICATION_POLL_INTERVAL = 60000;

/** Endpoint SSE (proxy qua route handler của Next) và tên event BE đẩy về. */
export const NOTIFICATION_STREAM_URL = "/api/notifications/stream";
export const NOTIFICATION_STREAM_EVENT = "NOTIFICATION";

/** Thời gian chờ trước khi thử kết nối lại luồng SSE (ms). */
export const NOTIFICATION_STREAM_RETRY_DELAY = 5000;
