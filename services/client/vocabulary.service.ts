import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { VocabQuizItem } from "@/types/responses/vocabulary.response";

/**
 * Service client lấy danh sách câu hỏi trắc nghiệm từ vựng từ API /api/vocabularies/quiz
 */
export async function getRandomVocabQuiz(
    count: number = 1,
): Promise<VocabQuizItem[]> {
    const response = await fetch(`/api/vocabularies/quiz?count=${count}`, {
        cache: "no-store",
    });
    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            (result as ProblemDetail).detail ||
                "Không lấy được câu hỏi trắc nghiệm từ vựng",
        );
    }

    const api = result as ApiResponse<VocabQuizItem[]>;
    return api.data ?? [];
}
