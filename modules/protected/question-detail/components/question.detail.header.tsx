"use client";
import React from "react";
import { ArrowLeft, Flag } from "lucide-react";
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
    vietnamese?: string | null;
    showFurigana: boolean;
    accent: string;
    /** Bỏ trống nếu chưa muốn hiện nút báo cáo câu hỏi. */
    onReport?: () => void;
}

/** Đầu trang chi tiết câu hỏi: nút quay lại + đề bài (furigana) + bản dịch tiếng Việt. */
export function QuestionDetailHeader({
    backHref,
    japanese,
    japaneseMarkup,
    description,
    descriptionMarkup,
    vietnamese,
    showFurigana,
    accent,
    onReport,
}: Props) {
    const t = useTranslations("marugoto.questionDetail");

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Link
                    href={backHref as AllRoute}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
                    style={{ color: accent }}
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t("back")}
                </Link>
                {onReport && (
                    <button
                        type="button"
                        onClick={onReport}
                        className="text-text-muted hover:text-text-error inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                    >
                        <Flag className="h-3.5 w-3.5" />
                        {t("report")}
                    </button>
                )}
            </div>

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
                {vietnamese?.trim() && (
                    <div className="border-bdc-primary mt-2 border-t pt-2">
                        <p className="text-text-muted text-[11px] font-semibold tracking-wide uppercase">
                            {t("translation")}
                        </p>
                        <p className="text-text-muted mt-0.5 text-sm">
                            {vietnamese}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionDetailHeader;
