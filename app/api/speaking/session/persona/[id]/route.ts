import {NextRequest} from "next/server";
import {proxyPostJson} from "@/services/server/backend.proxy";

/**
 * Lớp 1: /api/speaking/session/persona/[id] → BE /speaking/session/persona/{personaId}
 * Bắt đầu hội thoại AI 1:1 (trả sessionCode + câu chào + audio).
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyPostJson(`/speaking/session/persona/${id}`, req);
}
