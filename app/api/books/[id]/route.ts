import {NextRequest} from "next/server";
import {proxyGet} from "@/services/server/backend.proxy";

/** Lớp 1: /api/books/[id] → BE /books/{id} (chi tiết 1 quyển sách). */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyGet(`/books/${id}`);
}
