import { proxyPostJson } from "@/services/server/backend.proxy";

/** Route handler proxy cho API đổi mật khẩu /auth/change-password */
export async function POST(request: Request) {
    return proxyPostJson("/auth/change-password", request);
}
