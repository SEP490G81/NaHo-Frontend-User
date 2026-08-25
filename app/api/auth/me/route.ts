import { proxyGet } from "@/services/server/backend.proxy";

export async function GET() {
    return proxyGet("/users/me");
}
