import {NextRequest} from "next/server";
import {proxyPostJson} from "@/services/server/backend.proxy";

/**
 * Lớp 1: POST /api/speaking/session/start → BE POST /speaking/session/start
 * Bắt đầu một phiên hội thoại AI 1:1 với personaId, formalityLevel, marugotoLevel.
 */
export async function POST(req: NextRequest) {
    return proxyPostJson("/speaking/session/start", req);
}
