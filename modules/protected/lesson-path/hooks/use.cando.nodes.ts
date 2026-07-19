import { useMemo } from "react";
import type { CanDo, Lesson } from "@/data/marugoto/types";
import { useMarugotoStore, PASS_SCORE } from "@/store/marugotoStore";
import type { NodeStatus } from "@/components/ui/status.badge";

export type NodeKind = "vocab" | "question" | "chest";

export interface PathNode {
    /** Khóa duy nhất = id của learning_path_node. */
    id: string;
    /** Id learning_path_node (dùng để gọi chi tiết node). */
    nodeId: number;
    kind: NodeKind;
    /** Id bài học chứa node (để dựng link luyện nói). */
    lessonId: string;
    /** Số thứ tự câu hỏi (chỉ với node kiểu question). */
    index?: number;
    /** Id câu hỏi luyện nói (để chấm điểm / điều hướng sandbox). */
    speakingQuestionId?: number | null;
    status: NodeStatus;
    /** Độ đầy vòng progress 0..100. */
    progress: number;
    bestScore?: number;
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
    currentNodeId?: string;
}

export interface LessonGroup {
    lesson: Lesson;
    blocks: CanDoBlock[];
}

export interface TopicNodes {
    groups: LessonGroup[];
    overallPercent: number;
    /** Mốc học đầu tiên chưa hoàn thành của cả chủ đề ("bạn đang ở đây"). */
    currentNodeId?: string;
}

type RawNode = Omit<PathNode, "status" | "progress">;
type Scores = Record<string, number>;

function buildRawNodes(cando: CanDo, lessonId: string): RawNode[] {
    let qIdx = 0;
    return (cando.pathNodes ?? []).map((n) => {
        if (n.kind === "question") qIdx += 1;
        return {
            id: String(n.id),
            nodeId: n.id,
            kind: n.kind,
            lessonId,
            index: n.kind === "question" ? qIdx : undefined,
            speakingQuestionId: n.speakingQuestionId,
        };
    });
}

/** Dựng các CanDoBlock (node + trạng thái) cho một bài học từ dữ liệu BE. */
export function buildLessonBlocks(
    canDos: CanDo[],
    lessonId: string,
    scores: Scores,
    completedNodes: string[],
): CanDoBlock[] {
    const scoreOf = (n: RawNode) => scores[String(n.speakingQuestionId)] ?? 0;
    const isDone = (n: RawNode) =>
        n.kind === "question"
            ? scoreOf(n) >= PASS_SCORE
            : completedNodes.includes(n.id);

    return canDos.map((cando) => {
        const nodes: PathNode[] = buildRawNodes(cando, lessonId).map((r) => {
            const done = isDone(r);
            const status: NodeStatus = done ? "completed" : "active";
            const bestScore = r.kind === "question" ? scoreOf(r) : undefined;
            const progress =
                status === "completed"
                    ? 100
                    : Math.round(((bestScore ?? 0) / 10) * 100);
            return { ...r, status, progress, bestScore };
        });
        const done = nodes.filter((n) => n.status === "completed").length;
        const status: NodeStatus =
            nodes.length > 0 && done === nodes.length ? "completed" : "active";
        return {
            cando,
            nodes,
            done,
            total: nodes.length,
            percent: nodes.length ? Math.round((done / nodes.length) * 100) : 0,
            status,
        };
    });
}

function summarize(blocks: CanDoBlock[]) {
    const total = blocks.reduce((s, b) => s + b.total, 0);
    const done = blocks.reduce((s, b) => s + b.done, 0);
    return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

/** Node lộ trình cho MỘT bài học (dùng ở trang bài học lẻ). */
export function useLessonNodes(lesson: Lesson): LessonNodes {
    const scores = useMarugotoStore((s) => s.questionScores);
    const completedNodes = useMarugotoStore((s) => s.completedNodes);

    return useMemo(() => {
        const blocks = buildLessonBlocks(
            lesson.canDos,
            lesson.id,
            scores,
            completedNodes,
        );
        const { percent } = summarize(blocks);
        const currentNodeId = blocks
            .flatMap((b) => b.nodes)
            .find((n) => n.status !== "completed")?.id;
        return { blocks, overallPercent: percent, currentNodeId };
    }, [lesson, scores, completedNodes]);
}

/** Node lộ trình cho CẢ chủ đề (mọi bài học · Can-do · câu hỏi). */
export function useTopicNodes(lessons: Lesson[]): TopicNodes {
    const scores = useMarugotoStore((s) => s.questionScores);
    const completedNodes = useMarugotoStore((s) => s.completedNodes);

    return useMemo(() => {
        const groups: LessonGroup[] = lessons.map((lesson) => ({
            lesson,
            blocks: buildLessonBlocks(
                lesson.canDos,
                lesson.id,
                scores,
                completedNodes,
            ),
        }));
        const allBlocks = groups.flatMap((g) => g.blocks);
        const { percent } = summarize(allBlocks);
        const currentNodeId = allBlocks
            .flatMap((b) => b.nodes)
            .find((n) => n.status !== "completed")?.id;
        return { groups, overallPercent: percent, currentNodeId };
    }, [lessons, scores, completedNodes]);
}
