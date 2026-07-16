import { mockTopics, type Question, type Topic } from "@/data/mockTopics";
import { getMarugotoTopicsAsTopics } from "@/data/marugoto";

export interface QuestionHit {
    topicId: string;
    question: Question;
}

/** Gộp danh sách topic cũ (mock) và topic Marugoto để tra cứu chung. */
function allTopics(): Topic[] {
    return [...mockTopics, ...getMarugotoTopicsAsTopics()];
}

/** Tìm một câu hỏi theo id ở cả dữ liệu cũ lẫn dữ liệu Marugoto. */
export function findQuestionAnywhere(
    questionId: string,
): QuestionHit | undefined {
    for (const topic of allTopics()) {
        const question = topic.questions.find((q) => q.id === questionId);
        if (question) return { topicId: topic.id, question };
    }
    return undefined;
}

/** Tìm topic theo id (hỗ trợ cả trường hợp id có hậu tố như route cũ). */
export function findTopicAnywhere(topicId: string): Topic | undefined {
    return (
        mockTopics.find((t) => topicId.startsWith(t.id)) ??
        getMarugotoTopicsAsTopics().find((t) => t.id === topicId)
    );
}
