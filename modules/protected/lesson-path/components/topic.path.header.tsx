"use client";
import React, { useState } from "react";
import { BookOpen, LayoutGrid, Pin } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { FuriganaHtml } from "@/components/ui/furigana.html";
import BackButton from "@/components/ui/back.button";
import type { BookTopic, MarugotoBook } from "@/data/marugoto/types";
import { usePinnedTopics } from "@/hooks/use.pinned.topics";
import TopicVocabDialog from "./topic.vocab.dialog";

interface Props {
    book: MarugotoBook;
    topic: BookTopic;
    accent: string;
    overallPercent: number;
    lessonCount: number;
    showFurigana: boolean;
    completedCount?: number;
    totalCount?: number;
}

function CircleProgress({
    percent,
    accent,
    size = 64,
    strokeWidth = 6,
}: {
    percent: number;
    accent: string;
    size?: number;
    strokeWidth?: number;
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset =
        circumference -
        (Math.min(100, Math.max(0, percent)) / 100) * circumference;

    return (
        <div
            className="relative inline-flex shrink-0 items-center justify-center"
            style={{ width: size, height: size }}
        >
            <svg width={size} height={size} className="-rotate-90 transform">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={`color-mix(in srgb, ${accent} 25%, var(--color-bdc-primary))`}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={accent}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                />
            </svg>
            <span className="text-text-contrast absolute text-xs font-black sm:text-sm">
                {percent}%
            </span>
        </div>
    );
}

/** Thanh tiêu đề dính trên cùng cho lộ trình theo chủ đề (Tích hợp nút Pin chủ đề vào Sidebar). */
export function TopicPathHeader({
    book,
    topic,
    accent,
    overallPercent,
    lessonCount,
    showFurigana,
    completedCount = 0,
    totalCount = 0,
}: Props) {
    const t = useTranslations("marugoto");
    const { togglePinTopic, isTopicPinned } = usePinnedTopics();
    const [vocabOpen, setVocabOpen] = useState(false);

    const topicPinId = `${book.id}-${topic.id}`;
    const isPinned = isTopicPinned(topicPinId);

    const handleVocabClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setVocabOpen(true);
    };

    const handlePinToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        togglePinTopic({
            id: topicPinId,
            bookId: book.id,
            topicId: topic.id,
            title: topic.jpTitle || `Chủ đề ${topic.order}`,
            url: `/books/${book.id}/topics/${topic.id}`,
            bookTitle: book.title,
            bookLevel: book.level,
            bookCoverImage: book.coverImage,
            bookCoverColor: book.coverColor,
            topicOrder: topic.order,
            topicTitle: topic.jpTitle,
            topicFuriganaMarkup: topic.furiganaMarkup,
            topicEnTitle: topic.enTitle,
        });
        if (isPinned) {
            toast.info(t("path.unpinnedToast"));
        } else {
            toast.success(t("path.pinnedToast"));
        }
    };

    return (
        <>
            <header className="group sticky top-20 z-40 mx-auto w-full max-w-4xl px-2 select-none sm:px-0">
                <div
                    className="border-bdc-primary bg-bgc-app/95 dark:bg-bgc-modal/95 overflow-hidden rounded-2xl border shadow-md backdrop-blur-xl transition-all duration-500 ease-out group-hover:shadow-2xl"
                    style={{
                        borderColor: `color-mix(in srgb, ${accent} 35%, var(--color-bdc-primary))`,
                        background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 14%, var(--color-bgc-app)) 0%, var(--color-bgc-app) 75%)`,
                    }}
                >
                    {/* Top Bar: Back Button on Left + Vocab Button & Pin Button on Right */}
                    <div
                        className="flex items-center justify-between border-b px-3 py-2.5 sm:px-4"
                        style={{
                            borderColor: `color-mix(in srgb, ${accent} 25%, var(--color-bdc-primary))`,
                        }}
                    >
                        <BackButton
                            href={`/books/${book.id}`}
                            label={t("path.backToTopic")}
                            className="hover:bg-hbgc-app text-text-contrast border-transparent bg-transparent px-2.5 py-1.5 font-bold shadow-none hover:border-transparent hover:shadow-none"
                        />

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleVocabClick}
                                className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-extrabold shadow-2xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                                style={{
                                    borderColor: `color-mix(in srgb, ${accent} 45%, var(--color-bdc-primary))`,
                                    background: `color-mix(in srgb, ${accent} 15%, var(--color-bgc-app))`,
                                    color: accent,
                                }}
                            >
                                <BookOpen className="h-4 w-4" />
                                <span>{t("path.topicVocabList")}</span>
                            </button>

                            <button
                                type="button"
                                onClick={handlePinToggle}
                                title={
                                    isPinned
                                        ? t("path.unpinTopic")
                                        : t("path.pinTopic")
                                }
                                className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xl border p-2 text-xs font-bold shadow-2xs transition-all duration-300 hover:scale-[1.05] active:scale-[0.95]"
                                style={{
                                    borderColor: `color-mix(in srgb, ${accent} 45%, var(--color-bdc-primary))`,
                                    background: isPinned
                                        ? accent
                                        : `color-mix(in srgb, ${accent} 15%, var(--color-bgc-app))`,
                                    color: isPinned ? "#ffffff" : accent,
                                }}
                            >
                                <Pin
                                    className={`h-4 w-4 ${isPinned ? "rotate-45 fill-current" : ""}`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Expandable Body Section: Revealed on Hover */}
                    <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                            <div className="flex flex-col gap-5 p-5 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
                                {/* Left Side: Topic Info */}
                                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
                                    <p
                                        className="text-[11px] font-black tracking-[0.16em] uppercase"
                                        style={{ color: accent }}
                                    >
                                        {t("topic.label", {
                                            index: topic.order,
                                        })}{" "}
                                        · {book.level}
                                    </p>
                                    <h2 className="text-text-contrast text-2xl leading-tight font-black md:text-3xl">
                                        <FuriganaHtml
                                            text={topic.jpTitle}
                                            markup={topic.furiganaMarkup}
                                            showFurigana={showFurigana}
                                        />
                                    </h2>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        <span
                                            className="text-text-contrast inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold"
                                            style={{
                                                borderColor: `color-mix(in srgb, ${accent} 35%, var(--color-bdc-primary))`,
                                                background: `color-mix(in srgb, ${accent} 12%, var(--color-bgc-app))`,
                                            }}
                                        >
                                            <LayoutGrid
                                                className="h-3.5 w-3.5"
                                                style={{ color: accent }}
                                            />
                                            {t("books.lessonCount", {
                                                count: lessonCount,
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* Right Side: Circle Progress Indicator & Metrics */}
                                <div
                                    className="flex shrink-0 items-center gap-4 border-t pt-4 sm:w-64 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6"
                                    style={{
                                        borderColor: `color-mix(in srgb, ${accent} 25%, var(--color-bdc-primary))`,
                                    }}
                                >
                                    <CircleProgress
                                        percent={overallPercent}
                                        accent={accent}
                                        size={64}
                                    />
                                    <div className="flex min-w-0 flex-col gap-1">
                                        <p className="text-text-muted text-xs font-bold">
                                            {t("path.topicProgress")}
                                        </p>
                                        <p className="text-text-contrast truncate text-sm font-black">
                                            {t("books.lessonsDone", {
                                                done: completedCount,
                                                total: totalCount,
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <TopicVocabDialog
                topicId={topic.id}
                open={vocabOpen}
                onClose={() => setVocabOpen(false)}
            />
        </>
    );
}

export default TopicPathHeader;
