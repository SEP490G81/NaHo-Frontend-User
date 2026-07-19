"use client";
import React from "react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import type { CanDoBlock } from "../hooks/use.cando.nodes";

interface Props {
    block: CanDoBlock;
    accent: string;
    showFurigana: boolean;
}

/** Dải "unit" tô màu sách mở đầu cho cụm node của một Can-do (phong cách Duolingo). */
export function CanDoSectionHeader({ block, accent, showFurigana }: Props) {
    const t = useTranslations("marugoto");
    const { cando, status, done, total, percent } = block;
    const completed = status === "completed";

    return (
        <div
            className="flex items-center gap-4 rounded-2xl px-5 py-4 text-white shadow-sm"
            style={{
                background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 78%, #000))`,
            }}
        >
            <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold tracking-[0.16em] text-white/85 uppercase">
                    {t("path.candoLabel", { index: cando.orderInLesson })} ·{" "}
                    {t("path.milestoneProgress", { done, total })}
                </p>
                <h3 className="mt-1 text-base leading-snug font-bold md:text-lg">
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

            <div className="flex shrink-0 items-center justify-center">
                {completed ? (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
                        <Check className="h-6 w-6" strokeWidth={3} />
                    </span>
                ) : (
                    <div className="text-right">
                        <p className="text-2xl leading-none font-black">
                            {percent}%
                        </p>
                        <div className="mt-1.5 h-1.5 w-16 overflow-hidden rounded-full bg-white/25">
                            <div
                                className="h-full rounded-full bg-white transition-all duration-500"
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CanDoSectionHeader;
