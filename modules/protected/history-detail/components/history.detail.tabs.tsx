"use client";
import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import TranscriptView from "../features/transcript.view";
import PronunciationView from "../features/pronunciation.view";
import AdvancedHintsView from "../features/advanced.hints.view";

interface HistoryDetailTabsProps {
    report: {
        userTranscript: any;
        aiSuggestion: any;
        pronunciation: any;
        pronunciationNote: string;
        expressions: any;
        itVocab: any;
    };
    showFurigana: boolean;
    t: any;
}

export function HistoryDetailTabs({ report, showFurigana, t }: HistoryDetailTabsProps) {
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
                            color: "var(--color-bgc-highlight)",
                        },
                    },
                    "& .MuiTabs-indicator": {
                        backgroundColor: "var(--color-bgc-highlight)",
                    },
                }}
            >
                <Tab label={t("tabTranscript")} />
                <Tab label={t("tabPronunciation")} />
                <Tab label={t("tabHints")} />
            </Tabs>

            <Box className="mt-4">
                {tabIndex === 0 && (
                    <TranscriptView
                        transcript={report.userTranscript}
                        aiSuggestion={report.aiSuggestion}
                        showFurigana={showFurigana}
                    />
                )}
                {tabIndex === 1 && (
                    <div className="rounded-2xl border border-bdc-primary bg-bgc-app p-5">
                        <PronunciationView
                            pronunciation={report.pronunciation}
                            note={report.pronunciationNote}
                        />
                    </div>
                )}
                {tabIndex === 2 && (
                    <AdvancedHintsView
                        expressions={report.expressions}
                        itVocab={report.itVocab}
                        showFurigana={showFurigana}
                    />
                )}
            </Box>
        </Box>
    );
}

export default HistoryDetailTabs;
