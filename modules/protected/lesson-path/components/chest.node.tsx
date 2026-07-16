"use client";
import React from "react";
import { Check, Gift, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import type { PathNode } from "../hooks/use.cando.nodes";
import ProgressRing from "./progress.ring";
import NodeDisc from "./node.disc";

const SIZE = 104;
const STROKE = 7;
const GOLD = "#f4b740";

interface Props {
    node: PathNode;
    onClick: () => void;
}

/** Node "rương thưởng" trên lộ trình — mở để nhận L-Point. */
export function ChestNode({ node, onClick }: Props) {
    const t = useTranslations("marugoto");
    const locked = node.status === "locked";
    const completed = node.status === "completed";
    const active = node.status === "active";
    const reward = node.reward ?? 0;

    return (
        <div className="flex flex-col items-center gap-2">
            <button
                type="button"
                onClick={onClick}
                aria-label={t("node.chestTitle")}
                className={cn(
                    "relative flex items-center justify-center rounded-full transition-transform duration-200",
                    active && "hover:-translate-y-0.5 hover:scale-105",
                    locked && "cursor-not-allowed",
                )}
                style={{ width: SIZE, height: SIZE }}
            >
                <ProgressRing
                    size={SIZE}
                    stroke={STROKE}
                    color={completed ? GOLD : "var(--color-bdc-primary)"}
                    progress={completed ? 100 : 0}
                />

                <NodeDisc
                    color={GOLD}
                    locked={locked}
                    className={cn(active && "animate-bounce", completed && "opacity-80")}
                >
                    {completed ? (
                        <Check className="h-8 w-8" strokeWidth={3} />
                    ) : locked ? (
                        <Lock className="h-6 w-6" />
                    ) : (
                        <Gift className="h-8 w-8" />
                    )}
                </NodeDisc>
            </button>

            <div className="max-w-[170px] text-center">
                <p
                    className={cn(
                        "text-[10px] font-bold tracking-wide uppercase",
                        locked ? "text-text-muted" : "text-text-contrast",
                    )}
                    style={!locked ? { color: GOLD } : undefined}
                >
                    {t("node.chestTitle")}
                </p>
                <p
                    className={cn(
                        "text-xs font-medium",
                        locked ? "text-text-muted" : "text-text-contrast",
                    )}
                >
                    {completed
                        ? t("node.chestOpened")
                        : t("node.chestCaption", { reward })}
                </p>
            </div>
        </div>
    );
}

export default ChestNode;
