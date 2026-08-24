import { NextRequest } from "next/server";
import { proxyPostJson } from "@/services/server/backend.proxy";

/**
 * Lớp 1: POST /api/speaking/session/message → BE /speaking/session/message
 * Gửi tin nhắn dạng văn bản (ChatSessionMessageRequest).
 */
export async function POST(req: NextRequest) {
    return proxyPostJson("/speaking/session/message", req);
}
