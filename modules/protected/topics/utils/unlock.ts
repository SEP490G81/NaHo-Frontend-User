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

interface NodeRange {
    firstNodeOrder?: number;
    lastNodeOrder?: number;
}

/**
 * Trạng thái của một khối (chủ đề / bài học) so với mốc tiến độ `frontier`
 * (global order index của node xa nhất người dùng được phép học).
 *
 * Toàn bộ node của khối nằm trước mốc → completed; mốc rơi vào trong khối →
 * active; khối bắt đầu sau mốc → locked. Thiếu dữ liệu mốc → mở để không chặn nhầm.
 */
function rangeStatus(r: NodeRange, frontier: number | null): NodeStatus {
    if (frontier == null || r.firstNodeOrder == null) return "active";
    if (r.lastNodeOrder != null && r.lastNodeOrder < frontier)
        return "completed";
    return r.firstNodeOrder <= frontier ? "active" : "locked";
}

/** Phần trăm hoàn thành của khối, suy từ vị trí mốc trong dải node của khối. */
function rangePercent(r: NodeRange, frontier: number | null): number {
    if (
        frontier == null ||
        r.firstNodeOrder == null ||
        r.lastNodeOrder == null
    ) {
        return 0;
    }
    const total = r.lastNodeOrder - r.firstNodeOrder + 1;
    if (total <= 0) return 0;
    const done = frontier - r.firstNodeOrder;
    return Math.max(0, Math.min(100, Math.round((done / total) * 100)));
}

export type AccessVerdict = "loading" | "granted" | "denied";

/** Dải node (global order index) của một tài nguyên; node đơn thì first = last. */
export interface NodeOrderRange {
    firstNodeOrder?: number | null;
    lastNodeOrder?: number | null;
}

/**
 * Guard truy cập TẬP TRUNG theo mốc tiến độ TOÀN CỤC (global order index) — dùng
 * chung cho trang sách / chủ đề / node để chặn URL vượt quyền (giống luật khóa BE).
 *
 * - `self`  : dải node của tài nguyên đang mở (null = chưa tải xong → "loading").
 * - `parent`: dải node của tài nguyên cha (optional) để kiểm tra "thuộc về" —
 *   vd chặn /books/6/topics/1 khi topic 1 không nằm trong dải node của book 6.
 *
 * Chỉ chặn khi có dữ liệu thật (frontier != null & self.first != null); thiếu dữ
 * liệu (mock/dev) → "granted" để không chặn nhầm.
 */
export function accessVerdict(
    self: NodeOrderRange | null | undefined,
    frontier: number | null,
    parent?: NodeOrderRange | null,
): AccessVerdict {
    if (!self) return "loading";
    if (frontier == null || self.firstNodeOrder == null) return "granted";
    const selfLast = self.lastNodeOrder ?? self.firstNodeOrder;
    // Không thuộc về cha → không cho vào (tài nguyên của quyển/chủ đề khác).
    if (
        parent?.firstNodeOrder != null &&
        parent.lastNodeOrder != null &&
        (self.firstNodeOrder < parent.firstNodeOrder ||
            selfLast > parent.lastNodeOrder)
    ) {
        return "denied";
    }
    // Bắt đầu sau mốc tiến độ = chưa mở khóa.
    if (self.firstNodeOrder > frontier) return "denied";
    return "granted";
}

/**
 * Trạng thái topic/lesson cho màn chi tiết sách, khóa theo tiến độ thật của
 * người dùng: mọi node có global order index lớn hơn mốc đều chưa mở.
 */
export function buildBookView(
    topics: BookTopic[],
    frontier: number | null,
): TopicView[] {
    return topics.map((topic) => {
        const lessons: LessonView[] = topic.lessons.map((lesson) => ({
            lesson,
            status: rangeStatus(lesson, frontier),
            percent: rangePercent(lesson, frontier),
        }));
        return { topic, status: rangeStatus(topic, frontier), lessons };
    });
}
