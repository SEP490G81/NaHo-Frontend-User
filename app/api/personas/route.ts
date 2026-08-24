import {proxyGet} from "@/services/server/backend.proxy";

/** Lớp 1: /api/personas → BE /personas (danh sách persona AI 1:1). */
export async function GET() {
    return proxyGet("/personas");
}
