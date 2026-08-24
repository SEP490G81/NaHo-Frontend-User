import {NextRequest} from "next/server";
import {proxyGet} from "@/services/server/backend.proxy";

/**
 * Lớp 1: /api/speaking/session/history/[code] → BE /speaking/session/history/{sessionCode}
 * Chi tiết đầy đủ 1 phiên AI 1:1 (báo cáo + transcript).
 */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ code: string }> },
) {
    const { code } = await params;
    return proxyGet(`/speaking/session/history/${code}`);
}
