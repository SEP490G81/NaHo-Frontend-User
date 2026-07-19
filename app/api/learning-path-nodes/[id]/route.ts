import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/** Lớp 1: /api/learning-path-nodes/[id] → BE /learning-path-nodes/{id}
 *  (chi tiết 1 node: từ vựng / câu hỏi + vocab + grammar / rương). */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyGet(`/learning-path-nodes/${id}`);
}
