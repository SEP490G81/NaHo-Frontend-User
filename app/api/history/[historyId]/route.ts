import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/** Lớp 1: /api/history/[historyId] → BE /history/{historyId} (chi tiết báo cáo). */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ historyId: string }> },
) {
    const { historyId } = await params;
    return proxyGet(`/history/${historyId}`);
}
