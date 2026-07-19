"use client";
import React from "react";
import { CalendarClock, Clock, Sparkles } from "lucide-react";

interface Props {
    score: number;
    durationSec: number;
    practicedAt: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    t: any;
}

function formatDate(iso: string): string {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString();
}

/** Thẻ tóm tắt phiên luyện nói (điểm tổng, thời lượng, thời điểm) cho báo cáo BE. */
export function HistoryDetailSummary({ score, durationSec, practicedAt, t }: Props) {
    return (
        <section className="border-bdc-primary bg-bgc-app flex flex-wrap items-center gap-5 rounded-2xl border p-5 md:p-6">
            <div className="bg-bgc-highlight/12 text-bgc-highlight flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl">
                <span className="text-2xl leading-none font-black">
                    {score.toFixed(1)}
                </span>
                <span className="text-[10px] font-semibold">/10</span>
            </div>

            <div className="min-w-0 flex-1">
                <h2 className="text-text-contrast flex items-center gap-2 text-lg font-bold">
                    <Sparkles className="text-bgc-highlight h-5 w-5" />
                    {t("reportTitle")}
                </h2>
                <div className="text-text-muted mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    <span className="inline-flex items-center gap-1.5">
                        <CalendarClock className="h-4 w-4" />
                        {t("practicedAtLabel")}: {formatDate(practicedAt)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {t("durationLabel")}: {durationSec}s
                    </span>
                </div>
            </div>
        </section>
    );
}

export default HistoryDetailSummary;
