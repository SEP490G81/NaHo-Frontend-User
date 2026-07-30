import {proxyPostJson} from "@/services/server/backend.proxy";

/** Danh sách lịch sử luyện nói (POST /speaking-histories, userId lấy từ token). */
export async function POST(request: Request) {
    return proxyPostJson("/speaking-histories", request);
}
