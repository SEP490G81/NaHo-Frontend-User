import {
    BookResponse,
    LessonDetailResponse,
    ObjectiveDetailResponse,
    TopicDetailResponse,
    TopicListItemResponse,
} from "@/types/responses/book.response";
import {
    LearningPathNodeDetailResponse,
    VocabulariesOfTopicResponse,
} from "@/types/responses/learning.response";
import { UserNodeProgressResponse } from "@/types/responses/league.response";
import { clientFetchJson } from "./client.fetch";

/**
 * Service phía client cho sách Marugoto. Gọi qua Next route handler (/api/*)
 * cùng origin với cơ chế tự động xoay token khi 401.
 */

/** Danh sách sách (BE tự khóa quyển out-trình theo user). */
export function listBooks(): Promise<BookResponse[]> {
    return clientFetchJson<BookResponse[]>("/api/books");
}

/** Chi tiết một quyển sách (mô tả, bìa, cấp độ...). */
export function getBookDetail(bookId: string | number): Promise<BookResponse> {
    return clientFetchJson<BookResponse>(`/api/books/${bookId}`);
}

/** Toàn bộ chủ đề (topic) của một quyển sách, sắp theo thứ tự. */
export function listTopicsByBook(
    bookId: string | number,
): Promise<TopicListItemResponse[]> {
    const q = "page=0&size=100&sortBy=order_index&sortDirection=ASC";
    return clientFetchJson<TopicListItemResponse[]>(
        `/api/topics/books/${bookId}?${q}`,
    );
}

/** Chi tiết một chủ đề kèm danh sách bài học (lesson). */
export function getTopicDetail(
    topicId: string | number,
): Promise<TopicDetailResponse> {
    return clientFetchJson<TopicDetailResponse>(`/api/topics/${topicId}`);
}

/** Chi tiết một bài học kèm danh sách Can-do (objective). */
export function getLessonDetail(
    lessonId: string | number,
): Promise<LessonDetailResponse> {
    return clientFetchJson<LessonDetailResponse>(`/api/lessons/${lessonId}`);
}

/** Chi tiết một Can-do (objective) kèm danh sách câu hỏi luyện nói. */
export function getObjectiveDetail(
    objectiveId: string | number,
): Promise<ObjectiveDetailResponse> {
    return clientFetchJson<ObjectiveDetailResponse>(
        `/api/objectives/${objectiveId}`,
    );
}

/** Chi tiết một node lộ trình: từ vựng / câu hỏi (kèm vocab + grammar) / rương. */
export function getLearningPathNodeDetail(
    nodeId: string | number,
): Promise<LearningPathNodeDetailResponse> {
    return clientFetchJson<LearningPathNodeDetailResponse>(
        `/api/learning-path-nodes/${nodeId}`,
    );
}

/** Toàn bộ từ vựng của một chủ đề (để hiển thị "Danh sách từ vựng"). */
export function getTopicVocabularies(
    topicId: string | number,
): Promise<VocabulariesOfTopicResponse> {
    return clientFetchJson<VocabulariesOfTopicResponse>(
        `/api/vocabularies/topic/${topicId}`,
    );
}

/** Tiến độ THẬT của user tại 1 node (best-score/status/số lần thử). Trả null nếu
 *  user chưa từng làm node này (BE 404/không có bản ghi). */
export async function getUserNodeProgress(
    nodeId: string | number,
): Promise<UserNodeProgressResponse | null> {
    try {
        return await clientFetchJson<UserNodeProgressResponse>(
            `/api/user-node-progresses/learning-path-nodes/${nodeId}`,
        );
    } catch {
        return null;
    }
}

/**
 * Mở rương thưởng → BE cộng L-Point (userId lấy từ token, chỉ 1 lần) và đẩy mốc
 * tiến độ sang node kế. Body dùng `learningPathNodeId` (id node lộ trình, không phải
 * chestId). Trả về số điểm ngẫu nhiên thực nhận.
 */
export async function openChest(learningPathNodeId: number): Promise<number> {
    const result = await clientFetchJson<{ earnedPoint: number }>(
        "/api/chests/open",
        {
            method: "POST",
            body: JSON.stringify({ learningPathNodeId }),
        },
    );
    return result?.earnedPoint ?? 0;
}

/**
 * Hoàn thành node từ vựng → BE cộng điểm & đẩy mốc sang node kế (idempotent: đã học
 * thì bỏ qua). Body dùng `vocabularyQuestionId`, userId lấy từ token.
 */
export async function completeVocabularyQuestion(
    vocabularyQuestionId: number,
): Promise<void> {
    await clientFetchJson<void>("/api/vocabulary-questions/completion", {
        method: "POST",
        body: JSON.stringify({ vocabularyQuestionId }),
    });
}
