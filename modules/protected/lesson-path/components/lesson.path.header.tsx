"use client";
import React from "react";
import { Switch } from "@mui/material";
import { useTranslations } from "next-intl";
import FuriganaText from "@/components/ui/furigana.text";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import BackButton from "@/components/ui/back.button";
import type { Lesson, MarugotoBook } from "@/data/marugoto/types";

interface Props {
    book: MarugotoBook;
    lesson: Lesson;
    accent: string;
    overallPercent: number;
    candoDone: number;
    candoTotal: number;
    showFurigana: boolean;
    setShowFurigana: (v: boolean) => void;
}

/** Thanh tiêu đề dính trên cùng cho màn lộ trình bài học (thay cho sidebar cũ). */
export function LessonPathHeader({
    book,
    lesson,
    accent,
    overallPercent,
    candoDone,
    candoTotal,
    showFurigana,
    setShowFurigana,
}: Props) {
    const t = useTranslations("marugoto");

    return (
        <header className="border-bdc-primary bg-bgc-app/95 sticky top-0 z-30 rounded-2xl border shadow-sm backdrop-blur">
            <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
                <BackButton
                    href={`/books/${book.id}`}
                    label={t("path.backToTopic")}
                    className="bg-bgc-page shrink-0"
                />

                <div className="min-w-0 flex-1 text-center">
                    <span
                        className="text-[11px] font-bold tracking-[0.14em] uppercase"
                        style={{ color: accent }}
                    >
                        {book.level} · {t("lesson.label", { number: lesson.order })}
                    </span>
                    <h1 className="text-text-contrast truncate text-lg leading-tight font-bold">
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
                    </h1>
                </div>

                <label className="flex shrink-0 cursor-pointer items-center gap-1">
                    <span className="text-text-muted hidden text-xs font-medium sm:inline">
                        {t("path.showFurigana")}
                    </span>
                    <Switch
                        size="small"
                        checked={showFurigana}
                        onChange={(e) => setShowFurigana(e.target.checked)}
                        sx={{
                            "& .Mui-checked": { color: accent },
                            "& .Mui-checked + .MuiSwitch-track": {
                                backgroundColor: accent,
                            },
                        }}
                    />
                </label>
            </div>

            <div className="border-bdc-primary flex items-center gap-3 border-t px-4 py-2 sm:px-5">
                <div className="bg-bgc-page h-2 flex-1 overflow-hidden rounded-full">
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${overallPercent}%`, background: accent }}
                    />
                </div>
                <span className="text-text-muted shrink-0 text-xs font-semibold">
                    {overallPercent}% ·{" "}
                    {t("path.candoSummary", {
                        total: candoTotal,
                        done: candoDone,
                    })}
                </span>
            </div>
        </header>
    );
}

export default LessonPathHeader;
