"use client";
import React from "react";
import { Lock } from "lucide-react";
import { cn } from "@/libs/utils";
import type { NodeKind, PathNode } from "../hooks/use.cando.nodes";
import NodeDisc from "./node.disc";
import NodeIcon from "./node.icon";

/** Màu mặt node khi đang mở, phân biệt "học từ vựng" (lam) với "luyện nói" (hồng). */
const KIND_COLOR: Record<Exclude<NodeKind, "chest">, string> = {
    vocab: "#5b9bd5",
    question: "var(--color-bgc-highlight)",
};

const SIZE = 92;

interface Props {
    node: PathNode;
    title: string;
    caption: string;
    onClick: () => void;
}

/** Node tròn 3D trên lộ trình (từ vựng / câu hỏi). */
export function CircularNode({ node, title, caption, onClick }: Props) {
    const { status } = node;
    const locked = status === "locked";
    const completed = status === "completed";
    const kind = node.kind as Exclude<NodeKind, "chest">;
    const color = completed ? "var(--color-text-success)" : KIND_COLOR[kind];

    return (
        <div className="flex flex-col items-center gap-2.5">
            <button
                type="button"
                onClick={onClick}
                aria-label={`${title} — ${caption}`}
                className={cn(
                    "rounded-full transition-transform duration-100",
                    !locked &&
                        "hover:-translate-y-0.5 active:translate-y-[3px]",
                    locked && "cursor-not-allowed",
                )}
            >
                <NodeDisc color={color} locked={locked} size={SIZE}>
                    {locked ? (
                        <Lock className="h-6 w-6" />
                    ) : (
                        <NodeIcon kind={completed ? "done" : kind} size={44} />
                    )}
                </NodeDisc>
            </button>

            <div className="max-w-[160px] text-center">
                <p
                    className={cn(
                        "text-[11px] font-bold tracking-wide uppercase",
                        completed
                            ? "text-text-success"
                            : locked
                              ? "text-text-muted"
                              : "text-text-contrast",
                    )}
                >
                    {title}
                    {typeof node.bestScore === "number" &&
                        node.bestScore > 0 && (
                            <span className="text-text-highlight ml-1">
                                · {node.bestScore.toFixed(1)}
                            </span>
                        )}
                </p>
                <p className="text-text-muted text-xs font-medium">{caption}</p>
            </div>
        </div>
    );
}

export default CircularNode;
