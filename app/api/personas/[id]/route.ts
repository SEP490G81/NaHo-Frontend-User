import { proxyGet } from "@/services/server/backend.proxy";

/** Lớp 1: /api/personas/[id] → BE /personas/[id] (lấy chi tiết persona AI 1:1 theo id). */
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyGet(`/personas/${id}`);
}
