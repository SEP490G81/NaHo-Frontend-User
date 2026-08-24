import {NextRequest} from "next/server";
import {proxyGet} from "@/services/server/backend.proxy";

/**
 * Lớp 1: GET /api/speaking/session/in-progress/all → BE /speaking/session/in-progress/all
 * Lấy danh sách các phiên hội thoại AI 1:1 đang diễn ra (IN_PROGRESS) của user.
 */
export async function GET(_req: NextRequest) {
    return proxyGet("/speaking/session/in-progress/all");
}
