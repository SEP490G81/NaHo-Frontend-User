"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button, Switch, FormControlLabel, Box } from "@mui/material";
import { Link } from "@/intl/i18n/navigation";
import { useTranslations } from "next-intl";

interface SandboxHeaderProps {
    topicId: string;
    showFurigana: boolean;
    setShowFurigana: (v: boolean) => void;
}

export function SandboxHeader({ topicId, showFurigana, setShowFurigana }: SandboxHeaderProps) {
    const t = useTranslations("page.sandbox");
    return (
        <header className="flex flex-wrap items-center justify-between gap-3">
            <Button
                component={Link}
                href={`/topics/${topicId}`}
                variant="text"
                startIcon={<ArrowLeft className="h-4 w-4" />}
                sx={{
                    textTransform: "none",
                    color: "var(--color-text-muted)",
                    fontWeight: "semibold",
                    "&:hover": {
                        color: "var(--color-text-contrast)",
                        backgroundColor: "var(--color-hbgc-app)",
                    },
                }}
            >
                {t("backToTopic")}
            </Button>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={showFurigana}
                            onChange={(e) => setShowFurigana(e.target.checked)}
                            color="primary"
                        />
                    }
                    label={t("showFurigana")}
                    slotProps={{
                        typography: { className: "text-sm font-semibold text-text-contrast" }
                    }}
                />
            </Box>
        </header>
    );
}

export default SandboxHeader;
