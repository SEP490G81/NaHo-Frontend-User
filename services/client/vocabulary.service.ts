import { VocabQuizItem } from "@/types/responses/vocabulary.response";
import { clientFetchJson } from "./client.fetch";

/**
 * Service client lấy danh sách câu hỏi trắc nghiệm từ vựng từ API /api/vocabularies/quiz
 */
export async function getRandomVocabQuiz(
    count: number = 1,
): Promise<VocabQuizItem[]> {
    const data = await clientFetchJson<VocabQuizItem[]>(
        `/api/vocabularies/quiz?count=${count}`,
        {
            cache: "no-store",
        },
    );
    return data ?? [];
}
