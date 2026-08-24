import {NextRequest} from "next/server";
import {proxyPostJson} from "@/services/server/backend.proxy";

/**
 * Lớp 1: POST /api/speaking/session/message/[id] → BE /speaking/session/message/{sessionCode}
 * Gửi tin nhắn dạng văn bản (transcript) trong phiên hội thoại AI 1:1.
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyPostJson(`/speaking/session/message/${id}`, req);
}
