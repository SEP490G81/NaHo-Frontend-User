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
            className="sticky top-2 z-30 mx-auto max-w-3xl overflow-hidden rounded-3xl border bg-white/95 p-4 shadow-xl backdrop-blur-2xl transition-all sm:p-5"
            style={{
                borderColor: `color-mix(in srgb, ${accent} 35%, #e2e8f0)`,
                background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 10%, #ffffff) 0%, #ffffff 100%)`,
            }}
        >
            {/* Top Bar: Action Controls Dock */}
            <div className="flex items-center justify-between gap-3">
                <BackButton
                    href={`/books/${book.id}`}
                    label={t("path.backToTopic")}
                    className="shrink-0 rounded-2xl bg-slate-100/90 text-slate-700 shadow-xs hover:bg-slate-200"
                />

                <div className="flex items-center gap-2">
                    <span
                        className="rounded-full px-3 py-1 text-[11px] font-black tracking-widest text-white uppercase shadow-sm"
                        style={{
                            background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 75%, #000))`,
                        }}
                    >
                        {book.level} ·{" "}
                        {t("topic.label", { index: topic.order })}
                    </span>

                    <label className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3 py-1 shadow-xs transition-all hover:bg-white">
                        <span className="text-xs font-bold text-slate-600 sm:inline">
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
            </div>

            {/* Center Hero Unit Title */}
            <div className="mt-3 text-center">
                <h1 className="text-2xl leading-tight font-black tracking-tight text-slate-800 sm:text-3xl">
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

            {/* Integrated 3D Progress Bar */}
            <div className="mt-3.5 flex items-center gap-3">
                <div className="relative h-4 flex-1 overflow-hidden rounded-full border border-slate-200 bg-slate-100 p-0.5 shadow-inner">
                    <div
                        className="relative h-full rounded-full shadow-xs transition-all duration-700"
                        style={{
                            width: `${overallPercent}%`,
                            background: `linear-gradient(90deg, ${accent}, color-mix(in srgb, ${accent} 82%, #fff))`,
                        }}
                    >
                        {/* Top Lens Highlight */}
                        <span className="pointer-events-none absolute inset-x-1 top-0.5 h-1.5 rounded-full bg-white/40" />
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-0.5 shadow-2xs">
                    <span className="text-xs font-black text-slate-800">
                        🏆 {overallPercent}%
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                        · {t("books.lessonCount", { count: lessonCount })}
                    </span>
                </div>
            </div>
        </header>
    );
}

export default TopicPathHeader;
