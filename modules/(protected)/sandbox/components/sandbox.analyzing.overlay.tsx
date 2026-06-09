"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Dialog, DialogContent, CircularProgress, Typography } from "@mui/material";

interface SandboxAnalyzingOverlayProps {
    analyzing: boolean;
}

export function SandboxAnalyzingOverlay({ analyzing }: SandboxAnalyzingOverlayProps) {
    const t = useTranslations("page.sandbox");
    return (
        <Dialog
            open={analyzing}
            sx={{
                "& .MuiDialog-container": {
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(4px)",
                },
                "& .MuiPaper-root": {
                    backgroundColor: "var(--color-bgc-app)",
                    color: "var(--color-text-contrast)",
                    borderRadius: "16px",
                    boxShadow: "none",
                },
            }}
        >
            <DialogContent className="flex flex-col items-center justify-center p-8 w-64 gap-4 text-center">
                <CircularProgress size={50} sx={{ color: "var(--color-bgc-highlight)" }} />
                <Typography className="font-semibold text-base text-text-contrast">
                    {t("analyzing")}
                </Typography>
            </DialogContent>
        </Dialog>
    );
}

export default SandboxAnalyzingOverlay;
