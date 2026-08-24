"use client";

import React from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useTranslations } from "next-intl";
import { DeleteSessionDialogProps } from "../types/chat.sidebar.type";

const ChatSidebarDeleteDialog = ({
    open,
    session,
    isDeleting,
    onConfirm,
    onClose,
}: DeleteSessionDialogProps) => {
    const t = useTranslations("common.layout.chatroomSidebar.deleteDialog");
    const sessionTitle = session?.voiceName || session?.topic || "";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-dialog-title"
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "16px",
                        backgroundColor: "var(--color-bgc-modal)",
                        border: "1px solid var(--color-bdc-primary)",
                        padding: "8px",
                        maxWidth: 420,
                        width: "100%",
                    },
                },
            }}
        >
            <DialogTitle
                id="delete-dialog-title"
                className="text-text-contrast flex items-center gap-2.5 text-base font-bold"
                sx={{ px: 2, pt: 2, pb: 1 }}
            >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                    <DeleteOutlineRoundedIcon sx={{ fontSize: 20 }} />
                </div>
                <span>{t("title")}</span>
            </DialogTitle>

            <DialogContent sx={{ px: 2, py: 1.5 }}>
                <p className="text-text-muted text-sm leading-relaxed">
                    {t("description")}
                </p>
                {sessionTitle && (
                    <div className="bg-hbgc-app border-bdc-primary mt-3 rounded-lg border px-3 py-2">
                        <p className="text-text-contrast truncate text-xs font-semibold">
                            {sessionTitle}
                        </p>
                    </div>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 2, pb: 2, pt: 1, gap: 1 }}>
                <Button
                    onClick={onClose}
                    disabled={isDeleting}
                    variant="outlined"
                    sx={{
                        textTransform: "none",
                        borderRadius: "10px",
                        fontWeight: 600,
                        borderColor: "var(--color-bdc-primary)",
                        color: "var(--color-text-contrast)",
                        "&:hover": {
                            backgroundColor: "var(--color-hbgc-app)",
                        },
                    }}
                >
                    {t("cancel")}
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={isDeleting}
                    variant="contained"
                    color="error"
                    startIcon={
                        isDeleting ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : null
                    }
                    sx={{
                        textTransform: "none",
                        borderRadius: "10px",
                        fontWeight: 600,
                        boxShadow: "none",
                    }}
                >
                    {isDeleting ? t("deleting") : t("confirm")}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ChatSidebarDeleteDialog;
