"use client";
import React from "react";
import { Check, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import FuriganaText from "@/components/ui/furigana.text";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import type { Lesson } from "@/data/marugoto/types";
import type { NodeStatus } from "@/components/ui/status.badge";

interface Props {
    lesson: Lesson;
    status: NodeStatus;
    accent: string;
    showFurigana: boolean;
}

/** Mốc "bài học" trên lộ trình (checkpoint): tên bài + trạng thái. */
export function LessonBand({ lesson, status, accent, showFurigana }: Props) {
    const t = useTranslations("marugoto");
    const completed = status === "completed";
    const locked = status === "locked";
    const statusLabel = completed
        ? t("lesson.markerDone")
        : locked
          ? t("lesson.markerLocked")
          : t("lesson.markerActive");
    const color = completed
        ? "var(--color-text-success)"
        : locked
          ? "var(--color-text-muted)"
          : accent;

    return (
        <div className="flex flex-col items-center gap-1.5 pb-1 text-center">
            <span
                className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm",
                    locked &&
                        "border-bdc-primary border-2 border-dashed bg-transparent",
                )}
                style={
                    locked
                        ? undefined
                        : {
                              background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 72%, #000))`,
                          }
                }
            >
                {completed ? (
                    <Check className="h-5 w-5" strokeWidth={3} />
                ) : locked ? (
                    <Lock className="text-text-muted h-4 w-4" />
                ) : (
                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                )}
            </span>

            <p
                className="text-[11px] font-bold tracking-[0.16em] uppercase"
                style={{ color }}
            >
                {t("lesson.label", { number: lesson.order })} · {statusLabel}
            </p>
            <h2
                className={cn(
                    "text-lg leading-tight font-bold md:text-xl",
                    locked ? "text-text-muted" : "text-text-contrast",
                )}
            >
                {lesson.furiganaMarkup ? (
                    <FuriganaMarkup
                        markup={lesson.furiganaMarkup}
                        showFurigana={showFurigana}
                    />
                ) : (
                    <FuriganaText
                        text={lesson.jpTitle}
                        furigana={lesson.furigana}
                        showFurigana={showFurigana}
                    />
                )}
            </h2>
        </div>
    );
}

export default LessonBand;
