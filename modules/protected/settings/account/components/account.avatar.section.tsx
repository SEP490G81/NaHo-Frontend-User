"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Avatar, Button, CircularProgress, Tooltip } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import ZoomInIcon from "@mui/icons-material/ZoomIn";

interface AccountAvatarSectionProps {
    activeAvatarUrl: string | null | undefined;
    initialChar: string;
    isAvatarUploading: boolean;
    onOpenPreview: () => void;
    onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function AccountAvatarSection({
    activeAvatarUrl,
    initialChar,
    isAvatarUploading,
    onOpenPreview,
    onAvatarChange,
    fileInputRef,
}: AccountAvatarSectionProps) {
    const t = useTranslations("settings.account");

    return (
        <div
            id="setting-avatar"
            data-setting-id="setting-avatar"
            className="border-bdc-primary/60 bg-bgc-app flex flex-col items-start justify-between gap-4 rounded-xl border p-6 transition-all duration-300 sm:flex-row sm:items-center"
        >
            <div className="flex items-center gap-4">
                <Tooltip
                    title={t("avatarHoverTooltip")}
                    arrow
                    placement="top"
                >
                    <button
                        type="button"
                        onClick={onOpenPreview}
                        disabled={isAvatarUploading}
                        className="group border-bdc-muted bg-bgc-modal focus:ring-bgc-highlight relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 shadow-sm transition-all duration-200 hover:scale-105 focus:ring-2 focus:outline-none disabled:opacity-80"
                    >
                        <Avatar
                            src={activeAvatarUrl || undefined}
                            sx={{
                                width: "100%",
                                height: "100%",
                                bgcolor: "var(--color-bgc-highlight)",
                                color: "#ffffff",
                                fontSize: "1.75rem",
                                fontWeight: 700,
                            }}
                        >
                            {initialChar}
                        </Avatar>
                        <div
                            className={`absolute inset-0 flex items-center justify-center bg-black/40 text-white backdrop-blur-[1px] transition-opacity duration-200 ${
                                isAvatarUploading
                                    ? "opacity-100"
                                    : "opacity-0 group-hover:opacity-100"
                            }`}
                        >
                            {isAvatarUploading ? (
                                <CircularProgress
                                    size={24}
                                    color="inherit"
                                />
                            ) : (
                                <ZoomInIcon fontSize="medium" />
                            )}
                        </div>
                    </button>
                </Tooltip>
                <div>
                    <h3 className="text-text-contrast text-sm font-semibold">
                        {t("avatarTitle")}
                    </h3>
                    <p className="text-text-muted mt-0.5 text-xs">
                        {t("avatarDesc")}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onAvatarChange}
                    accept="image/*"
                    className="hidden"
                />
                <Button
                    type="button"
                    disabled={isAvatarUploading}
                    onClick={() => fileInputRef.current?.click()}
                    variant="contained"
                    size="small"
                    startIcon={
                        isAvatarUploading ? (
                            <CircularProgress
                                size={16}
                                color="inherit"
                            />
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
                    {isAvatarUploading
                        ? "Đang tải..."
                        : t("changeAvatar")}
                </Button>
            </div>
        </div>
    );
}
