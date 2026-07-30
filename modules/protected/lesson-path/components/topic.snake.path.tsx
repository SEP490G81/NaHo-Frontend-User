"use client";
import React from "react";
import type {
    CanDoBlock,
    LessonGroup,
    PathNode,
} from "../hooks/use.cando.nodes";
import FlagNode from "./flag.node";
import CircularNode from "./circular.node";
import ChestNode from "./chest.node";
import StartBubble from "./start.bubble";

const W = 940; // bề rộng dải lộ trình rộng (px), tràn màn hình
const CX = W / 2;
const WAVE = [0, 1.1, 1.8, 1.1, 0, -1.1, -1.8, -1.1];
const WAVE_UNIT = 220; // Biên độ lượn sóng quét ngang rộng (750px sweep)
const H_LESSON = 110; // Chiều cao ô Cờ Bài học 3D Graphic
const H_CANDO = 100; // Chiều cao ô Cờ Can-Do 3D Graphic
const H_NODE = 145; // Chiều cao ô node 3D
const OFF_ITEM = 38; // Tâm waypoint so với đỉnh ô
const TOP_PAD = 18;
const BOTTOM_PAD = 40;

interface Pt {
    x: number;
    y: number;
}

/** Đường cong mượt (Catmull-Rom → Bézier) đi xuyên qua tâm tất cả các waypoint mốc trên lộ trình. */
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
    | { kind: "lesson"; key: string; group: LessonGroup; itemIndex: number }
    | { kind: "cando"; key: string; block: CanDoBlock; itemIndex: number }
    | {
          kind: "node";
          key: string;
          node: PathNode;
          block: CanDoBlock;
          nodeIndex: number;
          itemIndex: number;
      };

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
 * Lộ trình cả chủ đề: Tất cả các mốc (Cờ Bài học ➔ Cờ Can-Do ➔ Đồng xu Từ vựng/Nói ➔ Rương)
 * đều là các Waypoints uốn lượn S-Curve nối liền 100%.
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
    let globalIndex = 0;
    let nodeCounter = 0;

    const items: Item[] = groups.flatMap((g) => {
        const lessonItem: Item = {
            kind: "lesson",
            key: `l-${g.lesson.id}`,
            group: g,
            itemIndex: globalIndex++,
        };
        const blockItems = g.blocks.flatMap((b) => {
            const candoItem: Item = {
                kind: "cando",
                key: `c-${b.cando.id}`,
                block: b,
                itemIndex: globalIndex++,
            };
            const nodeItems = b.nodes.map((n) => {
                const idx = nodeCounter++;
                return {
                    kind: "node",
                    key: n.id,
                    node: n,
                    block: b,
                    nodeIndex: idx,
                    itemIndex: globalIndex++,
                } as Item;
            });
            return [candoItem, ...nodeItems];
        });
        return [lessonItem, ...blockItems];
    });

    const heightOf = (it: Item) =>
        it.kind === "lesson"
            ? H_LESSON
            : it.kind === "cando"
              ? H_CANDO
              : H_NODE;

    const tops = items.map(
        (_, i) =>
            TOP_PAD + items.slice(0, i).reduce((s, it) => s + heightOf(it), 0),
    );

    const xAt = (it: Item) => {
        const waveVal = WAVE[it.itemIndex % WAVE.length];
        return CX + waveVal * WAVE_UNIT;
    };

    const totalHeight = items.length
        ? tops[items.length - 1] +
          heightOf(items[items.length - 1]) +
          BOTTOM_PAD
        : TOP_PAD;

    // Đường cong đứt nét SVG nối liền TẤT CẢ các mốc Waypoint trên lộ trình
    const points: Pt[] = items.map((it, i) => ({
        x: xAt(it),
        y: tops[i] + OFF_ITEM,
    }));

    return (
        <div
            className="relative mx-auto"
            style={{ width: W, height: totalHeight, overflow: "visible" }}
        >
            <svg
                className="pointer-events-none absolute top-0 left-0 drop-shadow-sm"
                width={W}
                height={totalHeight}
                aria-hidden
            >
                {/* Lớp 1: Đường ray đệm 3D phía sau */}
                <path
                    d={smoothPath(points)}
                    fill="none"
                    stroke={`color-mix(in srgb, ${accent} 22%, transparent)`}
                    strokeWidth={14}
                    strokeLinecap="round"
                />

                {/* Lớp 2: Đường vạch đứt chính nổi bật */}
                <path
                    d={smoothPath(points)}
                    fill="none"
                    stroke={accent}
                    strokeWidth={7}
                    strokeLinecap="round"
                    strokeDasharray="12 14"
                    className="opacity-90"
                />
            </svg>

            {items.map((it, i) => {
                if (it.kind === "lesson") {
                    return (
                        <div
                            key={it.key}
                            id={`lesson-${it.group.lesson.id}`}
                            className="absolute scroll-mt-28 flex flex-col items-center"
                            style={{
                                top: tops[i],
                                left: xAt(it),
                                transform: "translateX(-50%)",
                            }}
                        >
                            <FlagNode
                                kind="lesson"
                                lesson={it.group.lesson}
                                status={it.group.status}
                                accent={accent}
                                showFurigana={showFurigana}
                            />
                        </div>
                    );
                }

                if (it.kind === "cando") {
                    return (
                        <div
                            key={it.key}
                            className="absolute flex flex-col items-center"
                            style={{
                                top: tops[i],
                                left: xAt(it),
                                transform: "translateX(-50%)",
                            }}
                        >
                            <FlagNode
                                kind="cando"
                                block={it.block}
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
                            left: xAt(it),
                            transform: "translateX(-50%)",
                        }}
                    >
                        {it.node.id === currentNodeId && (
                            <div className="absolute -top-8 left-1/2 z-20 -translate-x-1/2">
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
                                accent={accent}
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
