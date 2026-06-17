"use client";
import React from "react";
import { Button } from "@mui/material";

interface CustomQuestionActionsProps {
    t: any;
    onBack: () => void;
    onNext: () => void;
}

export function CustomQuestionActions({
    t,
    onBack,
    onNext,
}: CustomQuestionActionsProps) {
    return (
        <div className="border-bdc-primary flex flex-col-reverse items-stretch gap-2 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
                onClick={onBack}
                variant="text"
                sx={{
                    textTransform: "none",
                    color: "var(--color-text-muted)",
                    "&:hover": {
                        backgroundColor: "var(--color-hbgc-app)",
                        color: "var(--color-text-contrast)",
                    },
                }}
            >
                {t("back")}
            </Button>
            <Button
                onClick={onNext}
                variant="contained"
                sx={{
                    textTransform: "none",
                    backgroundColor: "var(--color-bgc-highlight)",
                    color: "var(--color-text-pure)",
                    fontWeight: "bold",
                    "&:hover": { opacity: 0.9 },
                }}
            >
                {t("nextStep")}
            </Button>
        </div>
    );
}

export default CustomQuestionActions;
