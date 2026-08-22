import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/** Lớp 1: /api/history/[historyId] → BE /answer-histories/{historyId} (chi tiết 1 lượt luyện nói). */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ historyId: string }> },
) {
    const { historyId } = await params;
    return proxyGet(`/answer-histories/${historyId}`);
}
