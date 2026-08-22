"use client";
import React from "react";
import {
    AlertTriangle,
    CalendarClock,
    ChevronRight,
    Clock,
    Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import { FuriganaHtml } from "@/components/ui/furigana.html";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import ScoreGauge from "./score.gauge";

interface Props {
    average: number;
    questionTitle: string;
    questionTitleMarkup?: string | null;
    questionTranslation?: string | null;
    showFurigana: boolean;
    topicName?: string | null;
    topicLabel?: string | null;
    topicHref?: string | null;
    practicedAt?: string | null;
    durationSec: number | null;
    /** null = không có file ghi âm nào; "" = có file nhưng chưa có accessUrl (upload thất bại/đang chờ upload lại). */
    audioUrl: string | null;
    hasAudioFile: boolean;
    accent: string;
}

function fmt(iso: string): string {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("vi-VN");
}

/** Hero báo cáo: điểm tổng (màu sách) + câu hỏi + chủ đề nổi bật + audio. */
export function ReportHero({
    average,
    questionTitle,
    questionTitleMarkup,
    questionTranslation,
    showFurigana,
    topicName,
    topicLabel,
    topicHref,
    practicedAt,
    durationSec,
    audioUrl,
    hasAudioFile,
    accent,
}: Props) {
    const t = useTranslations("historyDetail");
    const topicText = topicLabel ? `${topicLabel} · ${topicName}` : topicName;

    const softBorder = `color-mix(in srgb, ${accent} 18%, var(--color-bdc-primary))`;

    return (
        <div
            className="space-y-5 rounded-2xl border p-5 shadow-sm md:p-6"
            style={{
                borderColor: `color-mix(in srgb, ${accent} 26%, var(--color-bdc-primary))`,
                background: `linear-gradient(180deg, color-mix(in srgb, ${accent} 12%, var(--color-bgc-app)) 0%, var(--color-bgc-app) 70%)`,
            }}
        >
            <div className="flex items-center gap-3">
                <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                    style={{ background: accent }}
                >
                    <Sparkles className="h-5 w-5" />
                </span>
                <div>
                    <h1 className="text-text-contrast text-xl font-bold md:text-2xl">
                        {t("reportTitle")}
                    </h1>
                    <p className="text-text-muted text-sm">
                        {t("reportSubtitle")}
                    </p>
                </div>
            </div>

            <div className="border-t pt-5" style={{ borderColor: softBorder }}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex shrink-0 justify-center">
                        <ScoreGauge score={average} color={accent} />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2.5">
                        <p
                            className="text-[11px] font-bold tracking-[0.16em] uppercase"
                            style={{ color: accent }}
                        >
                            {t("questionTitle")}
                        </p>
                        {questionTitle && (
                            <p className="text-text-contrast text-lg leading-snug font-bold">
                                <FuriganaHtml
                                    text={questionTitle}
                                    markup={questionTitleMarkup}
                                    showFurigana={showFurigana}
                                />
                            </p>
                        )}
                        {questionTranslation?.trim() && (
                            <p className="text-text-muted text-sm">
                                {questionTranslation}
                            </p>
                        )}
                        {topicText &&
                            (topicHref ? (
                                <Link
                                    href={topicHref as AllRoute}
                                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
                                    style={{ background: accent }}
                                >
                                    {topicText}
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            ) : (
                                <span
                                    className="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold"
                                    style={{
                                        color: accent,
                                        background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                                    }}
                                >
                                    {topicText}
                                </span>
                            ))}
                        {(practicedAt || durationSec != null) && (
                            <div className="text-text-muted flex flex-wrap gap-x-5 gap-y-1 pt-1 text-sm">
                                {practicedAt && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <CalendarClock className="h-4 w-4" />
                                        {fmt(practicedAt)}
                                    </span>
                                )}
                                {durationSec != null && (
                                    <span className="inline-flex items-center gap-1.5">
                                        <Clock className="h-4 w-4" />
                                        {t("durationLabel")}:{" "}
                                        {Math.round(durationSec)}s
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div
                    className="mt-5 border-t pt-4"
                    style={{ borderColor: softBorder }}
                >
                    <p className="text-text-contrast mb-2 text-sm font-semibold">
                        {t("yourSpeech")}
                    </p>
                    {audioUrl ? (
                        <audio
                            controls
                            src={audioUrl}
                            className="w-full cursor-pointer"
                            preload="none"
                        />
                    ) : hasAudioFile ? (
                        <TooltipCustom title={t("audioUploadFailed")}>
                            <span className="text-text-error inline-flex cursor-help items-center gap-1.5 text-sm">
                                <AlertTriangle className="h-4 w-4" />
                                {t("audioUploadFailed")}
                            </span>
                        </TooltipCustom>
                    ) : (
                        <span className="text-text-muted">—</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReportHero;
