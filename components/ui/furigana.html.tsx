"use client";
import React from "react";
import { cn } from "@/libs/utils";
import { useFurigana } from "@/components/providers/app.toggle.furigana.provider";

export interface FuriganaHtmlProps {
    text: string;
    markup?: string | null;
    showFurigana?: boolean;
    className?: string;
    as?: React.ElementType;
}

/**
 * Render tiếng Nhật:
 * - Khi showFurigana = true và có `markup` (chuỗi HTML chứa `<ruby>` từ BE), render markup bằng `dangerouslySetInnerHTML`.
 * - Khi showFurigana = false hoặc không có `markup`, render `text` thô.
 */
export function FuriganaHtml({
    text,
    markup,
    showFurigana: propShowFurigana,
    className,
    as: Component = "span",
}: FuriganaHtmlProps) {
    const furiganaCtx = useFurigana();
    const isFuriganaActive =
        propShowFurigana ?? furiganaCtx?.showFurigana ?? true;

    if (isFuriganaActive && markup) {
        return (
            <Component
                className={cn(
                    "font-noto-jp [&>p]:inline [&>p]:m-0 [&>ruby>rt]:text-text-muted [&>ruby>rt]:text-[0.6em] [&>ruby>rt]:font-normal",
                    className,
                )}
                dangerouslySetInnerHTML={{ __html: markup }}
            />
        );
    }

    return (
        <Component className={cn("font-noto-jp", className)}>
            {text}
        </Component>
    );
}

export default FuriganaHtml;
