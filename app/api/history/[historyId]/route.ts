import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/** Lớp 1: /api/history/[historyId] → BE /speaking-histories/{historyId} (chi tiết). */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ historyId: string }> },
) {
    const { historyId } = await params;
    return proxyGet(`/answer-histories/${historyId}/speaking-question`);
}
