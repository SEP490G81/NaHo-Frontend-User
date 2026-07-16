"use client";
import React from "react";
import { Target } from "lucide-react";
import { LinearProgress, Switch } from "@mui/material";
import { useTranslations } from "next-intl";
import FuriganaText from "@/components/ui/furigana.text";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import BackButton from "@/components/ui/back.button";
import BookCover from "@/components/ui/book.cover";
import type { Lesson, MarugotoBook } from "@/data/marugoto/types";

interface Props {
    book: MarugotoBook;
    lesson: Lesson;
    overallPercent: number;
    showFurigana: boolean;
    setShowFurigana: (v: boolean) => void;
    candoDone: number;
    candoTotal: number;
}

export function LessonMetadataCard({
    book,
    lesson,
    overallPercent,
    showFurigana,
    setShowFurigana,
    candoDone,
    candoTotal,
}: Props) {
    const t = useTranslations("marugoto");
    const goals = lesson.canDos.map((c) => c.viDesc);

    return (
        <aside className="border-bdc-primary bg-bgc-app space-y-4 rounded-2xl border p-5 shadow-sm lg:sticky lg:top-6">
            <BackButton
                href={`/books/${book.id}`}
                label={t("path.backToTopic")}
                className="bg-bgc-page"
            />

            <BookCover book={book} className="h-32 w-full rounded-lg" />

            <div className="space-y-2">
                <span className="bg-bgc-highlight/15 text-bgc-highlight inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase">
                    {book.level} · {t("lesson.label", { number: lesson.order })}
                </span>
                <h1 className="text-text-contrast text-2xl leading-tight font-bold">
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
                {lesson.enTitle && (
                    <p className="text-text-muted text-sm">{lesson.enTitle}</p>
                )}
            </div>

            <section className="border-bdc-primary bg-bgc-page space-y-2 rounded-lg border p-3">
                <h3 className="text-text-contrast flex items-center gap-2 text-sm font-semibold">
                    <Target className="text-bgc-highlight h-4 w-4" />
                    {t("path.lessonGoals")}
                </h3>
                <ul className="text-text-muted list-disc space-y-1 pl-5 text-sm">
                    {goals.map((g, i) => (
                        <li key={i} className="line-clamp-2">
                            {g}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="border-bdc-primary bg-bgc-page space-y-2 rounded-lg border p-3">
                <div className="flex items-baseline justify-between">
                    <h3 className="text-text-contrast text-sm font-semibold">
                        {t("path.overallProgress")}
                    </h3>
                    <p>
                        <span className="text-bgc-highlight text-2xl font-bold">
                            {overallPercent}
                        </span>
                        <span className="text-text-muted text-sm">%</span>
                    </p>
                </div>
                <LinearProgress
                    variant="determinate"
                    value={overallPercent}
                    sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: "var(--color-bgc-app)",
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: "var(--color-bgc-highlight)",
                            borderRadius: 3,
                        },
                    }}
                />
                <p className="text-text-muted text-[11px]">
                    {t("path.candoSummary", {
                        total: candoTotal,
                        done: candoDone,
                    })}
                </p>
            </section>

            {/* Toggle Furigana (control cấp trang) */}
            <div className="border-bdc-primary bg-bgc-page flex items-center justify-between rounded-lg border py-1 pr-1 pl-3">
                <span className="text-text-contrast text-sm font-medium">
                    {t("path.showFurigana")}
                </span>
                <Switch
                    checked={showFurigana}
                    onChange={(e) => setShowFurigana(e.target.checked)}
                    sx={{
                        "& .Mui-checked": {
                            color: "var(--color-bgc-highlight)",
                        },
                        "& .Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "var(--color-bgc-highlight)",
                        },
                    }}
                />
            </div>
        </aside>
    );
}

export default LessonMetadataCard;
