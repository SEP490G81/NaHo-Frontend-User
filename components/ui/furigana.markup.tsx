"use client";
import React from "react";
import { cn } from "@/libs/utils";

interface Props {
    /** Chuỗi markup BE dạng "[漢字](かな)…text thường". */
    markup: string;
    className?: string;
    showFurigana?: boolean;
}

const SEGMENT = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Tách markup thành đoạn có ruby (base+reading) và đoạn text thường. */
function parse(markup: string): { base: string; reading?: string }[] {
    const out: { base: string; reading?: string }[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    SEGMENT.lastIndex = 0;
    while ((m = SEGMENT.exec(markup))) {
        if (m.index > last) out.push({ base: markup.slice(last, m.index) });
        out.push({ base: m[1], reading: m[2] });
        last = m.index + m[0].length;
    }
    if (last < markup.length) out.push({ base: markup.slice(last) });
    return out;
}

/**
 * Hiển thị tiếng Nhật kèm furigana từ chuỗi markup của BE. Mỗi đoạn `[漢字](かな)`
 * render ruby riêng, phần còn lại giữ nguyên. `showFurigana=false` chỉ hiện chữ gốc.
 */
export function FuriganaMarkup({ markup, className, showFurigana = true }: Props) {
    const parts = parse(markup);
    return (
        <span
            className={cn(
                "font-noto-jp [&>ruby>rt]:text-text-muted [&>ruby>rt]:text-[0.6em] [&>ruby>rt]:font-normal",
                className,
            )}
        >
            {parts.map((p, i) =>
                p.reading && showFurigana ? (
                    <ruby key={i}>
                        {p.base}
                        <rt>{p.reading}</rt>
                    </ruby>
                ) : (
                    <React.Fragment key={i}>{p.base}</React.Fragment>
                ),
            )}
        </span>
    );
}

export default FuriganaMarkup;
