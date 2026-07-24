import { useMemo } from "react";
import type { CanDo, Lesson } from "@/data/marugoto/types";
import { useMarugotoStore, PASS_SCORE } from "@/store/marugotoStore";
import type { NodeStatus } from "@/components/ui/status.badge";

export type NodeKind = "vocab" | "question" | "chest";

export interface PathNode {
    id: string;
    nodeId: number;
    kind: NodeKind;
    /** Id bài học chứa node (để dựng link luyện nói). */
    lessonId: string;
    index?: number;
    speakingQuestionId?: number | null;
    /** Thứ tự toàn cục — mốc so sánh với tiến độ BE để khóa/mở. */
    globalOrderIndex: number;
    status: NodeStatus;
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
    status: NodeStatus;
}

export interface TopicNodes {
    groups: LessonGroup[];
    overallPercent: number;
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
            globalOrderIndex: n.globalOrderIndex,
        };
    });
}

/** Dựng CanDoBlock với cờ "đã hoàn thành" từng node (chưa áp khóa). */
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
            const bestScore = r.kind === "question" ? scoreOf(r) : undefined;
            const progress =
                done ? 100 : Math.round(((bestScore ?? 0) / 10) * 100);
            // Trạng thái tạm: done → completed, còn lại → active (khóa áp ở bước sau).
            return {
                ...r,
                status: done ? "completed" : "active",
                progress,
                bestScore,
            };
        });
        return {
            cando,
            nodes,
            done: nodes.filter((n) => n.status === "completed").length,
            total: nodes.length,
            percent: 0,
            status: "active",
        };
    });
}

/**
 * Khóa tuần tự theo tiến độ THẬT của người dùng.
 *
 * `beFrontier` = global order index của node xa nhất người dùng được phép học
 * (`farthestAvailableNode` của BE). Người dùng mới đăng ký luôn đứng ở node đầu
 * giáo trình nên mốc = 1 → chỉ node 1 mở, node 2 trở đi khóa.
 *
 * Mốc thực tế lấy xa hơn giữa BE và node kế tiếp node FE đã biết là xong, để lộ trình
 * không kẹt lại khi BE chưa kịp đẩy biên giới.
 *
 * GOI < mốc → completed · GOI = mốc → active · GOI > mốc → locked.
 */
function applyLock(
    blocks: CanDoBlock[],
    beFrontier: number | null,
): {
    blocks: CanDoBlock[];
    currentNodeId?: string;
} {
    const flat = blocks.flatMap((b) => b.nodes);
    const localFrontier = flat
        .filter((n) => n.status === "completed")
        .reduce((max, n) => Math.max(max, n.globalOrderIndex + 1), -Infinity);
    const frontier = Math.max(beFrontier ?? -Infinity, localFrontier);

    const isDone = (n: PathNode) =>
        n.status === "completed" || n.globalOrderIndex < frontier;
    const currentNodeId = flat.find((n) => !isDone(n))?.id;

    const locked = blocks.map((b) => {
        const nodes = b.nodes.map((n) => {
            const status: NodeStatus = isDone(n)
                ? "completed"
                : n.id === currentNodeId
                  ? "active"
                  : "locked";
            return { ...n, status };
        });
        const done = nodes.filter((n) => n.status === "completed").length;
        const status: NodeStatus = nodes.every((n) => n.status === "completed")
            ? "completed"
            : nodes.some((n) => n.status === "active")
              ? "active"
              : "locked";
        return {
            ...b,
            nodes,
            done,
            total: nodes.length,
            percent: nodes.length ? Math.round((done / nodes.length) * 100) : 0,
            status,
        };
    });
    return { blocks: locked, currentNodeId };
}

function overallOf(blocks: CanDoBlock[]): number {
    const total = blocks.reduce((s, b) => s + b.total, 0);
    const done = blocks.reduce((s, b) => s + b.done, 0);
    return total ? Math.round((done / total) * 100) : 0;
}

/** Node lộ trình cho MỘT bài học (trang bài học lẻ). */
export function useLessonNodes(
    lesson: Lesson,
    beFrontier: number | null = null,
): LessonNodes {
    const scores = useMarugotoStore((s) => s.questionScores);
    const completedNodes = useMarugotoStore((s) => s.completedNodes);

    return useMemo(() => {
        const raw = buildLessonBlocks(
            lesson.canDos,
            lesson.id,
            scores,
            completedNodes,
        );
        const { blocks, currentNodeId } = applyLock(raw, beFrontier);
        return { blocks, overallPercent: overallOf(blocks), currentNodeId };
    }, [lesson, scores, completedNodes, beFrontier]);
}

/** Node lộ trình cho CẢ chủ đề (mọi bài học · Can-do · câu hỏi), khóa tuần tự. */
export function useTopicNodes(
    lessons: Lesson[],
    beFrontier: number | null = null,
): TopicNodes {
    const scores = useMarugotoStore((s) => s.questionScores);
    const completedNodes = useMarugotoStore((s) => s.completedNodes);

    return useMemo(() => {
        const rawGroups = lessons.map((lesson) => ({
            lesson,
            blocks: buildLessonBlocks(
                lesson.canDos,
                lesson.id,
                scores,
                completedNodes,
            ),
        }));

        // Khóa tuần tự trên toàn bộ node của chủ đề (theo đúng thứ tự bài → can-do).
        const allBlocks = rawGroups.flatMap((g) => g.blocks);
        const { blocks: lockedFlat, currentNodeId } = applyLock(
            allBlocks,
            beFrontier,
        );

        const offsets = rawGroups.map((_, i) =>
            rawGroups.slice(0, i).reduce((s, g) => s + g.blocks.length, 0),
        );
        const groups: LessonGroup[] = rawGroups.map((g, i) => {
            const blocks = lockedFlat.slice(offsets[i], offsets[i] + g.blocks.length);
            const status: NodeStatus = blocks.every((b) => b.status === "completed")
                ? "completed"
                : blocks.some((b) => b.status !== "locked")
                  ? "active"
                  : "locked";
            return { lesson: g.lesson, blocks, status };
        });

        return {
            groups,
            overallPercent: overallOf(lockedFlat),
            currentNodeId,
        };
    }, [lessons, scores, completedNodes, beFrontier]);
}
