import { proxyPostJson } from "@/services/server/backend.proxy";

/** Nhận phần thưởng điểm danh hàng ngày. */
export async function POST(request: Request) {
    return proxyPostJson("/daily-rewards", request);
}
