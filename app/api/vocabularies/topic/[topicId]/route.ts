import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/** Lớp 1: /api/vocabularies/topic/[topicId] → BE /vocabularies/topic/{topicId}
 *  (toàn bộ từ vựng của một chủ đề). */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ topicId: string }> },
) {
    const { topicId } = await params;
    return proxyGet(`/vocabularies/topic/${topicId}`);
}
