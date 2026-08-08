"use client";
import React from "react";
import { Lock } from "lucide-react";
import { cn } from "@/libs/utils";
import type { NodeKind, PathNode } from "../hooks/use.cando.nodes";
import NodeDisc from "./node.disc";
import NodeIcon from "./node.icon";

const SIZE = 84;

interface Props {
    node: PathNode;
    title: string;
    caption: string;
    /** Màu chủ đạo của quyển sách — node dùng chính màu này. */
    accent: string;
    onClick: () => void;
}

/**
 * Node tròn nổi khối trên lộ trình, tô theo MÀU SÁCH:
 * đang học = màu sách tươi · đã xong = màu sách trầm hơn · khóa = xám (ở NodeDisc).
 * Loại node (từ vựng / luyện nói / đã xong) phân biệt bằng icon, không đổi màu.
 */
export function CircularNode({ node, title, caption, accent, onClick }: Props) {
    const { status } = node;
    const locked = status === "locked";
    const completed = status === "completed";
    const kind = node.kind as Exclude<NodeKind, "chest">;
    const color = completed
        ? `color-mix(in srgb, ${accent} 82%, #000)`
        : accent;

    return (
        <div className="relative z-10 flex flex-col items-center">
            <button
                type="button"
                onClick={onClick}
                aria-label={`${title} — ${caption}`}
                className={cn(
                    "rounded-full transition-transform duration-100",
                    !locked && "cursor-pointer hover:-translate-y-1",
                    locked && "cursor-not-allowed",
                )}
            >
                <NodeDisc color={color} locked={locked} size={SIZE}>
                    {locked ? (
                        <Lock className="h-6 w-6 text-slate-400" />
                    ) : (
                        <NodeIcon kind={completed ? "done" : kind} size={44} />
                    )}
                </NodeDisc>
            </button>
        </div>
    );
}

export default CircularNode;
