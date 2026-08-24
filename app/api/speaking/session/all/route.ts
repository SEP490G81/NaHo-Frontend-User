import {NextRequest} from "next/server";
import {proxyGet} from "@/services/server/backend.proxy";

/**
 * Lớp 1: GET /api/speaking/session/all?status=... -> BE GET /speaking/session/all?status=...
 */
export async function GET(req: NextRequest) {
    return proxyGet("/speaking/session/all", req.nextUrl.searchParams);
}
