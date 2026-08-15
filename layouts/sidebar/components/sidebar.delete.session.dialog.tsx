"use client";

import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface SidebarDeleteSessionDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
}

export function SidebarDeleteSessionDialog({
    open,
    onClose,
    onConfirm,
    loading = false,
}: Readonly<SidebarDeleteSessionDialogProps>) {
    const t = useTranslations("marugoto.path");

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "16px",
                        bgcolor: "var(--color-bgc-app)",
                        backgroundImage: "none",
                        border: "1px solid var(--color-bdc-primary)",
                        minWidth: 320,
                        maxWidth: 420,
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 700,
                    color: "var(--color-text-contrast)",
                    fontSize: "1rem",
                    pt: 2.5,
                }}
            >
                {t("deleteSessionTitle")}
            </DialogTitle>
            <DialogContent>
                <p className="text-text-muted text-sm leading-relaxed">
                    {t("deleteSessionConfirm")}
                </p>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
                <Button
                    onClick={onClose}
                    disabled={loading}
                    sx={{
                        textTransform: "none",
                        color: "var(--color-text-muted)",
                        fontWeight: 600,
                        borderRadius: "10px",
                    }}
                >
                    {t("cancelButton")}
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    disabled={loading}
                    onClick={onConfirm}
                    startIcon={
                        loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : undefined
                    }
                    sx={{
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: "10px",
                        boxShadow: "none",
                    }}
                >
                    {t("deleteSessionButton")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SidebarDeleteSessionDialog;
