"use client";
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@mui/material";

interface CommunityLibraryHeaderProps {
    t: any;
    onContributeClick: () => void;
}

export function CommunityLibraryHeader({ t, onContributeClick }: CommunityLibraryHeaderProps) {
    return (
        <div className="border-bdc-primary bg-bgc-app flex flex-col gap-4 rounded-xl border p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
                <h1 className="text-text-contrast text-2xl font-bold tracking-tight">
                    {t("title")}
                </h1>
                <p className="text-text-muted mt-1 text-sm">
                    {t("subtitle")}
                </p>
            </div>
            <Button
                onClick={onContributeClick}
                variant="contained"
                startIcon={<Plus className="h-4 w-4" />}
                sx={{
                    textTransform: "none",
                    backgroundColor: "var(--color-bgc-highlight)",
                    color: "var(--color-text-pure)",
                    fontWeight: "bold",
                    "&:hover": { opacity: 0.9 },
                }}
            >
                {t("contributeBtn")}
            </Button>
        </div>
    );
}

export default CommunityLibraryHeader;
