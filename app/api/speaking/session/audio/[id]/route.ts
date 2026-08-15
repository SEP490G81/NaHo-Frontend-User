import { NextRequest } from "next/server";
import { proxyPostForm } from "@/services/server/backend.proxy";

/**
 * Lớp 1: POST /api/speaking/session/audio/[id] → BE /speaking/session/audio/{sessionCode}
 * Gửi file ghi âm (multipart/form-data) trong phiên hội thoại AI 1:1.
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const search = req.nextUrl.searchParams;
    const query = search.toString();
    return proxyPostForm(
        `/speaking/session/audio/${id}${query ? `?${query}` : ""}`,
        req,
    );
}
