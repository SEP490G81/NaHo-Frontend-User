import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/** Danh sách thông báo của user (limit/offset). */
export async function GET(req: NextRequest) {
    return proxyGet("/notifications", req.nextUrl.searchParams);
}
