import { NextRequest } from "next/server";
import { proxyDelete, proxyPostJson } from "@/services/server/backend.proxy";

/**
 * Lớp 1: /api/speaking/session/[id] → BE /speaking/session/persona/{personaId}
 * Bắt đầu hội thoại AI 1:1 (trả sessionCode + câu chào + audio).
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyPostJson(`/speaking/session/persona/${id}`, req);
}

/**
 * Lớp 1: DELETE /api/speaking/session/[id] → BE DELETE /speaking/session/{sessionCode}
 * Xóa một phiên hội thoại đang dở (204 No Content).
 */
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyDelete(`/speaking/session/${id}`);
}

