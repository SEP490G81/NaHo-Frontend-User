import { proxyGet } from "@/services/server/backend.proxy";

/** Lớp 1: /api/books → BE /books (danh sách sách). */
export function GET() {
    return proxyGet("/books");
}
