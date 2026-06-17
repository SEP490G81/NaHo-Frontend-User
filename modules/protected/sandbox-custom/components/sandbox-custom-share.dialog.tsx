"use client";
import React from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

interface SandboxCustomShareDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirmShare: () => void;
    onOnlySave: () => void;
    t: any;
}

export function SandboxCustomShareDialog({
    open,
    onClose,
    onConfirmShare,
    onOnlySave,
    t,
}: SandboxCustomShareDialogProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="share-dialog-title"
            aria-describedby="share-dialog-description"
            sx={{
                "& .MuiDialog-paper": {
                    backgroundColor: "var(--color-bgc-app)",
                    backgroundImage: "none",
                    color: "var(--color-text-contrast)",
                    borderRadius: "12px",
                    border: "1px solid var(--color-bdc-primary)",
                    maxWidth: "480px",
                    p: 1.5,
                }
            }}
        >
            <DialogTitle id="share-dialog-title" sx={{ fontWeight: "bold", pb: 1 }}>
                {t("shareDialogTitle")}
            </DialogTitle>
            <DialogContent sx={{ pb: 2 }}>
                <DialogContentText id="share-dialog-description" sx={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
                    {t("shareDialogDesc")}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 1, gap: 1.5 }}>
                <Button
                    onClick={onClose}
                    variant="text"
                    sx={{
                        textTransform: "none",
                        color: "var(--color-text-muted)",
                        fontWeight: "bold",
                    }}
                >
                    {t("cancelBtn")}
                </Button>
                <Button
                    onClick={onOnlySave}
                    variant="outlined"
                    sx={{
                        textTransform: "none",
                        borderColor: "var(--color-bdc-muted)",
                        color: "var(--color-text-contrast)",
                        fontWeight: "bold",
                        "&:hover": {
                            borderColor: "var(--color-bdc-primary)",
                            backgroundColor: "var(--color-hbgc-app)",
                        },
                    }}
                >
                    {t("onlySaveBtn")}
                </Button>
                <Button
                    onClick={onConfirmShare}
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        backgroundColor: "var(--color-bgc-highlight)",
                        color: "var(--color-text-pure)",
                        fontWeight: "bold",
                        "&:hover": { opacity: 0.9 },
                    }}
                >
                    {t("shareAndSaveBtn")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SandboxCustomShareDialog;
