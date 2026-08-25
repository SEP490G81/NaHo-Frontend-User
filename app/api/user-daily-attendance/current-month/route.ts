import { proxyGet } from "@/services/server/backend.proxy";

export async function GET() {
    return proxyGet("/user-daily-attendances/all/current-month");
}
