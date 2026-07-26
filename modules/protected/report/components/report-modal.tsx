"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { X } from "lucide-react";
import { useReportStore } from "@/store/reportStore";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import ReportFormFields from "./report-form-fields";

export function ReportModal() {
    const t = useTranslations("common.report");
    const modalState = useReportStore((s) => s.modalState);
    const closeModal = useReportStore((s) => s.closeModal);
    const submitReport = useReportStore((s) => s.submitReport);

    const userEmail = useAuthStore((s) => s.userEmail);
    const currentUserId = userEmail || "u01";

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (modalState.isOpen) {
            setTitle("");
            setDescription("");
            setImageUrl(undefined);
        }
    }, [modalState.isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error(t("errorOnlyImage"));
            return;
        }

        const reader = new FileReader();

        reader.onload = (event) => {
            setImageUrl(event.target?.result as string);
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImageUrl(undefined);

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            toast.error(t("errorRequired"));
            return;
        }

        submitReport(
            {
                title,
                description,
                reportType: modalState.type,
                questionId: modalState.questionId,
                commentId: modalState.commentId,
                imageUrl,
            },
            currentUserId,
        );

        toast.success(t("submitSuccess"));
        closeModal();
    };

    const getReportTypeLabel = (type: typeof modalState.type) => {
        if (type === "QUESTION") return t("typeQuestion");
        if (type === "COMMENT") return t("typeComment");
        return t("typeSystem");
    };

    const translateKey = (key: string): string => {
        return t(key as Parameters<typeof t>[0]);
    };

    return (
        <Dialog
            open={modalState.isOpen}
            onClose={closeModal}
            maxWidth="sm"
            fullWidth
            slotProps={{
                backdrop: {
                    style: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
                },
                paper: {
                    sx: {
                        borderRadius: "16px",
                        bgcolor: "var(--color-bgc-app)",
                        border: "1px solid var(--color-bdc-primary)",
                        boxShadow: 24,
                    },
                },
            }}
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--color-bdc-primary)",
                    pb: 2,
                }}
            >
                <span className="text-text-contrast text-lg font-bold">
                    {t("modalTitle")}
                </span>

                <IconButton
                    onClick={closeModal}
                    sx={{
                        color: "var(--color-text-muted)",
                        "&:hover": { color: "var(--color-text-contrast)" },
                        position: "absolute",
                        right: 16,
                        top: 16,
                    }}
                >
                    <X className="h-5 w-5" />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ py: 3 }} className="space-y-4">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="text-text-muted text-sm">
                            {t("fieldReportType")}:
                        </span>

                        <span className="bg-bgc-highlight/15 text-bgc-highlight border-bgc-highlight/25 rounded-full border px-3 py-1 text-xs font-bold">
                            {getReportTypeLabel(modalState.type)}
                        </span>
                    </div>

                    <ReportFormFields
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        imageUrl={imageUrl}
                        handleImageChange={handleImageChange}
                        handleRemoveImage={handleRemoveImage}
                        fileInputRef={fileInputRef}
                        t={translateKey}
                    />
                </DialogContent>

                <DialogActions
                    sx={{
                        p: 3,
                        borderTop: "1px solid var(--color-bdc-primary)",
                        gap: 1.5,
                    }}
                >
                    <Button
                        type="button"
                        onClick={closeModal}
                        variant="text"
                        sx={{
                            textTransform: "none",
                            color: "var(--color-text-muted)",
                            fontWeight: 600,
                            "&:hover": {
                                color: "var(--color-text-contrast)",
                                bgcolor: "var(--color-hbgc-app)",
                            },
                        }}
                    >
                        {t("cancelBtn")}
                    </Button>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            bgcolor: "var(--color-bgc-highlight)",
                            color: "var(--color-text-pure)",
                            fontWeight: "bold",
                            borderRadius: "8px",
                            px: 3,
                            "&:hover": { opacity: 0.9 },
                        }}
                    >
                        {t("submitBtn")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ReportModal;
