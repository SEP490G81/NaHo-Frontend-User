import { NextRequest } from "next/server";
import { proxyStream } from "@/services/server/backend.stream.proxy";

export const dynamic = "force-dynamic";

/** Luồng SSE thông báo realtime của user hiện tại (BE đẩy event NOTIFICATION). */
export async function GET(req: NextRequest) {
    return proxyStream("/notifications/stream", req);
}
