"use client";

import React from "react";
import {
    Alert,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { useTranslations } from "next-intl";

interface EndSessionDialogProps {
    readonly open: boolean;
    readonly isEnding: boolean;
    readonly canEndSession?: boolean;
    readonly onConfirm: () => void;
    readonly onClose: () => void;
}

const EndSessionDialogComponent = ({
    open,
    isEnding,
    canEndSession = true,
    onConfirm,
    onClose,
}: EndSessionDialogProps) => {
    const t = useTranslations("liveChatroom");

    const handleConfirm = () => {
        if (isEnding || !canEndSession) return;
        onClose();
        onConfirm();
    };

    return (
        <Dialog
            open={open}
            onClose={isEnding ? undefined : onClose}
            maxWidth="xs"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: "16px",
                        backgroundColor: "var(--color-bgc-app)",
                        border: "1px solid var(--color-bdc-primary)",
                    },
                },
            }}
        >
            <DialogTitle className="text-text-contrast flex items-center gap-2 text-base font-bold">
                <FlagOutlinedIcon
                    className="text-red-500"
                    sx={{ fontSize: 20 }}
                />
                {t("endSessionConfirmTitle") || "Kết thúc phiên trò chuyện"}
            </DialogTitle>

            <DialogContent className="space-y-3">
                <DialogContentText className="text-text-muted text-xs leading-relaxed">
                    {t("endSessionConfirmDesc") ||
                        "Bạn có chắc chắn muốn kết thúc phiên trò chuyện này không? AI sẽ tạo báo cáo đánh giá chi tiết về năng lực giao tiếp của bạn."}
                </DialogContentText>

                {!canEndSession && (
                    <Alert
                        severity="warning"
                        sx={{
                            fontSize: "12px",
                            borderRadius: "10px",
                            padding: "6px 12px",
                        }}
                    >
                        {t("endSessionMinMessagesWarning") ||
                            "Phiên trò chuyện chưa có tương tác từ bạn. Vui lòng gửi ít nhất 1 tin nhắn cho AI trước khi kết thúc để nhận báo cáo đánh giá."}
                    </Alert>
                )}
            </DialogContent>

            <DialogActions className="p-4 pt-2">
                <Button
                    onClick={onClose}
                    disabled={isEnding}
                    variant="outlined"
                    sx={{
                        borderRadius: "10px",
                        color: "var(--color-text-contrast)",
                        borderColor: "var(--color-bdc-primary)",
                    }}
                >
                    {t("cancel") || "Hủy"}
                </Button>
                <Button
                    onClick={handleConfirm}
                    disabled={isEnding || !canEndSession}
                    variant="contained"
                    color="error"
                    startIcon={
                        isEnding ? (
                            <CircularProgress size={16} color="inherit" />
                        ) : undefined
                    }
                    sx={{
                        borderRadius: "10px",
                        fontWeight: "bold",
                    }}
                >
                    {isEnding
                        ? t("endingSession") || "Đang xử lý..."
                        : t("confirmEnd") || "Kết thúc & Nhận đánh giá"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EndSessionDialogComponent;
