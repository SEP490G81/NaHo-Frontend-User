"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/libs/utils";
import type { MarugotoBook } from "@/data/marugoto/types";

interface BookCoverProps {
    book: MarugotoBook;
    className?: string;
}

const DEFAULT_COLOR = "#d76a99";

/**
 * Bìa sách: nếu có `coverImage` (ảnh thật) → hiển thị ảnh; nếu chưa có →
 * bìa màu generated (mock) với cấp độ + tên sách. Kích thước theo `className`.
 */
export function BookCover({ book, className }: BookCoverProps) {
    if (book.coverImage) {
        return (
            <div className={cn("relative overflow-hidden", className)}>
                <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    sizes="320px"
                    // Neo lệch xuống ~4% để cắt vạch xám ở mép trên của ảnh gốc,
                    // đồng thời vẫn cắt bớt dải trắng phía dưới bìa.
                    className="scale-[1.02] object-cover object-[50%_4%]"
                />
            </div>
        );
    }

    const color = book.coverColor ?? DEFAULT_COLOR;
    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center overflow-hidden text-white",
                className,
            )}
            style={{ background: color }}
        >
            {/* Vệt sáng chéo trang trí */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 45%)",
                }}
            />
            <span className="relative text-[11px] font-bold tracking-[0.3em] uppercase opacity-85">
                Marugoto
            </span>
            <span className="relative text-4xl font-black drop-shadow-sm md:text-5xl">
                {book.level}
            </span>
            <span className="relative mt-1.5 px-3 text-center text-xs font-medium opacity-90">
                {book.title}
            </span>
        </div>
    );
}

export default BookCover;
