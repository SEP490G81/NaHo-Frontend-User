import { proxyGet } from "@/services/server/backend.proxy";

/** Số lượt AI đã dùng hôm nay của user (để hiển thị "còn X lượt chấm"). */
export async function GET() {
    return proxyGet("/user-daily-ai-usages/today");
}
