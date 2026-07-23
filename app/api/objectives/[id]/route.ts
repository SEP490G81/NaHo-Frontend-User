import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/** Lớp 1: /api/objectives/[id] → BE /objectives/{id} (chi tiết Can-do kèm câu hỏi). */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyGet(`/objectives/${id}`);
}
