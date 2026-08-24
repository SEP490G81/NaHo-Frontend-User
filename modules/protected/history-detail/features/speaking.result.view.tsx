"use client";
import React from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Flag, ListChecks, Mic } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button, type SxProps, type Theme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import { getAnswerHistoryDetail } from "@/services/client/speaking.service";
import { getBookDetail, getTopicDetail } from "@/services/client/book.service";
import { mapBook } from "@/data/marugoto/mapper";
import { PASS_SCORE } from "@/store/marugotoStore";
import { useFurigana } from "@/components/providers/app.toggle.furigana.provider";
import { useReportStore } from "@/store/reportStore";
import ReportHero from "../components/report.hero";
import HistoryDetailOverview from "../components/history.detail.overview";
import HistoryDetailTabs from "../components/history.detail.tabs";

/** Màn báo cáo chi tiết bài luyện — dùng chung cho lúc vừa nộp bài (cache được
 *  seed sẵn ở sandbox.tsx) lẫn khi mở lại từ danh sách lịch sử. */
export function SpeakingResultView({ historyId }: { historyId: string }) {
    const t = useTranslations("historyDetail");
    const searchParams = useSearchParams();
    const { showFurigana } = useFurigana();
    const openReport = useReportStore((s) => s.openModal);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["answer-history", historyId],
        queryFn: () => getAnswerHistoryDetail(historyId),
        enabled: !!historyId,
    });

    // AnswerHistoryResponse không kèm sách/chủ đề → lấy từ query string do
    // sandbox/danh sách lịch sử truyền sang (thiếu thì chỉ ẩn tag chủ đề).
    const bookId = searchParams.get("book");
    const topicId = searchParams.get("topic");
    const nodeId = searchParams.get("node");

    const bookQ = useQuery({
        queryKey: ["book", String(bookId)],
        queryFn: () => getBookDetail(String(bookId)),
        enabled: !!bookId,
    });
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

    if (isError || !data) {
        return (
            <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-text-contrast text-2xl font-bold">
                    {t("notFoundTitle")}
                </h2>
                <p className="text-text-muted">{t("notFoundSubtitle")}</p>
                <Button
                    component={Link}
                    href="/books"
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

    const ctx = new URLSearchParams();
    if (nodeId) ctx.set("node", nodeId);
    if (bookId) ctx.set("book", bookId);
    if (topicId) ctx.set("topic", topicId);
    const qs = ctx.toString();
    const topicHref =
        bookId && topicId ? `/books/${bookId}/topics/${topicId}` : null;
    const topicLabel =
        topicQ.data?.orderIndex != null
            ? t("topicLabel", { index: topicQ.data.orderIndex })
            : null;
    const retryHref = `/sandbox/${data.speakingQuestion.id}${qs ? `?${qs}` : ""}`;
    const average = data.overallScore ?? 0;
    // Đạt khi điểm tổng ≥ 7.5/10 (đồng bộ ngưỡng BE) → BE đã mở node kế.
    const passed = average >= PASS_SCORE;

    // Nhấn mạnh đổi theo kết quả (giữ nguyên thứ tự nút): đạt → nổi bật "Tiếp
    // tục"; chưa đạt → nổi bật "Luyện lại". Nút còn lại chuyển sang dạng viền.
    const emphSx: SxProps<Theme> = {
        textTransform: "none",
        backgroundColor: accent,
        color: "#fff",
        fontWeight: 700,
        "&:hover": { backgroundColor: accent, filter: "brightness(0.95)" },
    };
    const softSx: SxProps<Theme> = {
        textTransform: "none",
        borderColor: accent,
        color: accent,
        fontWeight: 600,
        "&:hover": {
            borderColor: accent,
            backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
        },
    };

    return (
        <div
            className="px-4 py-6 md:px-8"
            style={{ "--book-accent": accent } as React.CSSProperties}
        >
            <div className="mx-auto max-w-6xl space-y-6">
                <ReportHero
                    average={average}
                    questionTitle={data.speakingQuestion.japaneseName}
                    questionTitleMarkup={
                        data.speakingQuestion.japaneseNameMarkup
                    }
                    questionTranslation={data.speakingQuestion.vietnameseName}
                    showFurigana={showFurigana}
                    topicName={topicQ.data?.japaneseName ?? null}
                    topicLabel={topicLabel}
                    topicHref={topicHref}
                    practicedAt={data.createdTime}
                    durationSec={data.duration}
                    audioUrl={data.audioFile?.accessUrl ?? null}
                    hasAudioFile={data.audioFile != null}
                    accent={accent}
                />

                <div
                    className={`flex items-start gap-3 rounded-2xl border p-4 ${
                        passed
                            ? "border-emerald-500/30 bg-emerald-500/10"
                            : "border-amber-500/30 bg-amber-500/10"
                    }`}
                >
                    {passed ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                    ) : (
                        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                    )}
                    <div>
                        <p className="text-text-contrast text-sm font-bold">
                            {passed ? t("passTitle") : t("failTitle")}
                        </p>
                        <p className="text-text-muted mt-0.5 text-sm">
                            {passed
                                ? t("passDesc")
                                : t("failDesc", { min: PASS_SCORE })}
                        </p>
                    </div>
                </div>

                <HistoryDetailOverview
                    speechAssessment={data.speechAssessment}
                    aiFeedback={data.aiFeedback}
                    accent={accent}
                />

                <HistoryDetailTabs
                    speechAssessment={data.speechAssessment}
                    aiFeedback={data.aiFeedback}
                />

                <div className="sticky bottom-4 z-10 flex flex-wrap justify-center gap-3 md:static md:justify-between">
                    <Button
                        onClick={() =>
                            openReport(
                                "QUESTION",
                                String(data.speakingQuestion.id),
                            )
                        }
                        variant="text"
                        startIcon={<Flag className="h-4 w-4" />}
                        sx={{
                            textTransform: "none",
                            color: "var(--color-text-muted)",
                            fontWeight: 600,
                            "&:hover": {
                                color: "var(--color-text-error)",
                                backgroundColor: "var(--color-hbgc-app)",
                            },
                        }}
                    >
                        {t("reportQuestionBtn")}
                    </Button>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button
                            component={Link}
                            href={(topicHref ?? "/books") as AllRoute}
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
                            variant={passed ? "outlined" : "contained"}
                            startIcon={<Mic className="h-4 w-4" />}
                            sx={passed ? softSx : emphSx}
                        >
                            {t("retryBtn")}
                        </Button>
                        <Button
                            component={Link}
                            href={(topicHref ?? "/topics") as AllRoute}
                            variant={passed ? "contained" : "outlined"}
                            endIcon={<ArrowRight className="h-4 w-4" />}
                            sx={passed ? emphSx : softSx}
                        >
                            {t("continueBtn")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SpeakingResultView;
