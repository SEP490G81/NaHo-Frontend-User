"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { FuriganaHtml } from "@/components/ui/furigana.html";
import type { Lesson } from "@/data/marugoto/types";
import type { NodeStatus } from "@/components/ui/status.badge";
import { cn } from "@/libs/utils";

interface Props {
    lesson: Lesson;
    status: NodeStatus;
    accent: string;
    showFurigana: boolean;
}

/** Mốc "bài học" trên lộ trình (Lesson Title Banner): chỉ chứa nhãn bài & tiêu đề. */
export function LessonBand({ lesson, status, accent, showFurigana }: Props) {
    const t = useTranslations("marugoto");
    const completed = status === "completed";
    const locked = status === "locked";
    const statusLabel = completed
        ? t("lesson.markerDone")
        : locked
          ? t("lesson.markerLocked")
          : t("lesson.markerActive");
    const color = completed ? "#10b981" : locked ? "#94a3b8" : accent;

    return (
        <div className="relative z-10 mx-auto flex flex-col items-center text-center select-none">
            <div
                className={cn(
                    "flex max-w-lg min-w-[320px] flex-col items-center gap-1.5 rounded-3xl border-2 px-6 py-3.5 shadow-lg backdrop-blur-md transition-transform hover:-translate-y-0.5",
                    locked
                        ? "border-slate-300 bg-slate-100/90 text-slate-500 opacity-75"
                        : "border-slate-200 bg-white/95 text-slate-800 shadow-md",
                )}
                style={{
                    borderBottomWidth: "5px",
                    borderBottomColor: locked
                        ? "#cbd5e1"
                        : `color-mix(in srgb, ${color} 65%, #000)`,
                }}
            >
                <div className="flex items-center gap-2">
                    <span
                        className="rounded-full px-3 py-0.5 text-[10px] font-black tracking-widest text-white uppercase shadow-xs"
                        style={{
                            background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 75%, #000))`,
                        }}
                    >
                        📖 {t("lesson.label", { number: lesson.order })} ·{" "}
                        {statusLabel}
                    </span>
                </div>

                <h2 className="text-base leading-snug font-extrabold text-slate-800 sm:text-lg">
                    <FuriganaHtml
                        text={lesson.jpTitle}
                        markup={lesson.furiganaMarkup}
                        showFurigana={showFurigana}
                    />
                </h2>
            </div>
        </div>
    );
}

export default LessonBand;
