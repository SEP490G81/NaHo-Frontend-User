"use client";

import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Loader2 } from "lucide-react";
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
            onClose={() => {
                if (!loading) onClose();
            }}
            className="[&_.MuiPaper-root]:border-bdc-primary [&_.MuiPaper-root]:bg-bgc-app [&_.MuiPaper-root]:!rounded-2xl [&_.MuiPaper-root]:border [&_.MuiPaper-root]:!shadow-xl"
            slotProps={{
                backdrop: {
                    style: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
                },
            }}
        >
            <DialogTitle className="text-text-contrast !font-bold">
                {t("endChatModal.title")}
            </DialogTitle>
            <DialogContent>
                <DialogContentText className="!text-text-muted">
                    {t("endChatModal.description")}
                </DialogContentText>
            </DialogContent>
            <DialogActions className="gap-2 p-4">
                <Button
                    onClick={onClose}
                    disabled={loading}
                    className="!text-text-muted hover:!bg-hbgc-app capitalize"
                >
                    {t("endChatModal.cancel")}
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={loading}
                    variant="contained"
                    color="error"
                    startIcon={
                        loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : undefined
                    }
                    className="!rounded-lg !px-4 !font-bold capitalize hover:opacity-90"
                >
                    {loading ? t("ending") : t("endChatModal.confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EndSessionDialog;
