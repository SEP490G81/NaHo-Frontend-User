import type { Topic, Question } from "@/data/mockTopics";
import type { BookTopic, CanDo, Lesson, MarugotoBook } from "./types";
import { MARUGOTO_BOOKS } from "./books";

export * from "./types";
export { MARUGOTO_BOOKS, USER_CEFR_ORDER, CURRENT_BOOK_ID } from "./books";
export { mapBookList } from "./merge";

export function getBooks(): MarugotoBook[] {
    return MARUGOTO_BOOKS;
}

export function getBookById(bookId: string): MarugotoBook | undefined {
    return MARUGOTO_BOOKS.find((b) => b.id === bookId);
}

/**
 * Sách để duyệt mở (BE trả toàn bộ sách, không gate theo progress) — việc
 * khóa/mở thật diễn ra ở tầng node (theo `farthestAvailableNodeId`).
 */
export function isBookUnlocked(): boolean {
    return true;
}

/** Tổng số bài học (lesson) của một quyển sách. */
export function getBookLessonCount(book: MarugotoBook): number {
    return book.topics.reduce((sum, t) => sum + t.lessons.length, 0);
}

/** Toàn bộ câu hỏi luyện nói trong một topic (gộp từ mọi Can-do). */
export function getTopicQuestions(topic: BookTopic): Question[] {
    const out: Question[] = [];
    for (const lesson of topic.lessons) {
        for (const cando of lesson.canDos) out.push(...cando.questions);
    }
    return out;
}

/**
 * Map mỗi BookTopic → `Topic` tương thích interface cũ để trang chi tiết câu hỏi
 * và sandbox (vốn đọc theo `Topic`) có thể nhận diện dữ liệu Marugoto.
 */
export function getMarugotoTopicsAsTopics(): Topic[] {
    return MARUGOTO_BOOKS.flatMap((book) =>
        book.topics.map((topic) => ({
            id: topic.id,
            title: topic.enTitle || topic.jpTitle,
            jpTitle: topic.jpTitle,
            jpFurigana: topic.jpTitle,
            category: "office-it" as Topic["category"],
            audience: book.title,
            description: topic.enTitle,
            objectives: [],
            goals: [],
            averageScore: 0,
            questions: getTopicQuestions(topic),
        })),
    );
}

export interface QuestionChain {
    book: MarugotoBook;
    topic: BookTopic;
    lesson: Lesson;
    canDo: CanDo;
    question: Question;
}

/** Chuỗi phân cấp đầy đủ Sách → Chủ đề → Bài → Can-do → Câu hỏi (cho breadcrumb). */
export function getQuestionChain(questionId: string): QuestionChain | undefined {
    for (const book of MARUGOTO_BOOKS) {
        for (const topic of book.topics) {
            for (const lesson of topic.lessons) {
                for (const canDo of lesson.canDos) {
                    const question = canDo.questions.find((q) => q.id === questionId);
                    if (question) return { book, topic, lesson, canDo, question };
                }
            }
        }
    }
    return undefined;
}
