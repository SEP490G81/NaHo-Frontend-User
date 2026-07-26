import { NextRequest } from "next/server";
import { proxyPostJson } from "@/services/server/backend.proxy";

/**
 * Lớp 1: /api/speaking/session/[id] → BE /speaking/session/{personaId}
 * Bắt đầu hội thoại AI 1:1 (không body, trả sessionId + câu chào + audio).
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyPostJson(`/speaking/session/${id}`, req);
}
