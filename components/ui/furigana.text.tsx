"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface FuriganaTextProps {
    text: string;
    furigana: string;
    className?: string;
    /** Khi false, chỉ hiển thị text tiếng Nhật thô không có chữ phiên âm ruby phía trên */
    showFurigana?: boolean;
}

/**
 * Hiển thị văn bản tiếng Nhật đi kèm chữ phiên âm ruby (furigana) đặt bên trên Kanji.
 */
export function FuriganaText({
    text,
    furigana,
    className,
    showFurigana = true,
}: FuriganaTextProps) {
    if (!showFurigana) {
        return <span className={cn("font-noto-jp", className)}>{text}</span>;
    }
    return (
        <ruby
            className={cn(
                "ruby-text font-noto-jp [&>rt]:text-[0.6em] [&>rt]:text-text-muted [&>rt]:font-normal",
                className,
            )}
        >
            {text}
            <rt>{furigana}</rt>
        </ruby>
    );
}

export default FuriganaText;
