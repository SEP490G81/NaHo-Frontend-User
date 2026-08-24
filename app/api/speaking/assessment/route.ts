import { NextRequest } from "next/server";
import { proxyPostForm } from "@/services/server/backend.proxy";

/** Lớp 1: /api/speaking/assessment → BE /speaking/assessment (chấm phát âm 1 đoạn ghi âm bất kỳ, không gắn với câu hỏi nói cụ thể — dùng cho luyện đọc từ vựng). */
export async function POST(req: NextRequest) {
    return proxyPostForm("/speaking/assessment", req);
}
