import { NextRequest } from "next/server";
import { proxyBodyJson } from "@/services/server/backend.proxy";

/** Đánh dấu tất cả thông báo là đã đọc. */
export async function PATCH(req: NextRequest) {
    return proxyBodyJson("PATCH", "/notifications/read-all", req);
}
