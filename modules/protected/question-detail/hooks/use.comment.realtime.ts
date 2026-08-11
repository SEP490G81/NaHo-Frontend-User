"use client";
import { useEffect, useRef } from "react";
import { Client, type StompSubscription } from "@stomp/stompjs";

/**
 * Realtime comment/reaction qua STOMP (WebSocket) tới BE:
 *  - `/topic/comments`      → có ai tạo / sửa / xoá bình luận
 *  - `/topic/reaction/{id}` → có ai thả cảm xúc cho từng bình luận
 * Mỗi event → gọi `onEvent` (thường là refetch danh sách comment).
 *
 * Giữ MỘT kết nối bền: chỉ thêm/bớt subscribe reaction khi danh sách id đổi,
 * KHÔNG dựng lại cả client mỗi lần có bình luận mới (tránh rớt event lúc reconnect).
 * Tự TẮT nếu chưa cấu hình `NEXT_PUBLIC_WS_URL` — app vẫn chạy bình thường qua
 * REST. Mọi lỗi kết nối được nuốt để không ảnh hưởng trải nghiệm.
 */
export function useCommentRealtime(commentIds: number[], onEvent: () => void) {
    const onEventRef = useRef(onEvent);
    const clientRef = useRef<Client | null>(null);
    const reactionSubs = useRef<Map<number, StompSubscription>>(new Map());
    const idsRef = useRef<number[]>([]);
    const idsKey = commentIds.join(",");

    useEffect(() => {
        onEventRef.current = onEvent;
    }, [onEvent]);

    useEffect(() => {
        idsRef.current = idsKey ? idsKey.split(",").map(Number) : [];
    }, [idsKey]);

    // Kết nối một lần + subscribe /topic/comments; sau mỗi lần (re)connect thì
    // subscribe lại toàn bộ reaction topic đang có.
    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_WS_URL;
        if (!url) return;

        const subs = reactionSubs.current;
        const fire = () => onEventRef.current();
        const client = new Client({
            brokerURL: url,
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe("/topic/comments", fire);
                subs.clear();
                idsRef.current.forEach((id) =>
                    subs.set(
                        id,
                        client.subscribe(`/topic/reaction/${id}`, fire),
                    ),
                );
            },
            onStompError: () => {},
            onWebSocketError: () => {},
        });

        clientRef.current = client;
        client.activate();
        return () => {
            subs.clear();
            clientRef.current = null;
            void client.deactivate();
        };
    }, []);

    // Thêm subscribe cho comment mới, bỏ subscribe cho comment đã mất — dùng lại
    // kết nối sẵn có, không ngắt.
    useEffect(() => {
        const client = clientRef.current;
        if (!client || !client.connected) return;

        const fire = () => onEventRef.current();
        const ids = new Set(idsRef.current);
        ids.forEach((id) => {
            if (!reactionSubs.current.has(id)) {
                reactionSubs.current.set(
                    id,
                    client.subscribe(`/topic/reaction/${id}`, fire),
                );
            }
        });
        reactionSubs.current.forEach((sub, id) => {
            if (!ids.has(id)) {
                sub.unsubscribe();
                reactionSubs.current.delete(id);
            }
        });
    }, [idsKey]);
}
