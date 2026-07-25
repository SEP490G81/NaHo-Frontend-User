"use client";
import React from "react";
import type {
    CanDoBlock,
    LessonGroup,
    PathNode,
} from "../hooks/use.cando.nodes";
import LessonBand from "./lesson.band";
import CanDoSectionHeader from "./cando.section.header";
import CircularNode from "./circular.node";
import ChestNode from "./chest.node";
import StartBubble from "./start.bubble";

const W = 600; // bề rộng dải lộ trình (px), canh giữa
const CX = W / 2;
const WAVE = [0, 1, 1.6, 1, 0, -1, -1.6, -1];
const WAVE_UNIT = 42;
const H_LESSON = 104; // chiều cao ô mốc bài
const H_CANDO = 96; // chiều cao ô nhãn can-do
const H_NODE = 148; // chiều cao ô node
const OFF_LESSON = 20; // tâm chấm mốc bài so với đỉnh ô
const OFF_NODE = 46; // tâm đĩa node so với đỉnh ô
const TOP_PAD = 10;
const BOTTOM_PAD = 28;
const CANDO_W = 500;

interface Pt {
    x: number;
    y: number;
}

/** Đường cong mượt (Catmull-Rom → Bézier) đi xuyên qua tâm các mốc/node. */
function smoothPath(pts: Pt[]): string {
    if (pts.length < 2) return "";
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i - 1] ?? pts[i];
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const p3 = pts[i + 2] ?? p2;
        const c1x = p1.x + (p2.x - p0.x) / 6;
        const c1y = p1.y + (p2.y - p0.y) / 6;
        const c2x = p2.x - (p3.x - p1.x) / 6;
        const c2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
    }
    return d;
}

type Item =
    | { kind: "lesson"; key: string; group: LessonGroup }
    | { kind: "cando"; key: string; block: CanDoBlock }
    | { kind: "node"; key: string; node: PathNode; block: CanDoBlock };

interface Props {
    groups: LessonGroup[];
    accent: string;
    showFurigana: boolean;
    currentNodeId?: string;
    nodeTitle: (n: PathNode) => string;
    nodeCaption: (n: PathNode) => string;
    onNodeClick: (block: CanDoBlock, n: PathNode) => void;
}

/**
 * Lộ trình cả chủ đề như MỘT con rắn liền mạch: mốc bài · nhãn Can-do · node xếp
 * theo ô cố định, một đường SVG duy nhất chạy xuyên tâm các mốc & node (sau nhãn).
 */
export function TopicSnakePath({
    groups,
    accent,
    showFurigana,
    currentNodeId,
    nodeTitle,
    nodeCaption,
    onNodeClick,
}: Props) {
    const items: Item[] = groups.flatMap((g) => [
        { kind: "lesson", key: `l-${g.lesson.id}`, group: g } as Item,
        ...g.blocks.flatMap((b) => [
            { kind: "cando", key: `c-${b.cando.id}`, block: b } as Item,
            ...b.nodes.map(
                (n) => ({ kind: "node", key: n.id, node: n, block: b }) as Item,
            ),
        ]),
    ]);

    const heightOf = (it: Item) =>
        it.kind === "lesson"
            ? H_LESSON
            : it.kind === "cando"
              ? H_CANDO
              : H_NODE;
    const isWaypoint = (it: Item) => it.kind !== "cando";

    const tops = items.map(
        (_, i) =>
            TOP_PAD + items.slice(0, i).reduce((s, it) => s + heightOf(it), 0),
    );
    const dxAt = (i: number) => {
        const w = items.slice(0, i).filter(isWaypoint).length;
        return WAVE[w % WAVE.length] * WAVE_UNIT;
    };
    const xAt = (i: number) => CX + dxAt(i);

    const totalHeight = items.length
        ? tops[items.length - 1] +
          heightOf(items[items.length - 1]) +
          BOTTOM_PAD
        : TOP_PAD;

    const points: Pt[] = items
        .map((it, i) => ({ it, i }))
        .filter(({ it }) => isWaypoint(it))
        .map(({ it, i }) => ({
            x: xAt(i),
            y: tops[i] + (it.kind === "lesson" ? OFF_LESSON : OFF_NODE),
        }));

    return (
        <div
            className="relative mx-auto"
            style={{ width: W, height: totalHeight, overflow: "visible" }}
        >
            <svg
                className="pointer-events-none absolute top-0 left-0"
                width={W}
                height={totalHeight}
                aria-hidden
            >
                <path
                    d={smoothPath(points)}
                    fill="none"
                    stroke="var(--color-bdc-primary)"
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeDasharray="1 13"
                />
            </svg>

            {items.map((it, i) => {
                if (it.kind === "cando") {
                    return (
                        <div
                            key={it.key}
                            className="absolute"
                            style={{
                                top: tops[i],
                                left: CX,
                                width: CANDO_W,
                                transform: "translateX(-50%)",
                            }}
                        >
                            <CanDoSectionHeader
                                block={it.block}
                                accent={accent}
                                showFurigana={showFurigana}
                            />
                        </div>
                    );
                }
                if (it.kind === "lesson") {
                    return (
                        <div
                            key={it.key}
                            className="absolute"
                            style={{
                                top: tops[i],
                                left: xAt(i),
                                transform: "translateX(-50%)",
                            }}
                        >
                            <LessonBand
                                lesson={it.group.lesson}
                                status={it.group.status}
                                accent={accent}
                                showFurigana={showFurigana}
                            />
                        </div>
                    );
                }
                return (
                    <div
                        key={it.key}
                        className="absolute flex flex-col items-center"
                        style={{
                            top: tops[i],
                            left: xAt(i),
                            transform: "translateX(-50%)",
                        }}
                    >
                        {it.node.id === currentNodeId && (
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                                <StartBubble />
                            </div>
                        )}
                        {it.node.kind === "chest" ? (
                            <ChestNode
                                node={it.node}
                                onClick={() => onNodeClick(it.block, it.node)}
                            />
                        ) : (
                            <CircularNode
                                node={it.node}
                                title={nodeTitle(it.node)}
                                caption={nodeCaption(it.node)}
                                onClick={() => onNodeClick(it.block, it.node)}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default TopicSnakePath;
