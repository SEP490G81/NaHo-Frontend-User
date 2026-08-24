import {NextRequest} from "next/server";
import {proxyGet, proxyPostJson} from "@/services/server/backend.proxy";

/**
 * Lớp 1: GET /api/speaking/session/end/[id] → BE GET /speaking/session/end/{sessionCode}
 * Kết thúc và nhận kết quả chấm điểm phiên hội thoại AI 1:1.
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyGet(`/speaking/session/end/${id}`);
}

/**
 * Lớp 1: POST /api/speaking/session/end/[id] → BE POST /speaking/session/end/{sessionCode}
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyPostJson(`/speaking/session/end/${id}`, req);
}
