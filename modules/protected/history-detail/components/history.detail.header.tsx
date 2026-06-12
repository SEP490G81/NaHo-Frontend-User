"use client";
import React from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import { Link } from "@/i18n/navigation";

interface HistoryDetailHeaderProps {
    topicTitle: string;
    showFurigana: boolean;
    setShowFurigana: (show: boolean) => void;
    t: any;
}

export function HistoryDetailHeader({
    topicTitle,
    showFurigana,
    setShowFurigana,
    t,
}: HistoryDetailHeaderProps) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <nav className="text-text-muted flex items-center gap-1.5 text-sm">
                <Link href="/history" className="hover:text-foreground">
                    {t("breadcrumbHistory")}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-text-contrast font-semibold">
                    {topicTitle}
                </span>
            </nav>
            <div className="flex items-center gap-3">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showFurigana}
                                onChange={(e) =>
                                    setShowFurigana(e.target.checked)
                                }
                                color="primary"
                            />
                        }
                        label={t("showFurigana")}
                        slotProps={{
                            typography: {
                                className:
                                    "text-sm font-semibold text-text-contrast",
                            },
                        }}
                    />
                </Box>
                <Button
                    component={Link}
                    href="/history"
                    variant="outlined"
                    startIcon={<ArrowLeft className="h-4 w-4" />}
                    sx={{
                        textTransform: "none",
                        borderColor: "var(--color-bdc-muted)",
                        color: "var(--color-text-contrast)",
                        fontWeight: "semibold",
                        padding: "4px 16px",
                        "&:hover": {
                            borderColor: "var(--color-bdc-primary)",
                            backgroundColor: "var(--color-hbgc-app)",
                        },
                    }}
                >
                    {t("backBtn")}
                </Button>
            </div>
        </div>
    );
}

export default HistoryDetailHeader;
