"use client";
import React from "react";
import { BookOpen, Check, Lock, Mic, Trophy } from "lucide-react";
import { cn } from "@/libs/utils";
import type { NodeKind, PathNode } from "../hooks/use.cando.nodes";
import ProgressRing from "./progress.ring";
import NodeDisc from "./node.disc";

const KIND_ICON: Record<Exclude<NodeKind, "chest">, React.ElementType> = {
    vocab: BookOpen,
    question: Mic,
    test: Trophy,
};

const SIZE = 104;
const STROKE = 7;

interface Props {
    node: PathNode;
    title: string;
    caption: string;
    onClick: () => void;
}

export function CircularNode({ node, title, caption, onClick }: Props) {
    const { status, progress } = node;
    const locked = status === "locked";
    const completed = status === "completed";
    const active = status === "active";
    const KindIcon = KIND_ICON[node.kind as Exclude<NodeKind, "chest">];

    const base = completed
        ? "var(--color-text-success)"
        : "var(--color-bgc-highlight)";
    const ringColor = completed
        ? "var(--color-text-success)"
        : active
          ? "var(--color-bgc-highlight)"
          : "var(--color-bdc-primary)";

    return (
        <div className="flex flex-col items-center gap-2">
            <button
                type="button"
                onClick={onClick}
                aria-label={`${title} — ${caption}`}
                className={cn(
                    "relative flex items-center justify-center rounded-full transition-transform duration-200",
                    !locked && "hover:-translate-y-0.5 hover:scale-105",
                    locked && "cursor-not-allowed",
                )}
                style={{ width: SIZE, height: SIZE }}
            >
                <ProgressRing
                    size={SIZE}
                    stroke={STROKE}
                    color={ringColor}
                    progress={progress}
                />

                {active && (
                    <span
                        className="absolute h-[74px] w-[74px] animate-ping rounded-full"
                        style={{ background: "var(--color-bgc-highlight)", opacity: 0.25 }}
                    />
                )}

                <NodeDisc color={base} locked={locked}>
                    {completed ? (
                        <Check className="h-9 w-9" strokeWidth={3} />
                    ) : locked ? (
                        <Lock className="h-6 w-6" />
                    ) : (
                        <KindIcon className="h-8 w-8" />
                    )}
                </NodeDisc>
            </button>

            <div className="max-w-[170px] text-center">
                <p
                    className={cn(
                        "text-[10px] font-bold tracking-wide uppercase",
                        completed && "text-text-success",
                        active && "text-bgc-highlight",
                        locked && "text-text-muted",
                    )}
                >
                    {title}
                    {typeof node.bestScore === "number" && node.bestScore > 0 && (
                        <span className="text-text-highlight ml-1">
                            · {node.bestScore.toFixed(1)}/10
                        </span>
                    )}
                </p>
                <p
                    className={cn(
                        "text-xs font-medium",
                        locked ? "text-text-muted" : "text-text-contrast",
                    )}
                >
                    {caption}
                </p>
            </div>
        </div>
    );
}

export default CircularNode;
