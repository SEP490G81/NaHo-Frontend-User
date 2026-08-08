"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import { FuriganaHtml } from "@/components/ui/furigana.html";

interface Props {
    backHref: string;
    japanese: string;
    japaneseMarkup?: string | null;
    description?: string | null;
    descriptionMarkup?: string | null;
    showFurigana: boolean;
    accent: string;
}

/** Đầu trang chi tiết câu hỏi: nút quay lại + đề bài (furigana). */
export function QuestionDetailHeader({
    backHref,
    japanese,
    japaneseMarkup,
    description,
    descriptionMarkup,
    showFurigana,
    accent,
}: Props) {
    const t = useTranslations("marugoto.questionDetail");

    return (
        <div className="space-y-3">
            <Link
                href={backHref as AllRoute}
                className="text-text-muted hover:text-text-contrast inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                {t("back")}
            </Link>

            <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-6 shadow-sm">
                <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase"
                    style={{
                        background: `color-mix(in srgb, ${accent} 15%, transparent)`,
                        color: accent,
                    }}
                >
                    {t("badge")}
                </span>
                <h1 className="text-text-contrast mt-2 text-2xl leading-snug font-bold">
                    <FuriganaHtml
                        text={japanese}
                        markup={japaneseMarkup}
                        showFurigana={showFurigana}
                    />
                </h1>
                {(descriptionMarkup || description) && (
                    <p className="text-text-muted mt-2 text-sm">
                        <FuriganaHtml
                            text={description ?? ""}
                            markup={descriptionMarkup}
                            showFurigana={showFurigana}
                        />
                    </p>
                )}
            </div>
        </div>
    );
}

export default QuestionDetailHeader;
