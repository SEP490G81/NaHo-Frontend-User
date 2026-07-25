import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/** Danh sách lịch sử luyện nói của user (userId lấy từ token ở BE). */
export async function GET(request: NextRequest) {
    return proxyGet("/histories", request.nextUrl.searchParams);
}
