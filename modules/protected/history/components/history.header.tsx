"use client";
import React from "react";
import { History as HistoryIcon, Sparkles } from "lucide-react";
import { Button } from "@mui/material";
import { Link } from "@/i18n/navigation";
import ScoreBadge from "./score.badge";

interface HistoryHeaderProps {
    totalCount: number;
    avgScore: number;
    t: any;
}

export function HistoryHeader({ totalCount, avgScore, t }: HistoryHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
                <h1 className="text-text-contrast flex items-center gap-2 text-2xl font-bold md:text-3xl">
                    <HistoryIcon className="text-bgc-highlight h-6 w-6" />
                    {t("title")}
                </h1>
                <div className="text-text-muted mt-1 flex flex-wrap items-center gap-1 text-sm">
                    <span>
                        Tổng cộng{" "}
                        <span className="text-text-contrast font-semibold">
                            {totalCount}
                        </span>{" "}
                        lượt luyện
                    </span>
                    <span>· Điểm trung bình</span>
                    {totalCount > 0 ? (
                        <ScoreBadge
                            score={Number(avgScore.toFixed(1))}
                            className="align-middle"
                        />
                    ) : (
                        <span className="text-text-muted">—</span>
                    )}
                </div>
            </div>
            <Button
                component={Link}
                href="/topics"
                variant="contained"
                startIcon={<Sparkles className="h-4 w-4" />}
                sx={{
                    textTransform: "none",
                    backgroundColor: "var(--color-bgc-highlight)",
                    color: "var(--color-text-pure)",
                    fontWeight: "bold",
                    "&:hover": { opacity: 0.9 },
                }}
            >
                {t("practiceNew")}
            </Button>
        </header>
    );
}

export default HistoryHeader;
