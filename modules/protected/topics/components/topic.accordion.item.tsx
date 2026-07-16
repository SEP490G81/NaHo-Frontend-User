"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import FuriganaText from "@/components/ui/furigana.text";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import StatusBadge from "@/components/ui/status.badge";
import type { TopicView } from "../utils/unlock";
import LessonRow from "./lesson.row";

export function TopicAccordionItem({
    view,
    bookId,
    defaultOpen = false,
}: {
    view: TopicView;
    bookId: string;
    defaultOpen?: boolean;
}) {
    const t = useTranslations("marugoto");
    const [open, setOpen] = useState(defaultOpen);
    const { topic, status, lessons } = view;

    const locked = status === "locked";

    return (
        <div
            className={cn(
                "border-bdc-primary bg-bgc-app overflow-hidden rounded-2xl border shadow-sm transition-all",
                open
                    ? "border-bgc-highlight/40 shadow-md"
                    : "hover:border-bgc-highlight/40 hover:shadow-md",
            )}
        >
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="hover:bg-hbgc-app flex w-full items-center gap-4 px-5 py-4 text-left transition-colors"
            >
                <div
                    className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-black shadow-sm",
                        locked
                            ? "border-bdc-primary bg-bgc-page text-text-muted border"
                            : "from-bgc-highlight to-bgc-highlight/70 bg-gradient-to-br text-white",
                    )}
                >
                    {String(topic.order).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-text-muted text-[11px] font-semibold tracking-[0.18em] uppercase">
                        {t("topic.label", { index: topic.order })}
                    </p>
                    <p className="text-text-contrast truncate text-base font-bold">
                        {topic.furiganaMarkup ? (
                            <FuriganaMarkup markup={topic.furiganaMarkup} />
                        ) : (
                            <FuriganaText
                                text={topic.jpTitle}
                                furigana={topic.jpTitle}
                            />
                        )}
                        {topic.enTitle && (
                            <span className="text-text-muted ml-2 text-sm font-medium">
                                · {topic.enTitle}
                            </span>
                        )}
                    </p>
                </div>
                <StatusBadge
                    status={status}
                    label={t(`status.${status}`)}
                    className="hidden sm:inline-flex"
                />
                {topic.lessons.length > 0 && (
                    <span className="text-text-muted hidden shrink-0 text-[11px] font-semibold md:inline">
                        {t("topic.lessonCount", { count: topic.lessons.length })}
                    </span>
                )}
                <ChevronDown
                    className={cn(
                        "text-text-muted h-5 w-5 shrink-0 transition-transform",
                        open && "rotate-180",
                    )}
                />
            </button>

            {open && (
                <div className="border-bdc-primary space-y-2.5 border-t px-4 py-4 md:px-5">
                    {lessons.map((lv) => (
                        <LessonRow key={lv.lesson.id} view={lv} bookId={bookId} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TopicAccordionItem;
