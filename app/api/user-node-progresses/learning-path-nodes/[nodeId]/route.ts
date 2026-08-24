import {NextRequest} from "next/server";
import {proxyGet} from "@/services/server/backend.proxy";

/** Lớp 1: tiến độ THẬT của user tại 1 node (best-score, status, số lần thử) từ BE
 *  → dùng để hiển thị điểm cao nhất/đạt-chưa thay vì điểm cục bộ. */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ nodeId: string }> },
) {
    const { nodeId } = await params;
    return proxyGet(`/user-node-progresses/learning-path-nodes/${nodeId}`);
}
