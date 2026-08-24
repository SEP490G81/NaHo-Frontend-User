import { NextRequest } from "next/server";
import { proxyPostJson } from "@/services/server/backend.proxy";

/**
 * Lớp 1: POST /api/speaking/session/init/[id] → BE /speaking/session/init/{sessionCode}
 * Khởi tạo câu chào đầu tiên của phiên hội thoại AI 1:1.
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyPostJson(`/speaking/session/init/${id}`, req);
}
