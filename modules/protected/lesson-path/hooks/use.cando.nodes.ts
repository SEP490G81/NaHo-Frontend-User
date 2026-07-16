import { useMemo } from "react";
import type { Question } from "@/data/mockTopics";
import type { CanDo, Lesson } from "@/data/marugoto/types";
import { useMarugotoStore, PASS_SCORE } from "@/store/marugotoStore";
import type { NodeStatus } from "@/components/ui/status.badge";

export type NodeKind = "vocab" | "question" | "test" | "chest";

/** Phần thưởng L-Point khi mở một rương trên lộ trình. */
export const CHEST_REWARD = 50;

export interface PathNode {
    id: string;
    kind: NodeKind;
    /** Số thứ tự câu hỏi (chỉ với node kiểu question). */
    index?: number;
    status: NodeStatus;
    /** Độ đầy vòng progress 0..100. */
    progress: number;
    /** Điểm cao nhất 0..10 nếu có. */
    bestScore?: number;
    /** Phần thưởng L-Point (chỉ với node kiểu chest). */
    reward?: number;
    question?: Question;
}

export interface CanDoBlock {
    cando: CanDo;
    nodes: PathNode[];
    done: number;
    total: number;
    percent: number;
    status: NodeStatus;
}

export interface LessonNodes {
    blocks: CanDoBlock[];
    overallPercent: number;
}

function buildRawNodes(cando: CanDo): Omit<PathNode, "status" | "progress">[] {
    const raw: Omit<PathNode, "status" | "progress">[] = [];
    // Mỗi câu hỏi có bộ chuẩn bị riêng: [từ vựng câu i] → [luyện nói câu i] → [rương].
    cando.questions.forEach((q, i) => {
        raw.push({ id: `${q.id}::vocab`, kind: "vocab", index: i + 1 });
        raw.push({ id: q.id, kind: "question", index: i + 1, question: q });
        raw.push({ id: `${q.id}::chest`, kind: "chest", reward: CHEST_REWARD });
    });
    raw.push({ id: `${cando.id}::test`, kind: "test" });
    // Rương tổng kết Can-do (thưởng lớn hơn).
    raw.push({ id: `${cando.id}::chest`, kind: "chest", reward: CHEST_REWARD * 2 });
    return raw;
}

/** Tính node lộ trình + trạng thái khóa/mở tuần tự cho toàn bộ Can-do của một Lesson. */
export function useLessonNodes(lesson: Lesson): LessonNodes {
    const scores = useMarugotoStore((s) => s.questionScores);
    const completedNodes = useMarugotoStore((s) => s.completedNodes);

    return useMemo(() => {
        const isDone = (n: { id: string; kind: NodeKind }) =>
            n.kind === "question"
                ? (scores[n.id] ?? 0) >= PASS_SCORE
                : completedNodes.includes(n.id);

        // Gom raw node theo từng Can-do rồi tính chỉ số phẳng để xác định "active".
        const groups = lesson.canDos.map((cando) => buildRawNodes(cando));
        const flat = groups.flat();
        const activeIdx = flat.findIndex((r) => !isDone(r)); // -1 nếu đã xong hết
        const starts = groups.map((_, gi) =>
            groups.slice(0, gi).reduce((sum, g) => sum + g.length, 0),
        );

        const statusAt = (globalIdx: number, done: boolean): NodeStatus =>
            done ? "completed" : globalIdx === activeIdx ? "active" : "locked";

        const blocks: CanDoBlock[] = groups.map((rawNodes, gi) => {
            const nodes: PathNode[] = rawNodes.map((r, k) => {
                const status = statusAt(starts[gi] + k, isDone(r));
                const bestScore =
                    r.kind === "question" ? (scores[r.id] ?? 0) : undefined;
                const progress =
                    status === "completed"
                        ? 100
                        : Math.round(((bestScore ?? 0) / 10) * 100);
                return { ...r, status, progress, bestScore };
            });
            const done = nodes.filter((n) => n.status === "completed").length;
            const status: NodeStatus = nodes.every((n) => n.status === "completed")
                ? "completed"
                : nodes.some((n) => n.status !== "locked")
                  ? "active"
                  : "locked";
            return {
                cando: lesson.canDos[gi],
                nodes,
                done,
                total: nodes.length,
                percent: Math.round((done / nodes.length) * 100),
                status,
            };
        });

        const totalDone = flat.filter((r) => isDone(r)).length;
        return {
            blocks,
            overallPercent:
                flat.length === 0
                    ? 0
                    : Math.round((totalDone / flat.length) * 100),
        };
    }, [lesson, scores, completedNodes]);
}
