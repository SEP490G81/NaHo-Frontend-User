"use client";
import React from "react";
import { ArrowRight, BookText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import FuriganaText from "@/components/ui/furigana.text";
import FuriganaMarkup from "@/components/ui/furigana.markup";
import type { TopicView } from "../utils/unlock";

interface Props {
    view: TopicView;
    bookId: string;
    accent: string;
}

/** Một hàng chủ đề trong thư viện sách — bấm để vào lộ trình node của cả chủ đề. */
export function TopicRow({ view, bookId, accent }: Props) {
    const t = useTranslations("marugoto");
    const { topic } = view;
    const lessonCount = topic.lessons.length;

    return (
        <Link
            href={`/books/${bookId}/topics/${topic.id}`}
            className="group bg-bgc-app flex items-center gap-4 rounded-2xl border px-5 py-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{
                borderColor: `color-mix(in srgb, ${accent} 22%, var(--color-bdc-primary))`,
            }}
        >
            <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-black text-white shadow-sm"
                style={{
                    background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 72%, #000))`,
                }}
            >
                {String(topic.order).padStart(2, "0")}
            </div>

            <div className="min-w-0 flex-1">
                <p
                    className="text-[11px] font-bold tracking-[0.16em] uppercase"
                    style={{ color: accent }}
                >
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
                </p>
            </div>

            {lessonCount > 0 && (
                <span className="text-text-muted hidden shrink-0 items-center gap-1.5 text-xs font-semibold sm:inline-flex">
                    <BookText className="h-4 w-4" />
                    {t("topic.lessonCount", { count: lessonCount })}
                </span>
            )}

            <span
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-transform group-hover:scale-[1.03]"
                style={{ background: accent }}
            >
                {t("lesson.enter")}
                <ArrowRight className="h-4 w-4" />
            </span>
        </Link>
    );
}

export default TopicRow;
