import { proxyPostJson } from "@/services/server/backend.proxy";

/** Lịch sử nhận điểm của người dùng (userId lấy từ token ở BE). */
export async function POST(request: Request) {
    return proxyPostJson("/point-history/all", request);
}
