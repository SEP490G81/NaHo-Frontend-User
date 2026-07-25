"use client";
import React from "react";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import type { PathNode } from "../hooks/use.cando.nodes";
import NodeDisc from "./node.disc";
import NodeIcon from "./node.icon";

const SIZE = 92;
const GOLD = "#f4b740";

interface Props {
    node: PathNode;
    onClick: () => void;
}

/** Node "rương thưởng" 3D trên lộ trình — mở để nhận L-Point. */
export function ChestNode({ node, onClick }: Props) {
    const t = useTranslations("marugoto");
    const locked = node.status === "locked";
    const completed = node.status === "completed";

    return (
        <div className="flex flex-col items-center gap-2.5">
            <button
                type="button"
                onClick={onClick}
                aria-label={t("node.chestTitle")}
                className={cn(
                    "rounded-full transition-transform duration-100",
                    !locked &&
                        "hover:-translate-y-0.5 active:translate-y-[3px]",
                    locked && "cursor-not-allowed",
                )}
            >
                <NodeDisc
                    color={GOLD}
                    locked={locked}
                    size={SIZE}
                    className={cn(completed && "opacity-80")}
                >
                    {locked ? (
                        <Lock className="h-6 w-6" />
                    ) : (
                        <NodeIcon
                            kind={completed ? "done" : "chest"}
                            size={44}
                        />
                    )}
                </NodeDisc>
            </button>

            <div className="max-w-[160px] text-center">
                <p
                    className="text-[11px] font-bold tracking-wide uppercase"
                    style={{ color: locked ? undefined : GOLD }}
                >
                    {t("node.chestTitle")}
                </p>
                <p className="text-text-muted text-xs font-medium">
                    {completed ? t("node.chestOpened") : t("node.chestHint")}
                </p>
            </div>
        </div>
    );
}

export default ChestNode;
