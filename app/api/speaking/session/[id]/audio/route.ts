import { NextRequest } from "next/server";
import { proxyPostForm } from "@/services/server/backend.proxy";

/**
 * Lớp 1: /api/speaking/session/[id]/audio → BE /speaking/session/{sessionCode}/audio
 * Gửi bản ghi âm (multipart) → STT + điểm phát âm + reply của AI.
 */
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const search = req.nextUrl.searchParams;
    const query = search.toString();
    return proxyPostForm(
        `/speaking/session/${id}/audio${query ? `?${query}` : ""}`,
        req,
    );
}
