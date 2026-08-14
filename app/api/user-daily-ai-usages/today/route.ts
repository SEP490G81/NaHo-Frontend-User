import { proxyGet } from "@/services/server/backend.proxy";

/** Lớp 1: /api/user-daily-ai-usages/today → BE /user-daily-ai-usages/today. */
export async function GET() {
    return proxyGet("/user-daily-ai-usages/today");
}
