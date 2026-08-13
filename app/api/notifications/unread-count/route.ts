import { proxyGet } from "@/services/server/backend.proxy";

/** Số thông báo chưa đọc (cho badge trên chuông). */
export async function GET() {
    return proxyGet("/notifications/unread-count");
}
