"use client";
import React, { useMemo } from "react";
import {
    CalendarClock,
    ChevronRight,
    Clock,
    ListChecks,
    Mic,
    Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import { getSpeakingHistoryDetail } from "@/services/client/speaking.service";
import { mapSpeakingReport } from "../utils/speaking.mapper";
import HistoryDetailOverview from "../components/history.detail.overview";
import HistoryDetailTabs from "../components/history.detail.tabs";

function formatDate(iso: string): string {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
}

/** Màn báo cáo chi tiết bài luyện (GET /history/{id}). */
export function SpeakingResultView({ historyId }: { historyId: string }) {
    const t = useTranslations("historyDetail");
    const searchParams = useSearchParams();
    const showFurigana = true;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["speaking-history", historyId],
        queryFn: () => getSpeakingHistoryDetail(historyId),
        enabled: !!historyId,
    });

    const report = useMemo(
        () => (data ? mapSpeakingReport(data.report) : null),
        [data],
    );


    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-text-muted">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (isError || !data || !report) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-text-contrast text-2xl font-bold">
                    {t("notFoundTitle")}
                </h2>
                <p className="text-text-muted">{t("notFoundSubtitle")}</p>
                <Button
                    component={Link}
                    href="/history"
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-pure)",
                        fontWeight: "bold",
                    }}
                >
                    {t("backToHistory")}
                </Button>
            </div>
        );
    }

    // Mở lại đúng sandbox câu này: ưu tiên ngữ cảnh từ BE, thiếu thì lấy từ URL.
    const node = data.learningPathNodeId ?? searchParams.get("node");
    const book = data.bookId ?? searchParams.get("book");
    const topic = data.topicId ?? searchParams.get("topic");
    const ctx = new URLSearchParams();
    if (node) ctx.set("node", String(node));
    if (book) ctx.set("book", String(book));
    if (topic) ctx.set("topic", String(topic));
    const qs = ctx.toString();
    const topicHref =
        book && topic ? `/books/${book}/topics/${topic}` : null;
    const retryHref =
        data.questionId != null
            ? `/sandbox/${data.questionId}${qs ? `?${qs}` : ""}`
            : "/history";

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-6xl space-y-6">
                {/* Hero + thông tin phiên luyện (gộp làm một) */}
                <div className="border-bdc-primary bg-bgc-app rounded-2xl border px-5 py-4">
                    <div className="flex items-center gap-3">
                        <span className="bg-bgc-highlight/15 text-bgc-highlight flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
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
                    {data.speakingQuestionTitle && (
                        <div className="border-bdc-primary mt-3 border-t pt-3">
                            <p className="text-text-muted text-[11px] font-bold tracking-[0.14em] uppercase">
                                {t("questionTitle")}
                            </p>
                            <p className="text-text-contrast mt-0.5 font-semibold">
                                {data.speakingQuestionTitle}
                            </p>
                            {data.topicName &&
                                (topicHref ? (
                                    <Link
                                        href={topicHref as AllRoute}
                                        className="text-text-highlight hover:text-bgc-highlight inline-flex items-center gap-1 text-xs font-medium"
                                    >
                                        {data.topicName}
                                        <ChevronRight className="h-3 w-3" />
                                    </Link>
                                ) : (
                                    <p className="text-text-muted text-xs">
                                        {data.topicName}
                                    </p>
                                ))}
                        </div>
                    )}

                    <div className="border-bdc-primary text-text-muted mt-3 flex flex-wrap gap-x-5 gap-y-1 border-t pt-3 text-sm">
                        <span className="inline-flex items-center gap-1.5">
                            <CalendarClock className="h-4 w-4" />
                            {t("practicedAtLabel")}: {formatDate(data.practicedAt)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {t("durationLabel")}: {data.durationSec}s
                        </span>
                    </div>
                </div>

                {data.audioUrl && (
                    <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5">
                        <p className="text-text-contrast mb-2 text-sm font-semibold">
                            {t("yourSpeech")}
                        </p>
                        <audio
                            controls
                            src={data.audioUrl}
                            className="w-full"
                            preload="none"
                        />
                    </div>
                )}

                <HistoryDetailOverview report={report} t={t} />

                <HistoryDetailTabs
                    report={report}
                    showFurigana={showFurigana}
                    t={t}
                />

                <div className="sticky bottom-4 z-10 flex flex-wrap justify-center gap-3 md:static md:justify-end">
                    <Button
                        component={Link}
                        href="/history"
                        variant="outlined"
                        startIcon={<ListChecks className="h-4 w-4" />}
                        sx={{
                            textTransform: "none",
                            borderColor: "var(--color-bdc-muted)",
                            color: "var(--color-text-contrast)",
                            fontWeight: 600,
                            "&:hover": {
                                borderColor: "var(--color-bdc-primary)",
                                backgroundColor: "var(--color-hbgc-app)",
                            },
                        }}
                    >
                        {t("viewAllBtn")}
                    </Button>
                    <Button
                        component={Link}
                        href={retryHref as AllRoute}
                        variant="contained"
                        startIcon={<Mic className="h-4 w-4" />}
                        sx={{
                            textTransform: "none",
                            backgroundColor: "var(--color-bgc-highlight)",
                            color: "var(--color-text-pure)",
                            fontWeight: 700,
                            "&:hover": {
                                backgroundColor: "var(--color-bgc-highlight)",
                                filter: "brightness(0.95)",
                            },
                        }}
                    >
                        {t("retryBtn")}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SpeakingResultView;
