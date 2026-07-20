"use client";
import React from "react";
import { Mic, History } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import type { QuestionHistoryEntry } from "@/data/mockHistory";

interface CustomActionsFooterProps {
    handlePractice: () => void;
    historyEntry?: QuestionHistoryEntry | null;
}

export function CustomActionsFooter({ handlePractice, historyEntry }: CustomActionsFooterProps) {
    const t = useTranslations("communityLibrary");

    return (
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
            <div className="flex gap-3">
                <Button
                    onClick={handlePractice}
                    variant="contained"
                    color="primary"
                    className="!h-11 !rounded-lg !px-6 font-bold text-white hover:opacity-90 capitalize inline-flex items-center gap-2"
                >
                    <Mic className="h-5 w-5" />
                    {t("practiceNow")}
                </Button>

                {historyEntry && (
                    <Link
                        href="/history"
                        className="border-bdc-primary bg-bgc-app hover:bg-hbgc-app inline-flex h-11 items-center justify-center rounded-lg border px-5 text-sm font-semibold text-text-contrast transition-colors gap-2 cursor-pointer"
                    >
                        <History className="h-4.5 w-4.5 text-text-muted" />
                        Xem lịch sử
                    </Link>
                )}
            </div>

            {historyEntry && (
                <div className="text-right">
                    <span className="text-text-muted text-xs">Điểm số lượt luyện gần nhất:</span>
                    <p className="text-bgc-highlight text-2xl font-bold">{historyEntry.score.toFixed(1)} / 10</p>
                </div>
            )}
        </div>
    );
}

export default CustomActionsFooter;
