import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/**
 * Lớp 1: /api/speaking/session/active → BE /speaking/session/active
 * Lấy phiên AI 1:1 đang dở của user (lọc theo personaId nếu có).
 */
export async function GET(req: NextRequest) {
    const personaId = req.nextUrl.searchParams.get("personaId");
    const search = new URLSearchParams();
    if (personaId) search.set("personaId", personaId);
    return proxyGet("/speaking/session/active", search);
}
