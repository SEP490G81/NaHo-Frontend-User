"use client";

import React from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { useTranslations } from "next-intl";

interface EndSessionDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
}

export function EndSessionDialog({
    open,
    onClose,
    onConfirm,
    loading = false,
}: Readonly<EndSessionDialogProps>) {
    const t = useTranslations("liveChatroom");

    return (
        <Dialog
            open={open}
            onClose={loading ? undefined : onClose}
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: {
                    className:
                        "bg-bgc-app border border-bdc-primary rounded-2xl p-2",
                },
            }}
        >
            <DialogTitle className="flex items-center gap-2 text-base font-bold text-text-contrast">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                {t("endConfirmTitle")}
            </DialogTitle>

            <DialogContent className="text-sm text-text-muted">
                {t("endConfirmDesc")}
            </DialogContent>

            <DialogActions className="gap-2 px-6 pb-4">
                <Button
                    onClick={onClose}
                    disabled={loading}
                    variant="outlined"
                    className="!rounded-xl capitalize !border-bdc-primary !text-text-contrast"
                >
                    {t("cancel")}
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={loading}
                    variant="contained"
                    color="error"
                    className="!rounded-xl !font-bold capitalize text-white"
                    startIcon={
                        loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : undefined
                    }
                >
                    {loading ? t("ending") : t("endChatButton")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EndSessionDialog;
