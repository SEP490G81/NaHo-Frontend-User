import { proxyPostJson } from "@/services/server/backend.proxy";

/** Hoàn thành node từ vựng: forward { vocabularyQuestionId } lên BE (userId từ token). */
export async function POST(request: Request) {
    return proxyPostJson("/vocabulary-questions/completion", request);
}
