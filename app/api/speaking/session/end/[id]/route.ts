import { NextRequest } from "next/server";
import { proxyPostJson } from "@/services/server/backend.proxy";

/**
 * Lớp 1: POST /api/speaking/session/end/[id] → BE /speaking/session/end/{sessionCode}
 * Kết thúc và chấm điểm phiên hội thoại AI 1:1.
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyPostJson(`/speaking/session/end/${id}`, req);
}
