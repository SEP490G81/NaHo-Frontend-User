"use client";
import React, { useMemo } from "react";
import { ListChecks, Mic } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import { getSpeakingHistoryDetail } from "@/services/client/speaking.service";
import { getBookDetail, getTopicDetail } from "@/services/client/book.service";
import { mapBook } from "@/data/marugoto/mapper";
import { mapSpeakingReport } from "../utils/speaking.mapper";
import ReportHero from "../components/report.hero";
import HistoryDetailOverview from "../components/history.detail.overview";
import HistoryDetailTabs from "../components/history.detail.tabs";

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

    const bookId = data?.bookId ?? searchParams.get("book");
    const topicId = data?.topicId ?? searchParams.get("topic");

    // Màu chủ đạo theo quyển sách của câu hỏi (đồng bộ tone với lộ trình).
    const bookQ = useQuery({
        queryKey: ["book", String(bookId)],
        queryFn: () => getBookDetail(String(bookId)),
        enabled: !!bookId,
    });
    // Thứ tự chủ đề để hiển thị "Chủ đề N · tên".
    const topicQ = useQuery({
        queryKey: ["topic", String(topicId)],
        queryFn: () => getTopicDetail(String(topicId)),
        enabled: !!topicId,
    });

    const accent = bookQ.data
        ? (mapBook(bookQ.data).coverColor ?? "var(--color-bgc-highlight)")
        : "var(--color-bgc-highlight)";

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
                    href="/speaking-history"
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
    const ctx = new URLSearchParams();
    if (node) ctx.set("node", String(node));
    if (bookId) ctx.set("book", String(bookId));
    if (topicId) ctx.set("topic", String(topicId));
    const qs = ctx.toString();
    const topicHref =
        bookId && topicId ? `/books/${bookId}/topics/${topicId}` : null;
    const topicLabel =
        topicQ.data?.orderIndex != null
            ? t("topicLabel", { index: topicQ.data.orderIndex })
            : null;
    const retryHref =
        data.questionId != null
            ? `/sandbox/${data.questionId}${qs ? `?${qs}` : ""}`
            : "/speaking-history";

    return (
        <div style={{ "--book-accent": accent } as React.CSSProperties}>
            <div className="space-y-6">
                <ReportHero
                    average={report.average}
                    questionTitle={data.speakingQuestionTitle}
                    topicName={data.topicName}
                    topicLabel={topicLabel}
                    topicHref={topicHref}
                    practicedAt={data.practicedAt}
                    durationSec={data.durationSec}
                    audioUrl={data.audioUrl}
                    accent={accent}
                />

                <HistoryDetailOverview report={report} accent={accent} />

                <HistoryDetailTabs
                    report={report}
                    showFurigana={showFurigana}
                />

                <div className="sticky bottom-4 z-10 flex flex-wrap justify-center gap-3 md:static md:justify-end">
                    <Button
                        component={Link}
                        href="/speaking-history"
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
                            backgroundColor: accent,
                            color: "#fff",
                            fontWeight: 700,
                            "&:hover": {
                                backgroundColor: accent,
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
