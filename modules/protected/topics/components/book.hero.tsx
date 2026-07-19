"use client";
import React from "react";
import { LayoutGrid } from "lucide-react";
import { useTranslations } from "next-intl";
import type { MarugotoBook } from "@/data/marugoto/types";
import BackButton from "@/components/ui/back.button";
import BookCover from "@/components/ui/book.cover";
import type { TopicView } from "../utils/unlock";

function MetaChip({
    icon,
    label,
    accent,
}: {
    icon: React.ReactNode;
    label: string;
    accent: string;
}) {
    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold"
            style={{
                color: accent,
                borderColor: `color-mix(in srgb, ${accent} 35%, transparent)`,
                background: `color-mix(in srgb, ${accent} 10%, var(--color-bgc-app))`,
            }}
        >
            {icon}
            {label}
        </span>
    );
}

export function BookHero({
    book,
    views,
}: {
    book: MarugotoBook;
    views: TopicView[];
}) {
    const t = useTranslations("marugoto");
    const accent = book.coverColor ?? "var(--color-bgc-highlight)";

    const lessons = views.flatMap((v) => v.lessons);
    const total = lessons.length;
    const done = lessons.filter((l) => l.status === "completed").length;
    const overall = total
        ? Math.round(lessons.reduce((s, l) => s + l.percent, 0) / total)
        : 0;

    return (
        <div
            className="overflow-hidden rounded-2xl border shadow-sm"
            style={{
                borderColor: `color-mix(in srgb, ${accent} 30%, var(--color-bdc-primary))`,
                background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 12%, var(--color-bgc-app)) 0%, var(--color-bgc-app) 55%)`,
            }}
        >
            <div
                className="flex items-center border-b px-3 py-2.5 sm:px-4"
                style={{
                    borderColor: `color-mix(in srgb, ${accent} 20%, var(--color-bdc-primary))`,
                }}
            >
                <BackButton
                    href="/books"
                    label={t("books.backToLibrary")}
                    className="hover:bg-hbgc-app border-transparent bg-transparent px-2.5 py-1.5 shadow-none hover:border-transparent hover:shadow-none"
                />
            </div>

            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-stretch sm:gap-6 sm:p-6">
                <BookCover
                    book={book}
                    className="h-44 w-full shrink-0 rounded-xl shadow-md sm:h-48 sm:w-36"
                />

                <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
                    <p
                        className="text-[11px] font-bold tracking-[0.18em] uppercase"
                        style={{ color: accent }}
                    >
                        {t("books.currentBook")} · {book.level}
                    </p>
                    <h2 className="text-text-contrast text-2xl leading-tight font-bold md:text-3xl">
                        {book.title}
                    </h2>
                    <p className="text-text-muted text-sm md:text-base">
                        {book.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1.5">
                        <MetaChip
                            icon={<LayoutGrid className="h-3.5 w-3.5" />}
                            label={t("books.topicCount", {
                                count: book.topics.length,
                            })}
                            accent={accent}
                        />
                    </div>
                </div>

                <div className="border-bdc-primary flex shrink-0 flex-col justify-center gap-3 border-t pt-5 sm:w-56 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
                    <div className="flex items-end justify-between">
                        <div>
                            <span
                                className="text-3xl leading-none font-black"
                                style={{ color: accent }}
                            >
                                {overall}%
                            </span>
                            <p className="text-text-muted mt-1 text-xs font-medium">
                                {t("books.overallProgress")}
                            </p>
                        </div>
                    </div>
                    <div className="bg-bgc-page h-2 overflow-hidden rounded-full">
                        <div
                            className="h-full rounded-full transition-all"
                            style={{
                                width: `${overall}%`,
                                background: accent,
                            }}
                        />
                    </div>
                    <p className="text-text-muted text-xs">
                        {t("books.lessonsDone", { done, total })}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BookHero;
