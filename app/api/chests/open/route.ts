import { proxyPostJson } from "@/services/server/backend.proxy";

/** Mở rương thưởng: forward { learningPathNodeId } lên BE (userId lấy từ token). */
export async function POST(request: Request) {
    return proxyPostJson("/chests/open", request);
}
