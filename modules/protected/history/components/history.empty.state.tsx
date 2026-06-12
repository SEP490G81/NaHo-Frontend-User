"use client";
import React from "react";
import { History as HistoryIcon } from "lucide-react";
import { Button } from "@mui/material";
import { Link } from "@/i18n/navigation";

interface HistoryEmptyStateProps {
    t: any;
}

export function HistoryEmptyState({ t }: HistoryEmptyStateProps) {
    return (
        <div className="border-bdc-muted bg-bgc-app flex flex-col items-center gap-3 rounded-2xl border border-dashed p-10 text-center">
            <HistoryIcon className="text-text-muted h-10 w-10" />
            <h3 className="text-text-contrast text-lg font-semibold">
                {t("emptyTitle")}
            </h3>
            <p className="text-text-muted max-w-md text-sm">
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
