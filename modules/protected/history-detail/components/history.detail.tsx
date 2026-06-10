"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/intl/i18n/navigation";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getHistoryById } from "@/modules/protected/history/services/history.service";
import { getTopicById } from "@/modules/protected/topics/services/topic.service";
import { mockHistoryList } from "@/data/mockHistory";
import { mockTopics } from "@/data/mockTopics";
import { getReportForHistory } from "@/data/mockReports";
import HistoryDetailHeader from "./history.detail.header";
import HistoryDetailQuestionCard from "./history.detail.question.card";
import HistoryDetailOverview from "./history.detail.overview";
import HistoryDetailTabs from "./history.detail.tabs";

export function HistoryDetail() {
    const t = useTranslations("page.historyDetail");
    const params = useParams();
    const rawHistoryId = params?.historyId as string;
    const matchedHistory = mockHistoryList.find((h) => rawHistoryId?.startsWith(h.historyId));
    const historyId = matchedHistory ? matchedHistory.historyId : rawHistoryId || "";

    // Nạp chi tiết bản ghi lịch sử bài làm từ API
    const { data: entry, isLoading: isHistoryLoading } = useQuery({
        queryKey: ["historyDetail", historyId],
        queryFn: () => getHistoryById(historyId),
        enabled: !!historyId,
    });

    const topicId = entry?.topicId;

    // Nạp chi tiết chủ đề tương ứng từ API
    const { data: topic, isLoading: isTopicLoading } = useQuery({
        queryKey: ["topic", topicId],
        queryFn: () => getTopicById(topicId!),
        enabled: !!topicId,
    });

    const question = React.useMemo(() => {
        if (!topic || !entry) return null;
        return topic.questions.find((q) => q.id === entry.questionId) || null;
    }, [topic, entry]);

    const report = React.useMemo(() => {
        if (!entry || !topic || !question) return null;
        return getReportForHistory(entry, topic, question);
    }, [entry, topic, question]);

    const [showFurigana, setShowFurigana] = useState(true);

    const isLoading = isHistoryLoading || isTopicLoading;

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <p className="text-text-muted">Đang tải dữ liệu...</p>
            </div>
        );
    }

    if (!entry || !topic || !question || !report) {
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

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-6xl space-y-6">
                <HistoryDetailHeader
                    topicTitle={topic.title}
                    showFurigana={showFurigana}
                    setShowFurigana={setShowFurigana}
                    t={t}
                />

                <HistoryDetailQuestionCard
                    topic={topic}
                    entry={entry}
                    question={question}
                    showFurigana={showFurigana}
                    t={t}
                />

                <HistoryDetailOverview report={report} t={t} />

                <HistoryDetailTabs
                    report={report}
                    showFurigana={showFurigana}
                    t={t}
                />

                {/* Retake speaking CTA */}
                <div className="sticky bottom-4 z-10 flex justify-center md:static md:justify-end">
                    <Link
                        href={`/sandbox/${entry.questionId}`}
                        className="inline-flex h-9 items-center justify-center rounded-md bg-bgc-highlight px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-bgc-highlight/90"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        {t("retryBtn")}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HistoryDetail;
