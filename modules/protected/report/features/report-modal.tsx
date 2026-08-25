"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from "@mui/material";
import { X } from "lucide-react";
import { useReportStore } from "@/store/reportStore";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import ReportFormFields from "../components/report-form-fields";
import ReportTypeChip from "../components/report-type-chip";
import { createReport } from "@/services/client/report.service";

export function ReportModal() {
    const t = useTranslations("common.report");
    const modalState = useReportStore((s) => s.modalState);
    const closeModal = useReportStore((s) => s.closeModal);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (modalState.isOpen) {
            setTitle("");
            setDescription("");
            setFiles([]);
            setFilePreviews([]);
            setSubmitting(false);
        }
    }, [modalState.isOpen]);

    const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length === 0) return;

        const invalidFile = selectedFiles.find(
            (file) => !file.type.startsWith("image/"),
        );
        if (invalidFile) {
            toast.error(t("errorOnlyImage"));
            return;
        }

        const oversizeFile = selectedFiles.find(
            (file) => file.size > MAX_FILE_SIZE,
        );
        if (oversizeFile) {
            toast.error(t("errorMaxFileSize"));
            return;
        }

        const newPreviews = selectedFiles.map((file) =>
            URL.createObjectURL(file),
        );
        setFiles((prev) => [...prev, ...selectedFiles]);
        setFilePreviews((prev) => [...prev, ...newPreviews]);
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
        setFilePreviews((prev) => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            toast.error(t("errorRequired"));
            return;
        }

        const oversizeFile = files.find((file) => file.size > MAX_FILE_SIZE);
        if (oversizeFile) {
            toast.error(t("errorMaxFileSize"));
            return;
        }

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("title", title.trim());
            formData.append("description", description.trim());
            formData.append("reportType", modalState.type);
            if (modalState.questionId) {
                formData.append("questionId", String(modalState.questionId));
            }
            if (modalState.commentId) {
                formData.append("commentId", String(modalState.commentId));
            }
            files.forEach((file) => {
                formData.append("files", file);
            });

            await createReport(formData);
            toast.success(t("submitSuccess"));
            closeModal();
        } catch (err: any) {
            toast.error(err.message || t("errorRequired"));
        } finally {
            setSubmitting(false);
        }
    };

    const getReportTypeLabel = (type: typeof modalState.type) => {
        if (type === "QUESTION") return t("typeQuestion");
        if (type === "COMMENT") return t("typeComment");
        return t("typeSystem");
    };

    return (
        <Dialog
            open={modalState.isOpen}
            onClose={() => !submitting && closeModal()}
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
                    disabled={submitting}
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

                        <ReportTypeChip reportType={modalState.type} />
                    </div>

                    <ReportFormFields
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        files={files}
                        filePreviews={filePreviews}
                        handleFilesChange={handleFilesChange}
                        handleRemoveFile={handleRemoveFile}
                        fileInputRef={fileInputRef}
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
                        disabled={submitting}
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
                        disabled={submitting}
                        startIcon={
                            submitting ? (
                                <CircularProgress size={16} color="inherit" />
                            ) : null
                        }
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
                        {submitting ? t("submitting") : t("submitBtn")}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ReportModal;
