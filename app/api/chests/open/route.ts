import { proxyPostJson } from "@/services/server/backend.proxy";

/** Mở rương thưởng: forward { chestId, userId } lên BE (cộng L-Point thật). */
export async function POST(request: Request) {
    return proxyPostJson("/chests/open", request);
}
