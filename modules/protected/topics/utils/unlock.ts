import type { BookTopic, Lesson } from "@/data/marugoto/types";

export type NodeStatus = "completed" | "active" | "locked";

export interface LessonView {
    lesson: Lesson;
    status: NodeStatus;
    percent: number;
}

export interface TopicView {
    topic: BookTopic;
    status: NodeStatus;
    lessons: LessonView[];
}

function lessonPercent(
    lesson: Lesson,
    scores: Record<string, number>,
    pass: number,
): { percent: number; done: boolean } {
    const qs = lesson.canDos.flatMap((c) => c.questions);
    if (qs.length === 0) return { percent: 0, done: false };
    const passed = qs.filter((q) => (scores[q.id] ?? 0) >= pass).length;
    return {
        percent: Math.round((passed / qs.length) * 100),
        done: passed === qs.length,
    };
}

function topicStatus(lessons: LessonView[]): NodeStatus {
    // TẠM THỜI bỏ khóa: mọi chủ đề đều mở (đã học hết = completed, còn lại = active).
    if (lessons.length > 0 && lessons.every((l) => l.status === "completed")) {
        return "completed";
    }
    return "active";
}

/**
 * Trạng thái topic/lesson cho màn chi tiết sách. BE trả toàn bộ nội dung và
 * không gate lesson theo progress → lesson để duyệt mở (đã học = completed,
 * còn lại = active); việc khóa/mở thật nằm ở tầng node trong lộ trình luyện tập.
 */
export function buildBookView(
    topics: BookTopic[],
    scores: Record<string, number>,
    pass: number,
): TopicView[] {
    return topics.map((topic) => {
        const lessons: LessonView[] = topic.lessons.map((lesson) => {
            const { percent, done } = lessonPercent(lesson, scores, pass);
            return {
                lesson,
                status: done ? "completed" : "active",
                percent,
            };
        });
        return { topic, status: topicStatus(lessons), lessons };
    });
}
