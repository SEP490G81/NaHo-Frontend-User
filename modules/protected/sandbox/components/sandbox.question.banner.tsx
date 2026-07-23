"use client";
import React from "react";
import { Mic } from "lucide-react";
import { useTranslations } from "next-intl";
import FuriganaText from "@/components/ui/furigana.text";

interface Props {
    jp: string;
    furigana: string;
    vi: string;
    accent: string;
    showFurigana: boolean;
}

/** Dải tiêu đề câu hỏi (hiện xuyên suốt 3 bước) — tô màu sách để nhận biết ngữ cảnh. */
export function SandboxQuestionBanner({
    jp,
    furigana,
    vi,
    accent,
    showFurigana,
}: Props) {
    const t = useTranslations("sandbox");
    return (
        <div
            className="border-bdc-primary bg-bgc-app relative overflow-hidden rounded-2xl border p-5 pl-6"
            style={{
                background: `linear-gradient(90deg, color-mix(in srgb, ${accent} 8%, var(--color-bgc-app)), var(--color-bgc-app) 60%)`,
            }}
        >
            <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-1.5"
                style={{ background: accent }}
            />
            <div
                className="mb-1.5 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] uppercase"
                style={{ color: accent }}
            >
                <Mic className="h-3.5 w-3.5" />
                {t("speakQuestion")}
            </div>
            <h1 className="text-text-contrast text-xl leading-snug font-bold md:text-2xl">
                <FuriganaText
                    text={jp}
                    furigana={furigana}
                    showFurigana={showFurigana}
                />
            </h1>
            {vi && <p className="text-text-muted mt-1 text-sm">{vi}</p>}
        </div>
    );
}

export default SandboxQuestionBanner;
