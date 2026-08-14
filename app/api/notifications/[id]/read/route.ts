import { NextRequest } from "next/server";
import { proxyBodyJson } from "@/services/server/backend.proxy";

/** Đánh dấu 1 thông báo là đã đọc. */
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    return proxyBodyJson("PATCH", `/notifications/${id}/read`, req);
}
