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
                "border-bdc-primary bg-bgc-app mx-auto max-w-xl rounded-2xl border px-5 py-3 text-center shadow-sm",
                locked && "opacity-60",
            )}
        >
            <p
                className="text-[11px] font-bold tracking-[0.14em] uppercase"
                style={{ color: locked ? "var(--color-text-muted)" : accent }}
            >
                {t("path.candoLabel", { index: cando.orderInLesson })} ·{" "}
                {t("path.milestoneProgress", { done, total })}
            </p>
            <h3
                className={cn(
                    "mt-1 text-base leading-snug font-bold",
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
