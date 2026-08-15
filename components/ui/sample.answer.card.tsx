"use client";
import React, { useState } from "react";
import { ChevronDown, Lock, Sparkles, Volume2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { FuriganaHtml } from "@/components/ui/furigana.html";
import { isSpeechSupported, speakJa } from "@/libs/tts";

interface Props {
    japanese: string;
    japaneseMarkup?: string | null;
    vietnamese?: string | null;
    showFurigana: boolean;
    accent: string;
    /** true = ẩn sau nút "Xem gợi ý câu mẫu" (dùng ở sandbox). */
    collapsible?: boolean;
    /** Khi collapsible, có mở sẵn hay không. */
    defaultOpen?: boolean;
    /** Gói đăng ký không cho xem câu mẫu → hiện thông báo nâng cấp. */
    locked?: boolean;
}

/** Thẻ câu trả lời mẫu (JP + furigana + bản dịch) kèm nút phát âm TTS. */
export function SampleAnswerCard({
    japanese,
    japaneseMarkup,
    vietnamese,
    showFurigana,
    accent,
    collapsible = false,
    defaultOpen = false,
    locked = false,
}: Props) {
    const t = useTranslations("marugoto.sampleAnswer");
    const [open, setOpen] = useState(!collapsible || defaultOpen);
    const canSpeak = isSpeechSupported();

    if (locked) {
        return (
            <div className="border-bdc-primary bg-bgc-app text-text-muted flex items-center gap-2 rounded-2xl border border-dashed p-4 text-sm">
                <Lock className="h-4 w-4 shrink-0" />
                {t("locked")}
            </div>
        );
    }

    if (!japanese?.trim()) {
        return <p className="text-text-muted text-sm italic">{t("empty")}</p>;
    }

    return (
        <div
            className="rounded-2xl border p-4"
            style={{
                borderColor: `color-mix(in srgb, ${accent} 26%, var(--color-bdc-primary))`,
                background: `color-mix(in srgb, ${accent} 5%, var(--color-bgc-app))`,
            }}
        >
            <div className="flex items-center justify-between gap-2">
                <div
                    className="flex items-center gap-2 text-sm font-bold"
                    style={{ color: accent }}
                >
                    <Sparkles className="h-4 w-4" />
                    {t("title")}
                </div>
                {collapsible && (
                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        className="text-text-muted hover:text-text-contrast flex items-center gap-1 text-xs font-semibold"
                    >
                        {open ? t("hide") : t("reveal")}
                        <ChevronDown
                            className={cn(
                                "h-4 w-4 transition-transform",
                                open && "rotate-180",
                            )}
                        />
                    </button>
                )}
            </div>

            {open && (
                <div className="mt-3 space-y-3">
                    <div className="flex items-start gap-2">
                        <p className="text-text-contrast flex-1 text-lg leading-relaxed font-medium">
                            <FuriganaHtml
                                text={japanese}
                                markup={japaneseMarkup}
                                showFurigana={showFurigana}
                            />
                        </p>
                        {canSpeak && (
                            <button
                                type="button"
                                onClick={() => speakJa(japanese)}
                                aria-label={t("speak")}
                                title={t("speak")}
                                className="text-text-pure shrink-0 rounded-full p-2 transition-transform hover:scale-105"
                                style={{ background: accent }}
                            >
                                <Volume2 className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {vietnamese?.trim() && (
                        <div className="border-bdc-primary border-t pt-2">
                            <p className="text-text-muted text-[11px] font-semibold tracking-wide uppercase">
                                {t("translation")}
                            </p>
                            <p className="text-text-muted mt-0.5 text-sm">
                                {vietnamese}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default SampleAnswerCard;
