import { NextRequest } from "next/server";
import { proxyPostJson } from "@/services/server/backend.proxy";

/**
 * Lớp 1: /api/speaking/session/[id]/resume → BE /speaking/session/{sessionCode}/resume
 * Khôi phục một phiên AI 1:1 đang dở (id ở đây là sessionCode).
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyPostJson(`/speaking/session/${id}/resume`, req);
}
