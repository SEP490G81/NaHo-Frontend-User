"use client";
import React from "react";
import type { PathNode } from "../hooks/use.cando.nodes";
import CircularNode from "./circular.node";
import ChestNode from "./chest.node";
import StartBubble from "./start.bubble";

/** Mẫu sóng zic-zac (đơn vị) để rải node trái–giữa–phải như Duolingo. */
const WAVE = [0, 1, 1.6, 1, 0, -1, -1.6, -1];
const WAVE_UNIT = 44;

interface Props {
    nodes: PathNode[];
    title: (n: PathNode) => string;
    caption: (n: PathNode) => string;
    onNodeClick: (n: PathNode) => void;
    /** Id node "bạn đang ở đây" — gắn bong bóng "Bắt đầu". */
    currentNodeId?: string;
    /** Lệch thứ tự sóng để cụm Can-do sau nối tiếp mạch với cụm trước. */
    waveOffset?: number;
}

/** Cột node lộ trình dạng zic-zac cho một Can-do, có spine nối liền các mốc. */
export function CanDoNodeColumn({
    nodes,
    title,
    caption,
    onNodeClick,
    currentNodeId,
    waveOffset = 0,
}: Props) {
    return (
        <div className="relative flex flex-col items-center gap-6 py-3">
            <span
                aria-hidden
                className="border-bdc-primary absolute inset-y-0 left-1/2 z-0 -translate-x-1/2 border-l-2 border-dashed"
            />
            {nodes.map((n, idx) => {
                const dx = WAVE[(idx + waveOffset) % WAVE.length] * WAVE_UNIT;
                return (
                    <div
                        key={n.id}
                        className="relative z-10 flex flex-col items-center"
                        style={{ transform: `translateX(${dx}px)` }}
                    >
                        {n.id === currentNodeId && <StartBubble />}
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
                );
            })}
        </div>
    );
}

export default CanDoNodeColumn;
