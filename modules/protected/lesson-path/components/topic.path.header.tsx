"use client";
import React from "react";
import { Switch } from "@mui/material";
import { useTranslations } from "next-intl";
import FuriganaText from "@/components/ui/furigana.text";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import BackButton from "@/components/ui/back.button";
import type { BookTopic, MarugotoBook } from "@/data/marugoto/types";

interface Props {
    book: MarugotoBook;
    topic: BookTopic;
    accent: string;
    overallPercent: number;
    lessonCount: number;
    showFurigana: boolean;
    setShowFurigana: (v: boolean) => void;
}

/** Thanh tiêu đề dính trên cùng cho lộ trình theo chủ đề. */
export function TopicPathHeader({
    book,
    topic,
    accent,
    overallPercent,
    lessonCount,
    showFurigana,
    setShowFurigana,
}: Props) {
    const t = useTranslations("marugoto");

    return (
        <header
            className="bg-bgc-app/95 sticky top-0 z-30 rounded-2xl border shadow-sm backdrop-blur"
            style={{
                borderColor: `color-mix(in srgb, ${accent} 26%, var(--color-bdc-primary))`,
            }}
        >
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
                        {book.level} · {t("topic.label", { index: topic.order })}
                    </span>
                    <h1 className="text-text-contrast truncate text-lg leading-tight font-bold">
                        {topic.furiganaMarkup ? (
                            <FuriganaMarkup
                                markup={topic.furiganaMarkup}
                                showFurigana={showFurigana}
                            />
                        ) : (
                            <FuriganaText
                                text={topic.jpTitle}
                                furigana={topic.jpTitle}
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

            <div
                className="flex items-center gap-3 border-t px-4 py-2 sm:px-5"
                style={{
                    borderColor: `color-mix(in srgb, ${accent} 18%, var(--color-bdc-primary))`,
                }}
            >
                <div className="bg-bgc-page h-2 flex-1 overflow-hidden rounded-full">
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${overallPercent}%`, background: accent }}
                    />
                </div>
                <span className="text-text-muted shrink-0 text-xs font-semibold">
                    {overallPercent}% · {t("books.lessonCount", { count: lessonCount })}
                </span>
            </div>
        </header>
    );
}

export default TopicPathHeader;
