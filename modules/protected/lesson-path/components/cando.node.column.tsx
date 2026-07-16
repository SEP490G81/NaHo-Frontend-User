"use client";
import React from "react";
import type { PathNode } from "../hooks/use.cando.nodes";
import CircularNode from "./circular.node";
import ChestNode from "./chest.node";
import PathMascot from "./path.mascot";

/** Mẫu sóng zic-zac (đơn vị) để rải node trái–giữa–phải như Duolingo. */
const WAVE = [0, 1, 2, 1, 0, -1, -2, -1];
const WAVE_UNIT = 46;

interface Props {
    nodes: PathNode[];
    title: (n: PathNode) => string;
    caption: (n: PathNode) => string;
    onNodeClick: (n: PathNode) => void;
}

/** Cột node lộ trình dạng zic-zac cho một Can-do. */
export function CanDoNodeColumn({ nodes, title, caption, onNodeClick }: Props) {
    return (
        <div className="relative flex flex-col items-center gap-8 py-3">
            {nodes.map((n, idx) => {
                const dx = WAVE[idx % WAVE.length] * WAVE_UNIT;
                return (
                    <div
                        key={n.id}
                        className="relative z-10 transition-transform"
                        style={{ transform: `translateX(${dx}px)` }}
                    >
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
                        {n.status === "active" && (
                            <PathMascot side={dx > 0 ? "left" : "right"} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default CanDoNodeColumn;
