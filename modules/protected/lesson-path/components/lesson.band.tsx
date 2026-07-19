"use client";
import React from "react";
import { useTranslations } from "next-intl";
import FuriganaText from "@/components/ui/furigana.text";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import type { Lesson } from "@/data/marugoto/types";

interface Props {
    lesson: Lesson;
    accent: string;
    showFurigana: boolean;
}

/** Vạch phân đoạn "Bài học" mở đầu cho các Can-do thuộc bài đó. */
export function LessonBand({ lesson, accent, showFurigana }: Props) {
    const t = useTranslations("marugoto");
    return (
        <div className="flex items-center gap-3 pt-2">
            <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black text-white shadow-sm"
                style={{
                    background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 70%, #000))`,
                }}
            >
                {lesson.order}
            </span>
            <div className="min-w-0">
                <p
                    className="text-[11px] font-bold tracking-[0.16em] uppercase"
                    style={{ color: accent }}
                >
                    {t("lesson.label", { number: lesson.order })}
                </p>
                <h2 className="text-text-contrast truncate text-lg leading-tight font-bold">
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
            <span
                className="ml-1 hidden h-px flex-1 sm:block"
                style={{
                    background: `linear-gradient(90deg, color-mix(in srgb, ${accent} 40%, transparent), transparent)`,
                }}
            />
        </div>
    );
}

export default LessonBand;
