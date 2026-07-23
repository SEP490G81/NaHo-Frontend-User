"use client";
import React from "react";
import type { PathNode } from "../hooks/use.cando.nodes";
import CircularNode from "./circular.node";
import ChestNode from "./chest.node";
import StartBubble from "./start.bubble";

/** Mẫu sóng zic-zac (đơn vị) để rải node trái–giữa–phải như Duolingo. */
const WAVE = [0, 1, 1.6, 1, 0, -1, -1.6, -1];
const WAVE_UNIT = 44;
const BAND = 260; // bề rộng dải lộ trình (px), canh giữa
const SLOT = 146; // chiều cao mỗi mốc (px)
const DISC = 92; // đường kính đĩa node
const CX = BAND / 2;
const PAD = 16; // đệm trên để chừa chỗ cho bong bóng "Bắt đầu"
const DISC_CY = DISC / 2; // tâm đĩa tính từ đỉnh ô

interface Point {
    x: number;
    y: number;
}

/** Đường cong mượt (Catmull-Rom → Bézier) đi xuyên qua tâm các node. */
function smoothPath(pts: Point[]): string {
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

interface Props {
    nodes: PathNode[];
    title: (n: PathNode) => string;
    caption: (n: PathNode) => string;
    onNodeClick: (n: PathNode) => void;
    /** Id node "bạn đang ở đây" — gắn bong bóng "Bắt đầu". */
    currentNodeId?: string;
    /** Lệch thứ tự sóng để zigzag nối tiếp mạch giữa các Can-do. */
    waveOffset?: number;
}

/** Cột node zic-zac cho một Can-do, nối bằng đường "rắn" cong mượt (SVG). */
export function CanDoNodeColumn({
    nodes,
    title,
    caption,
    onNodeClick,
    currentNodeId,
    waveOffset = 0,
}: Props) {
    const dxOf = (idx: number) =>
        WAVE[(idx + waveOffset) % WAVE.length] * WAVE_UNIT;
    const points: Point[] = nodes.map((_, idx) => ({
        x: CX + dxOf(idx),
        y: PAD + idx * SLOT + DISC_CY,
    }));
    const height = PAD + nodes.length * SLOT;

    return (
        <div
            className="relative mx-auto"
            style={{ width: BAND, height, overflow: "visible" }}
        >
            <svg
                className="pointer-events-none absolute top-0 left-0"
                width={BAND}
                height={height}
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

            {nodes.map((n, idx) => (
                <div
                    key={n.id}
                    className="absolute flex flex-col items-center"
                    style={{
                        top: PAD + idx * SLOT,
                        left: CX + dxOf(idx),
                        transform: "translateX(-50%)",
                    }}
                >
                    {n.id === currentNodeId && (
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                            <StartBubble />
                        </div>
                    )}
                    {n.kind === "chest" ? (
                        <ChestNode node={n} onClick={() => onNodeClick(n)} />
                    ) : (
                        <CircularNode
                            node={n}
                            title={title(n)}
                            caption={caption(n)}
                            onClick={() => onNodeClick(n)}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default CanDoNodeColumn;
