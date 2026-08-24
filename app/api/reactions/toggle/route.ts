import {proxyBodyJson} from "@/services/server/backend.proxy";

/** Thả / đổi / gỡ reaction cho một comment (userId lấy từ token BE). */
export async function POST(request: Request) {
    return proxyBodyJson("POST", "/reactions/toggle", request);
}
