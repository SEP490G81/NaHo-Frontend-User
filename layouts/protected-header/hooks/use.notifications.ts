"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getNotifications,
    getUnreadCount,
    markAllNotificationsRead,
    markNotificationRead,
} from "@/services/client/notification.service";
import type { NotificationResponse } from "@/types/responses/notification.response";
import {
    NOTIFICATION_PAGE_SIZE,
    NOTIFICATION_POLL_INTERVAL,
    NOTIFICATION_QUERY_KEYS,
} from "@/layouts/protected-header/constants/notification.constant";

type NotificationCacheSnapshot = {
    list?: NotificationResponse[];
    unread?: number;
};

/**
 * Nguồn dữ liệu cho chuông thông báo: badge chưa đọc + danh sách trong popover.
 * Mọi thao tác đánh dấu đã đọc ghi thẳng vào cache trước (optimistic) để chấm
 * "chưa đọc" tắt ngay, sau đó mới invalidate để lấy số liệu chuẩn từ BE.
 */
export function useNotifications(open: boolean) {
    const qc = useQueryClient();

    const unreadQuery = useQuery({
        queryKey: NOTIFICATION_QUERY_KEYS.unread,
        queryFn: getUnreadCount,
        refetchInterval: NOTIFICATION_POLL_INTERVAL,
        staleTime: 30000,
    });

    const listQuery = useQuery({
        queryKey: NOTIFICATION_QUERY_KEYS.list,
        queryFn: () => getNotifications(NOTIFICATION_PAGE_SIZE, 0),
        enabled: open,
    });

    const takeSnapshot = async (): Promise<NotificationCacheSnapshot> => {
        await Promise.all([
            qc.cancelQueries({ queryKey: NOTIFICATION_QUERY_KEYS.list }),
            qc.cancelQueries({ queryKey: NOTIFICATION_QUERY_KEYS.unread }),
        ]);
        return {
            list: qc.getQueryData<NotificationResponse[]>(
                NOTIFICATION_QUERY_KEYS.list,
            ),
            unread: qc.getQueryData<number>(NOTIFICATION_QUERY_KEYS.unread),
        };
    };

    // Cache rỗng từ trước thì setQueryData(undefined) là no-op nên không khôi
    // phục được — không sao, onSettled luôn invalidate nên BE nói lời cuối.
    const restoreSnapshot = (snapshot?: NotificationCacheSnapshot) => {
        if (!snapshot) return;
        qc.setQueryData(NOTIFICATION_QUERY_KEYS.list, snapshot.list);
        qc.setQueryData(NOTIFICATION_QUERY_KEYS.unread, snapshot.unread);
    };

    const syncWithServer = () => {
        qc.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.unread });
        qc.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.list });
    };

    const markRead = useMutation({
        mutationFn: (id: number) => markNotificationRead(id),
        onMutate: async (id) => {
            const snapshot = await takeSnapshot();
            const wasUnread = snapshot.list?.some(
                (item) => item.id === id && !item.isRead,
            );
            qc.setQueryData<NotificationResponse[]>(
                NOTIFICATION_QUERY_KEYS.list,
                (old) =>
                    (old ?? []).map((item) =>
                        item.id === id ? { ...item, isRead: true } : item,
                    ),
            );
            if (wasUnread) {
                qc.setQueryData<number>(NOTIFICATION_QUERY_KEYS.unread, (old) =>
                    Math.max((old ?? 1) - 1, 0),
                );
            }
            return snapshot;
        },
        onError: (_error, _id, snapshot) => restoreSnapshot(snapshot),
        onSettled: syncWithServer,
    });

    const markAllRead = useMutation({
        mutationFn: markAllNotificationsRead,
        onMutate: async () => {
            const snapshot = await takeSnapshot();
            qc.setQueryData<NotificationResponse[]>(
                NOTIFICATION_QUERY_KEYS.list,
                (old) => (old ?? []).map((item) => ({ ...item, isRead: true })),
            );
            qc.setQueryData<number>(NOTIFICATION_QUERY_KEYS.unread, 0);
            return snapshot;
        },
        onError: (_error, _variables, snapshot) => restoreSnapshot(snapshot),
        onSettled: syncWithServer,
    });

    return {
        items: listQuery.data ?? [],
        unreadCount: unreadQuery.data ?? 0,
        isLoading: listQuery.isLoading,
        markRead,
        markAllRead,
    };
}
