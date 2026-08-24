import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/**
 * Lớp 1: GET /api/speaking/session/details/[id] → BE /speaking/session/details/{sessionCode}
 * Lấy chi tiết phiên hội thoại AI 1:1 đang diễn ra.
 */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyGet(`/speaking/session/details/${id}`);
}
