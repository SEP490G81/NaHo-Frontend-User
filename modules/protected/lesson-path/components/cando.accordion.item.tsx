"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import StatusBadge from "@/components/ui/status.badge";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import type { CanDoBlock } from "../hooks/use.cando.nodes";
import CanDoPath from "./cando.path";

interface Props {
    block: CanDoBlock;
    bookId: string;
    lessonId: string;
    showFurigana: boolean;
    defaultOpen?: boolean;
}

export function CanDoAccordionItem({
    block,
    bookId,
    lessonId,
    showFurigana,
    defaultOpen = false,
}: Props) {
    const t = useTranslations("marugoto");
    const [open, setOpen] = useState(defaultOpen);
    const { cando, status, done, total, percent } = block;

    return (
        <div
            className={cn(
                "border-bdc-primary bg-bgc-app overflow-hidden rounded-2xl border transition-all",
                open
                    ? "border-bgc-highlight/40 shadow-md"
                    : "hover:border-bgc-highlight/40 hover:shadow-md",
            )}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="hover:bg-hbgc-app flex w-full items-start gap-3 px-5 py-4 text-left transition-colors"
            >
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-bgc-highlight/15 text-bgc-highlight inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wide uppercase">
                            {t("path.candoLabel", { index: cando.orderInLesson })}
                        </span>
                        <StatusBadge status={status} label={t(`status.${status}`)} />
                    </div>
                    <h3 className="text-text-contrast mt-1.5 text-base leading-snug font-bold md:text-lg">
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
                <div className="shrink-0 text-right">
                    <p className="text-bgc-highlight text-2xl font-bold">{percent}%</p>
                    <p className="text-text-muted text-[11px]">
                        {t("path.milestoneProgress", { done, total })}
                    </p>
                    <div className="bg-bgc-page mt-1.5 ml-auto h-1.5 w-16 overflow-hidden rounded-full">
                        <div
                            className="bg-bgc-highlight h-full rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                </div>
                <ChevronDown
                    className={cn(
                        "text-text-muted mt-1 h-5 w-5 shrink-0 transition-transform",
                        open && "rotate-180",
                    )}
                />
            </button>

            {open && (
                <div className="border-bdc-primary border-t px-5 py-5">
                    <CanDoPath
                        block={block}
                        bookId={bookId}
                        lessonId={lessonId}
                        showFurigana={showFurigana}
                    />
                </div>
            )}
        </div>
    );
}

export default CanDoAccordionItem;
