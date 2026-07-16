import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import {
    BookResponse,
    LessonDetailResponse,
    ObjectiveDetailResponse,
    TopicDetailResponse,
    TopicListItemResponse,
} from "@/types/responses/book.response";

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

// TODO: khi BE có endpoint chi tiết câu hỏi kèm từ vựng/ngữ pháp
// (GET /speaking-questions/{id}), nối lại `getSpeakingQuestionDetail` tại đây
// + route handler /api/speaking-questions/[id] theo pattern 2 lớp ở trên.
