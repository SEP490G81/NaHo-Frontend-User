"use client";

import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/use.current.user";
import { normalizeNotification } from "@/services/client/notification.service";
import type { NotificationResponse, RawNotificationResponse } from "@/types/responses/notification.response";
import {
    NOTIFICATION_QUERY_KEYS,
    NOTIFICATION_STREAM_EVENT,
    NOTIFICATION_STREAM_RETRY_DELAY,
    NOTIFICATION_STREAM_URL
} from "@/layouts/protected-header/constants/notification.constant";

/** BE có thể đẩy object JSON hoặc chuỗi JSON đã bọc thêm một lớp nháy. */
function parseNotification(data: string): NotificationResponse | null {
    try {
        const parsed: unknown = JSON.parse(data);
        const raw = (
            typeof parsed === "string" ? JSON.parse(parsed) : parsed
        ) as RawNotificationResponse;
        return typeof raw?.id === "number" ? normalizeNotification(raw) : null;
    } catch {
        return null;
    }
}

/**
 * Nối chuông với luồng SSE /notifications/stream (event NOTIFICATION): đẩy ngay
 * thông báo mới vào cache để badge và danh sách cập nhật realtime, rồi invalidate
 * badge để lấy con số chuẩn từ BE. Tự kết nối lại khi luồng rớt.
 *
 * Trả thêm cờ `hasNewNotification` để chuông rung một nhịp báo hiệu — chỉ đổi
 * con số trên badge thì người đang đọc giữa màn hình rất khó nhận ra.
 */
export function useNotificationStream() {
    const { data: user } = useCurrentUser();
    const qc = useQueryClient();
    const [hasNewNotification, setHasNewNotification] = useState(false);
    // Chỉ phụ thuộc vào id: refetch current-user tạo object mới, nếu deps là cả
    // object thì luồng SSE bị đóng/mở lại vô cớ.
    const userId = user?.id;

    useEffect(() => {
        if (!userId) return;

        let source: EventSource | null = null;
        let retryId: ReturnType<typeof setTimeout> | undefined;
        let isMounted = true;

        const onNotification = (event: Event) => {
            const incoming = parseNotification(
                (event as MessageEvent<string>).data ?? "",
            );
            if (!incoming) {
                qc.invalidateQueries({
                    queryKey: NOTIFICATION_QUERY_KEYS.unread,
                });
                qc.invalidateQueries({
                    queryKey: NOTIFICATION_QUERY_KEYS.list,
                });
                return;
            }

            qc.setQueryData<NotificationResponse[]>(
                NOTIFICATION_QUERY_KEYS.list,
                (old) => {
                    const items = old ?? [];
                    return items.some((item) => item.id === incoming.id)
                        ? items
                        : [incoming, ...items];
                },
            );
            if (!incoming.isRead) {
                qc.setQueryData<number>(
                    NOTIFICATION_QUERY_KEYS.unread,
                    (old) => (old ?? 0) + 1,
                );
                setHasNewNotification(true);
            }
            qc.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.unread });
        };

        const connect = () => {
            if (!isMounted) return;
            source = new EventSource(NOTIFICATION_STREAM_URL);
            source.addEventListener(NOTIFICATION_STREAM_EVENT, onNotification);
            source.onerror = () => {
                source?.close();
                source = null;
                retryId = setTimeout(connect, NOTIFICATION_STREAM_RETRY_DELAY);
            };
        };

        // TODO: Uncomment `connect()` when Backend `NotificationSseController.java` is enabled.
        // Currently disabled to avoid continuous 500 retry errors on missing Backend endpoint /api/v1/notifications/stream.
        // connect();

        return () => {
            isMounted = false;
            clearTimeout(retryId);
            source?.close();
        };
    }, [userId, qc]);

    // Tắt cờ khi animation chạy xong (keyframe naho-bell-ring chạy đúng 1 lượt)
    // thay vì hẹn giờ, để lần rung sau luôn khớp với lần event kế tiếp.
    const clearNewNotification = useCallback(
        () => setHasNewNotification(false),
        [],
    );

    return { hasNewNotification, clearNewNotification };
}
