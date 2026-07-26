import { NextRequest } from "next/server";
import { proxyPostJson } from "@/services/server/backend.proxy";

/**
 * Lớp 1: /api/speaking/session/[id]/message → BE /speaking/session/{sessionId}/message
 * Gửi tin nhắn text → reply của AI (không kèm điểm phát âm/audio).
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyPostJson(`/speaking/session/${id}/message`, req);
}
