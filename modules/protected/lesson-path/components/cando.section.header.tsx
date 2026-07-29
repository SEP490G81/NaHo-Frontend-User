"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import type { CanDoBlock } from "../hooks/use.cando.nodes";

interface Props {
    block: CanDoBlock;
    accent: string;
    showFurigana: boolean;
}

/** Nhãn nhẹ giới thiệu một Can-do (tên + số mốc), đặt giữa lộ trình. */
export function CanDoSectionHeader({ block, accent, showFurigana }: Props) {
    const t = useTranslations("marugoto");
    const { cando, status, done, total } = block;
    const locked = status === "locked";

    return (
        <div
            className={cn(
                "border-bdc-primary/50 bg-bgc-app/90 relative z-10 mx-auto max-w-lg rounded-xl border px-4 py-2 text-center shadow-xs backdrop-blur-md transition-all",
                locked && "border-dashed opacity-70",
            )}
        >
            <div className="flex items-center justify-center gap-2">
                <span
                    className="rounded-md px-2 py-0.5 text-[10px] font-black tracking-wider uppercase"
                    style={{
                        color: locked ? "var(--color-text-muted)" : accent,
                        background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                    }}
                >
                    {t("path.candoLabel", { index: cando.orderInLesson })} ·{" "}
                    {t("path.milestoneProgress", { done, total })}
                </span>
            </div>

            <h3
                className={cn(
                    "mt-1 text-xs leading-relaxed font-semibold sm:text-sm",
                    locked ? "text-text-muted" : "text-text-contrast",
                )}
            >
                {cando.furiganaMarkup ? (
                    <FuriganaMarkup
                        markup={cando.furiganaMarkup}
                        showFurigana={showFurigana}
                    />
                ) : (
                    cando.viDesc
                )}
            </h3>
        </div>
    );
}

export default CanDoSectionHeader;
