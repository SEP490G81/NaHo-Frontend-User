"use client";
import React from "react";
import type { PathNode } from "../hooks/use.cando.nodes";
import CircularNode from "./circular.node";
import ChestNode from "./chest.node";
import StartBubble from "./start.bubble";

interface Props {
    nodes: PathNode[];
    title: (n: PathNode) => string;
    caption: (n: PathNode) => string;
    onNodeClick: (n: PathNode) => void;
    currentNodeId?: string;
}

/**
 * Hàng node của một Can-do xếp NGANG và tự xuống dòng khi tràn màn (không cuộn
 * ngang). Mỗi node là nút 3D; node hiện tại gắn bong bóng "Bắt đầu".
 */
export function NodeFlow({
    nodes,
    title,
    caption,
    onNodeClick,
    currentNodeId,
}: Props) {
    if (nodes.length === 0) return null;
    return (
        <div className="flex flex-wrap items-start justify-center gap-x-7 gap-y-3 px-2 py-3">
            {nodes.map((n) => (
                <div key={n.id} className="flex flex-col items-center">
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
            ))}
        </div>
    );
}

export default NodeFlow;
