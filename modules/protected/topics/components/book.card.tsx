"use client";
import React from "react";
import { ArrowRight, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import BookCover from "@/components/ui/book.cover";
import type { MarugotoBook } from "@/data/marugoto/types";

interface BookCardProps {
    book: MarugotoBook;
    /** Mở khóa theo tiến độ thật (frontier đã tới node đầu của quyển). */
    unlocked: boolean;
    /** Quyển đang học (frontier nằm trong khoảng node của quyển). */
    current: boolean;
}

export function BookCard({ book, unlocked, current }: BookCardProps) {
    const t = useTranslations("marugoto");
    const navigable = unlocked;
    const accent = book.coverColor ?? "var(--color-bgc-highlight)";

    const inner = (
        <div
            data-tour-id={current ? "tour-marugoto-book" : undefined}
            className={cn(
                "group bg-bgc-app relative flex flex-col overflow-hidden rounded-2xl border transition-all",
                current
                    ? "border-bgc-highlight shadow-md"
                    : "border-bdc-primary hover:border-bgc-highlight/60 hover:shadow-md",
                !unlocked && "opacity-75",
            )}
        >
            <div className="bg-bgc-page relative overflow-hidden">
                {/* Bìa dọc; khung ngắn hơn ảnh + neo đỉnh (object-top) để cắt bớt
                    dải trắng/viền đáy của bìa gốc, tránh khoảng trống & line đen. */}
                <BookCover
                    book={book}
                    className="aspect-[7/8] w-full transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {current && (
                    <span
                        className="text-text-pure absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold shadow"
                        style={{ background: "var(--color-bgc-highlight)" }}
                    >
                        {t("books.current")}
                    </span>
                )}
                {/* Chip trình độ (band CEFR) — màu theo band để thấy phân cấp. */}
                <span
                    className="absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow"
                    style={{ background: accent }}
                >
                    {book.level}
                </span>
                {!unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <Lock className="h-8 w-8 text-white/90" />
                    </div>
                )}
            </div>

            <div className="space-y-1 p-4">
                <p className="text-text-contrast line-clamp-1 font-bold">
                    {book.title}
                </p>
                <p className="text-text-muted line-clamp-2 text-xs">
                    {book.subtitle}
                </p>
                {navigable ? (
                    <p
                        className="inline-flex items-center gap-1.5 pt-0.5 text-sm font-semibold"
                        style={{ color: accent }}
                    >
                        {t("lesson.enter")}
                        <ArrowRight className="h-4 w-4" />
                    </p>
                ) : (
                    <p className="text-text-muted inline-flex items-center gap-1.5 pt-0.5 text-sm font-semibold">
                        <Lock className="h-3.5 w-3.5" />
                        {t("status.locked")}
                    </p>
                )}
            </div>
        </div>
    );

    if (!navigable) {
        return (
            <div className="w-full cursor-not-allowed text-left">{inner}</div>
        );
    }

    return (
        <Link href={`/books/${book.id}`} className="block">
            {inner}
        </Link>
    );
}

export default BookCard;
