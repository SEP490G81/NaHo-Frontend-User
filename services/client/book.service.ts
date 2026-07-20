import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import {
    BookResponse,
    LessonDetailResponse,
    ObjectiveDetailResponse,
    TopicDetailResponse,
    TopicListItemResponse,
} from "@/types/responses/book.response";
import { LearningPathNodeDetailResponse } from "@/types/responses/learning.response";

/**
 * Service phía client cho sách Marugoto. Gọi qua Next route handler (/api/*)
 * cùng origin — route handler đứng ra gọi BE (pattern 2 lớp giống folder Admin),
 * nhờ vậy tránh được CORS và ẩn base URL của BE khỏi trình duyệt.
 */

async function getData<T>(path: string): Promise<T> {
    const response = await fetch(path);
    const result = await response.json();
    if (!response.ok) {
        throw new Error((result as ProblemDetail).detail || "Yêu cầu thất bại");
    }
    return (result as ApiResponse<T>).data;
}

/** Danh sách sách (BE tự khóa quyển out-trình theo user). */
export function listBooks(): Promise<BookResponse[]> {
    return getData<BookResponse[]>("/api/books");
}

/** Chi tiết một quyển sách (mô tả, bìa, cấp độ...). */
export function getBookDetail(bookId: string | number): Promise<BookResponse> {
    return getData<BookResponse>(`/api/books/${bookId}`);
}

/** Toàn bộ chủ đề (topic) của một quyển sách, sắp theo thứ tự. */
export function listTopicsByBook(
    bookId: string | number,
): Promise<TopicListItemResponse[]> {
    const q = "page=0&size=100&sortBy=order_index&sortDirection=ASC";
    return getData<TopicListItemResponse[]>(`/api/topics/books/${bookId}?${q}`);
}

/** Chi tiết một chủ đề kèm danh sách bài học (lesson). */
export function getTopicDetail(
    topicId: string | number,
): Promise<TopicDetailResponse> {
    return getData<TopicDetailResponse>(`/api/topics/${topicId}`);
}

/** Chi tiết một bài học kèm danh sách Can-do (objective). */
export function getLessonDetail(
    lessonId: string | number,
): Promise<LessonDetailResponse> {
    return getData<LessonDetailResponse>(`/api/lessons/${lessonId}`);
}

/** Chi tiết một Can-do (objective) kèm danh sách câu hỏi luyện nói. */
export function getObjectiveDetail(
    objectiveId: string | number,
): Promise<ObjectiveDetailResponse> {
    return getData<ObjectiveDetailResponse>(`/api/objectives/${objectiveId}`);
}

/** Chi tiết một node lộ trình: từ vựng / câu hỏi (kèm vocab + grammar) / rương. */
export function getLearningPathNodeDetail(
    nodeId: string | number,
): Promise<LearningPathNodeDetailResponse> {
    return getData<LearningPathNodeDetailResponse>(
        `/api/learning-path-nodes/${nodeId}`,
    );
}

/** Mở rương thưởng → BE cộng L-Point cho người dùng (chỉ 1 lần). */
export async function openChest(
    chestId: number,
    userId: number,
): Promise<void> {
    const response = await fetch("/api/chests/open", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chestId, userId }),
    });
    if (!response.ok) {
        const result = (await response.json().catch(() => null)) as
            | ProblemDetail
            | null;
        throw new Error(result?.detail || "Mở rương thất bại");
    }
}
