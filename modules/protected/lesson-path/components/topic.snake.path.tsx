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

const W = 540; // bề rộng dải lộ trình (px) — bó gọn, chừa chỗ cho thanh bên phải
const CX = W / 2;
const WAVE = [0, 1.1, 1.8, 1.1, 0, -1.1, -1.8, -1.1];
const WAVE_UNIT = 112; // Biên độ lượn sóng ngang (hẹp lại, không tràn 2 bên)
const H_LESSON = 52; // Chiều cao ô Cờ Bài học (cờ Can-do đầu bài SÁT cổng Torii)
const H_CANDO = 48; // Chiều cao ô Cờ Can-Do (node kế kéo sát cờ hơn)
const H_NODE = 96; // Chiều cao ô node (các node dọc gần nhau hơn)
const OFF_ITEM = 38; // Tâm waypoint so với đỉnh ô
const TOP_PAD = 18;
const BOTTOM_PAD = 40;

interface Pt {
    x: number;
    y: number;
}

/**
 * Đoạn Bézier (Catmull-Rom) từ waypoint i tới i+1. Tách từng đoạn để tô màu
 * riêng theo tiến độ, nhưng dùng chung công thức tiếp tuyến nên vẫn liền mạch cong.
 */
function segmentD(pts: Pt[], i: number): string {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    return `M ${p1.x},${p1.y} C ${c1x},${c1y} ${c2x},${c2y} ${p2.x},${p2.y}`;
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

    // Mốc đang khóa (chưa tới) — dùng để tô xám đoạn đường dẫn vào nó.
    const itemLocked = (it: Item): boolean =>
        it.kind === "lesson"
            ? it.group.status === "locked"
            : it.kind === "cando"
              ? it.block.status === "locked"
              : it.node.status === "locked";

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
                className="pointer-events-none absolute top-0 left-0"
                width={W}
                height={totalHeight}
                aria-hidden
            >
                {/* Nét đứt tô theo từng đoạn: đã đi/đang đứng = màu sách · dẫn vào
                    node khóa = xám. Không còn dải nền mờ phía sau. */}
                {points.slice(0, -1).map((_, i) => {
                    const locked = itemLocked(items[i + 1]);
                    return (
                        <path
                            key={i}
                            d={segmentD(points, i)}
                            fill="none"
                            stroke={locked ? "#cbd5e1" : accent}
                            strokeWidth={7}
                            strokeLinecap="round"
                            strokeDasharray="12 14"
                            className={locked ? "opacity-80" : "opacity-90"}
                        />
                    );
                })}
            </svg>

            {items.map((it, i) => {
                if (it.kind === "lesson") {
                    return (
                        <div
                            key={it.key}
                            id={`lesson-${it.group.lesson.id}`}
                            className="absolute flex scroll-mt-28 flex-col items-center"
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
                                showFurigana={showFurigana}
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
