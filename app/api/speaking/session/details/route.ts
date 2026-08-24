import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/**
 * Lớp 1: GET /api/speaking/session/details?sessionCode={sessionCode}&status={status}
 * → BE GET /speaking/session/details?sessionCode={sessionCode}&status={status}
 */
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    return proxyGet("/speaking/session/details", searchParams);
}
