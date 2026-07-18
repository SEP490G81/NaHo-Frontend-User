"use client";

import { useEffect, useRef, useState } from "react";
import { useCommentReactionStore } from "@/store/commentReactionStore";

interface WebSocketMessage {
  type: "NEW_COMMENT" | "TOGGLE_REACTION";
  data: any;
}

/**
 * Custom hook quản lý kết nối WebSocket cho phần bình luận và cảm xúc.
 * Hỗ trợ tự động kết nối lại (Auto-reconnect) với giãn cách tăng dần (exponential backoff).
 * 
 * @param questionId ID của câu hỏi / bài học đang xem thảo luận
 */
export function useCommentReactionSocket(questionId: string | null) {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectDelayRef = useRef<number>(1000); // Bắt đầu kết nối lại sau 1s
  const [isConnected, setIsConnected] = useState(false);

  const receiveComment = useCommentReactionStore((s) => s.receiveComment);
  const receiveToggleReaction = useCommentReactionStore((s) => s.receiveToggleReaction);

  useEffect(() => {
    if (!questionId) return;

    function connect() {
      // Dọn dẹp các timeout kết nối lại trước đó nếu có
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      // Xác định URL WebSocket dựa trên API Base URL của ứng dụng
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
      const wsProtocol = apiBaseUrl.startsWith("https") ? "wss" : "ws";
      const wsHost = apiBaseUrl.replace(/^https?:\/\//, "");
      const wsUrl = `${wsProtocol}://${wsHost}/ws/comments?questionId=${questionId}`;

      console.log(`[WebSocket] Connecting to: ${wsUrl}`);
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log("[WebSocket] Connection established successfully.");
        setIsConnected(true);
        reconnectDelayRef.current = 1000; // Reset lại delay kết nối lại về 1s
      };

      socket.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          console.log("[WebSocket] Received message:", message);

          switch (message.type) {
            case "NEW_COMMENT":
              receiveComment(message.data);
              break;
            case "TOGGLE_REACTION":
              receiveToggleReaction(message.data);
              break;
            default:
              console.warn("[WebSocket] Unknown message type:", message.type);
          }
        } catch (error) {
          console.error("[WebSocket] Failed to parse message:", error);
        }
      };

      socket.onclose = (event) => {
        setIsConnected(false);
        socketRef.current = null;
        
        // Nếu không phải do client chủ động ngắt kết nối thì mới kết nối lại
        if (!event.wasClean) {
          const nextDelay = Math.min(reconnectDelayRef.current * 2, 30000); // Max delay là 30s
          console.warn(`[WebSocket] Connection closed unexpectedly. Reconnecting in ${nextDelay}ms...`);
          reconnectDelayRef.current = nextDelay;

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, nextDelay);
        } else {
          console.log("[WebSocket] Connection closed cleanly.");
        }
      };

      socket.onerror = (error) => {
        console.error("[WebSocket] Connection error:", error);
      };
    }

    connect();

    // Dọn dẹp tài nguyên (cleanup) khi Component unmount hoặc questionId thay đổi
    return () => {
      console.log("[WebSocket] Cleaning up connection...");
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      if (socketRef.current) {
        // Sử dụng mã đóng kết nối 1000 (Normal Closure) để báo hiệu client chủ động ngắt
        socketRef.current.close(1000, "Component unmounted");
        socketRef.current = null;
      }
    };
  }, [questionId, receiveComment, receiveToggleReaction]);

  // Hàm thủ công gửi tin nhắn qua socket nếu cần
  const sendMessage = (type: string, data: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ type, data }));
    } else {
      console.warn("[WebSocket] Cannot send message: Socket is not connected.");
    }
  };

  return { isConnected, sendMessage };
}
