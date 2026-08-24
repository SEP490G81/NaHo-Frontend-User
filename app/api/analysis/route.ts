import {NextRequest} from "next/server";
import {proxyPostForm} from "@/services/server/backend.proxy";

/** Lớp 1: /api/analysis → BE /analysis (upload ghi âm + chấm điểm phát âm). */
export async function POST(req: NextRequest) {
    return proxyPostForm("/speaking/analysis", req);
}
