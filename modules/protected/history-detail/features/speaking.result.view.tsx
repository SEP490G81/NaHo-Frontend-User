"use client";
import React, { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { getSpeakingHistoryDetail } from "@/services/client/speaking.service";
import { mapSpeakingReport } from "../utils/speaking.mapper";
import HistoryDetailHeader from "../components/history.detail.header";
import HistoryDetailSummary from "../components/history.detail.summary";
import HistoryDetailOverview from "../components/history.detail.overview";
import HistoryDetailTabs from "../components/history.detail.tabs";

/** Màn kết quả luyện nói lấy từ BE (GET /history/{id}). */
export function SpeakingResultView({ historyId }: { historyId: string }) {
    const t = useTranslations("historyDetail");
    const [showFurigana, setShowFurigana] = useState(true);

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

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-6xl space-y-6">
                <HistoryDetailHeader
                    topicTitle={t("reportTitle")}
                    showFurigana={showFurigana}
                    setShowFurigana={setShowFurigana}
                    t={t}
                />

                <HistoryDetailSummary
                    score={data.score}
                    durationSec={data.durationSec}
                    practicedAt={data.practicedAt}
                    t={t}
                />

                <HistoryDetailOverview report={report} t={t} />

                <HistoryDetailTabs
                    report={report}
                    showFurigana={showFurigana}
                    t={t}
                />

                {data.questionId != null && (
                    <div className="sticky bottom-4 z-10 flex justify-center md:static md:justify-end">
                        <Link
                            href={`/sandbox/${data.questionId}`}
                            className="bg-bgc-highlight hover:bg-bgc-highlight/90 inline-flex h-9 cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            {t("retryBtn")}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SpeakingResultView;
