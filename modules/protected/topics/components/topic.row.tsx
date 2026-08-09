"use client";
import React from "react";
import { ArrowRight, BookText, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FuriganaHtml } from "@/components/ui/furigana.html";
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
    const locked = view.status === "locked";
    const tone = locked ? "var(--color-text-muted)" : accent;

    const inner = (
        <>
            <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-black text-white shadow-sm"
                style={{
                    background: `linear-gradient(135deg, ${tone}, color-mix(in srgb, ${tone} 72%, #000))`,
                }}
            >
                {locked ? (
                    <Lock className="h-5 w-5" />
                ) : (
                    String(topic.order).padStart(2, "0")
                )}
            </div>

            <div className="min-w-0 flex-1">
                <p
                    className="text-[11px] font-bold tracking-[0.16em] uppercase"
                    style={{ color: tone }}
                >
                    {t("topic.label", { index: topic.order })}
                </p>
                <p className="text-text-contrast truncate text-base font-bold">
                    <FuriganaHtml
                        text={topic.jpTitle}
                        markup={topic.furiganaMarkup}
                    />
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
                style={{ background: tone }}
            >
                {locked ? t("lesson.needUnlock") : t("lesson.enter")}
                {locked ? (
                    <Lock className="h-4 w-4" />
                ) : (
                    <ArrowRight className="h-4 w-4" />
                )}
            </span>
        </>
    );

    const className =
        "group bg-bgc-app flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left shadow-sm transition-all";
    const style = {
        borderColor: `color-mix(in srgb, ${tone} 22%, var(--color-bdc-primary))`,
    };

    if (locked) {
        return (
            <div
                className={`${className} cursor-not-allowed opacity-60`}
                style={style}
            >
                {inner}
            </div>
        );
    }

    return (
        <Link
            href={`/books/${bookId}/topics/${topic.id}`}
            className={`${className} hover:-translate-y-0.5 hover:shadow-md`}
            style={style}
        >
            {inner}
        </Link>
    );
}

export default TopicRow;
