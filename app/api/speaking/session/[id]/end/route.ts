import { NextRequest } from "next/server";
import { proxyPostJson } from "@/services/server/backend.proxy";

/**
 * Lớp 1: /api/speaking/session/[id]/end → BE /speaking/session/{sessionId}/end
 * Kết thúc phiên → báo cáo chấm điểm cả buổi luyện.
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyPostJson(`/speaking/session/${id}/end`, req);
}
