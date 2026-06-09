"use client";
import React from "react";
import { History as HistoryIcon } from "lucide-react";
import { Button } from "@mui/material";
import { Link } from "@/intl/i18n/navigation";

interface HistoryEmptyStateProps {
    t: any;
}

export function HistoryEmptyState({ t }: HistoryEmptyStateProps) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-bdc-muted bg-bgc-app p-10 text-center">
            <HistoryIcon className="h-10 w-10 text-text-muted" />
            <h3 className="text-lg font-semibold text-text-contrast">{t("emptyTitle")}</h3>
            <p className="max-w-md text-sm text-text-muted">
                {t("emptySubtitle")}
            </p>
            <Button
                component={Link}
                href="/topics"
                variant="contained"
                sx={{
                    textTransform: "none",
                    backgroundColor: "var(--color-bgc-highlight)",
                    color: "var(--color-text-pure)",
                    fontWeight: "bold",
                    marginTop: "8px",
                    "&:hover": { opacity: 0.9 },
                }}
            >
                {t("emptyBtn")}
            </Button>
        </div>
    );
}

export default HistoryEmptyState;
