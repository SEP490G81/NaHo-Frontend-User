import { NextRequest } from "next/server";
import { proxyPostJson } from "@/services/server/backend.proxy";

/**
 * Lớp 1: /api/speaking/session/history → BE /speaking/session/history
 * Danh sách phiên AI 1:1 của user (phân trang + lọc, body JSON).
 */
export async function POST(req: NextRequest) {
    return proxyPostJson("/speaking/session/history", req);
}
