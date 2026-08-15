"use client";
import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import type { ReportDetail } from "@/data/mockReports";
import TranscriptView from "../features/transcript.view";
import PronunciationView from "../features/pronunciation.view";

interface HistoryDetailTabsProps {
    report: ReportDetail;
    showFurigana: boolean;
}

export function HistoryDetailTabs({
    report,
    showFurigana,
}: HistoryDetailTabsProps) {
    const t = useTranslations("historyDetail");
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box className="w-full">
            <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                sx={{
                    borderBottom: 1,
                    borderColor: "var(--color-bdc-primary)",
                    "& .MuiTab-root": {
                        textTransform: "none",
                        fontWeight: "bold",
                        color: "var(--color-text-muted)",
                        "&.Mui-selected": {
                            color: "var(--book-accent, var(--color-bgc-highlight))",
                        },
                    },
                    "& .MuiTabs-indicator": {
                        backgroundColor:
                            "var(--book-accent, var(--color-bgc-highlight))",
                    },
                }}
            >
                <Tab label={t("tabTranscript")} />
                <Tab label={t("tabPronunciation")} />
            </Tabs>

            <Box className="mt-4">
                {tabIndex === 0 && (
                    <TranscriptView
                        fullTranscript={report.fullTranscript}
                        transcript={report.userTranscript}
                        aiSuggestion={report.aiSuggestion}
                    />
                )}
                {tabIndex === 1 && (
                    <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5">
                        <PronunciationView
                            pronunciation={report.pronunciation}
                            note={report.pronunciationNote}
                            showFurigana={showFurigana}
                        />
                    </div>
                )}
            </Box>
        </Box>
    );
}

export default HistoryDetailTabs;
