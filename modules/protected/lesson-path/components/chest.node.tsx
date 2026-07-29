"use client";
import React from "react";
import Image from "next/image";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import type { PathNode } from "../hooks/use.cando.nodes";

interface Props {
    node: PathNode;
    onClick: () => void;
}

/** Node "rương thưởng" 3D trên lộ trình — mở để nhận L-Point (ảnh rương gỗ thật). */
export function ChestNode({ node, onClick }: Props) {
    const t = useTranslations("marugoto");
    const locked = node.status === "locked";
    const completed = node.status === "completed";

    return (
        <div className="relative z-10 flex flex-col items-center">
            <button
                type="button"
                onClick={onClick}
                aria-label={t("node.chestTitle")}
                className={cn(
                    "group relative flex flex-col items-center transition-transform active:translate-y-2",
                    !locked && "cursor-pointer hover:-translate-y-1",
                    locked && "cursor-not-allowed opacity-75",
                )}
            >
                {/* Bóng bệ đỡ 3D */}
                <span className="absolute -bottom-1 h-4 w-16 rounded-full bg-black/15 blur-[2px]" />

                <div className="relative flex items-center justify-center">
                    {locked ? (
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-b-4 border-slate-400 bg-slate-300 shadow-md">
                            <Lock className="h-7 w-7 text-slate-500" />
                        </div>
                    ) : (
                        // Kích thước riêng theo tỉ lệ từng ảnh (đóng 1.85 · mở 1.14) để không méo.
                        <Image
                            src={
                                completed
                                    ? "/chest-open.png"
                                    : "/chest-close.png"
                            }
                            alt={t("node.chestTitle")}
                            width={completed ? 82 : 92}
                            height={completed ? 72 : 50}
                            className="drop-shadow-md"
                            priority={false}
                        />
                    )}
                </div>
            </button>
        </div>
    );
}

export default ChestNode;
