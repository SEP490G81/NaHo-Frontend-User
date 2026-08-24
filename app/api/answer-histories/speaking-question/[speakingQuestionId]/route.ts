import { NextRequest } from "next/server";
import { proxyGet } from "@/services/server/backend.proxy";

/** Lớp 1: /api/answer-histories/speaking-question/[speakingQuestionId] → BE /answer-histories/speaking-question/{id} (lịch sử luyện nói của 1 câu hỏi). */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ speakingQuestionId: string }> },
) {
    const { speakingQuestionId } = await params;
    return proxyGet(
        `/answer-histories/speaking-question/${speakingQuestionId}`,
    );
}
