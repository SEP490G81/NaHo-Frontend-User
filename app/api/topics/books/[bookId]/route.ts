import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/** Lớp 1: /api/topics/books/[bookId] → BE /topics/books/{bookId} (topic của sách). */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ bookId: string }> },
) {
    const { bookId } = await params;
    return proxyGet(`/topics/books/${bookId}`, req.nextUrl.searchParams);
}
