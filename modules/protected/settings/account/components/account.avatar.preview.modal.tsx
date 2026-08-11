"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
    Avatar,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    IconButton,
} from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import CloseIcon from "@mui/icons-material/Close";

interface AccountAvatarPreviewModalProps {
    open: boolean;
    onClose: () => void;
    activeAvatarUrl: string | null | undefined;
    initialChar: string;
    isAvatarUploading: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function AccountAvatarPreviewModal({
    open,
    onClose,
    activeAvatarUrl,
    initialChar,
    isAvatarUploading,
    fileInputRef,
}: AccountAvatarPreviewModalProps) {
    const t = useTranslations("settings.account");

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        backdropFilter: "blur(8px)",
                    },
                },
                paper: {
                    sx: {
                        borderRadius: "24px",
                        backgroundColor: "var(--color-bgc-modal)",
                        color: "var(--color-text-contrast)",
                        boxShadow: "0 24px 48px rgba(0, 0, 0, 0.3)",
                        overflow: "hidden",
                        border: "1px solid var(--color-bdc-primary)",
                    },
                },
            }}
        >
            <div className="flex items-center justify-between px-6 pt-5 pb-3">
                <h3 className="text-text-contrast text-base font-bold">
                    {t("avatarPreviewTitle")}
                </h3>
                <IconButton
                    onClick={onClose}
                    size="small"
                    sx={{
                        color: "var(--color-text-muted)",
                        "&:hover": {
                            color: "var(--color-text-contrast)",
                            backgroundColor: "var(--color-hbgc-app)",
                        },
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>

            <DialogContent className="flex flex-col items-center justify-center p-6 pt-2 pb-6">
                <div className="border-bgc-highlight/40 bg-bgc-app ring-bgc-highlight/10 relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-full border-4 shadow-2xl ring-4 sm:h-72 sm:w-72">
                    <Avatar
                        src={activeAvatarUrl || undefined}
                        sx={{
                            width: "100%",
                            height: "100%",
                            bgcolor: "var(--color-bgc-highlight)",
                            color: "#ffffff",
                            fontSize: "4.5rem",
                            fontWeight: 700,
                        }}
                    >
                        {initialChar}
                    </Avatar>
                </div>
            </DialogContent>

            <DialogActions className="bg-bgc-app/40 border-bdc-primary/40 flex flex-wrap items-center justify-between gap-2 border-t px-6 pt-3 pb-6">
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        disabled={isAvatarUploading}
                        onClick={() => fileInputRef.current?.click()}
                        variant="contained"
                        size="small"
                        startIcon={
                            isAvatarUploading ? (
                                <CircularProgress size={16} color="inherit" />
                            ) : (
                                <AddAPhotoOutlinedIcon fontSize="small" />
                            )
                        }
                        sx={{
                            backgroundColor: "var(--color-bgc-highlight)",
                            color: "#ffffff",
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: "8px",
                            px: 2,
                            py: 0.75,
                            boxShadow: "none",
                            "&:hover": {
                                opacity: 0.9,
                                backgroundColor: "var(--color-bgc-highlight)",
                                boxShadow: "none",
                            },
                            "&.Mui-disabled": {
                                opacity: 0.7,
                                color: "#ffffff",
                            },
                        }}
                    >
                        {isAvatarUploading ? "Đang tải..." : t("changeAvatar")}
                    </Button>
                </div>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    size="small"
                    sx={{
                        textTransform: "none",
                        color: "var(--color-text-contrast)",
                        borderColor: "var(--color-bdc-muted)",
                        borderRadius: "8px",
                    }}
                >
                    {t("closeModal")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
