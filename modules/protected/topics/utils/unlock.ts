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
    // Chủ đề chưa nạp bài (mảng rỗng) → coi như khóa, tránh every([]) = completed.
    if (lessons.length === 0) return "locked";
    if (lessons.every((l) => l.status === "completed")) return "completed";
    if (lessons.some((l) => l.status !== "locked")) return "active";
    return "locked";
}

/**
 * Tính trạng thái khóa/mở tuần tự cho toàn bộ topic & lesson của một quyển sách.
 * Bài đầu chưa hoàn thành = "active", các bài sau = "locked". Sách khóa → tất cả khóa.
 */
export function buildBookView(
    topics: BookTopic[],
    bookUnlocked: boolean,
    scores: Record<string, number>,
    pass: number,
): TopicView[] {
    let activeAssigned = false;
    return topics.map((topic) => {
        const lessons: LessonView[] = topic.lessons.map((lesson) => {
            const { percent, done } = lessonPercent(lesson, scores, pass);
            let status: NodeStatus;
            if (!bookUnlocked) status = "locked";
            else if (done) status = "completed";
            else if (!activeAssigned) {
                activeAssigned = true;
                status = "active";
            } else status = "locked";
            return { lesson, status, percent };
        });
        return { topic, status: topicStatus(lessons), lessons };
    });
}
