"use client";

import React, { useRef, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { Send, ShieldAlert } from "lucide-react";
import ContainerBox from "@/components/ui/container.box";
import ReportFormFields from "../components/report-form-fields";
import ReportTypeChip from "../components/report-type-chip";
import { createReport } from "@/services/client/report.service";

interface ReportCreateFormProps {
    onSuccess?: () => void;
}

export function ReportCreateForm({ onSuccess }: ReportCreateFormProps) {
    const t = useTranslations("common.report");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("title", title.trim());
            formData.append("description", description.trim());
            formData.append("reportType", "SYSTEM");
            files.forEach((file) => {
                formData.append("files", file);
            });

            await createReport(formData);
            toast.success(t("submitSuccess"));

            // Reset form
            setTitle("");
            setDescription("");
            filePreviews.forEach((url) => URL.revokeObjectURL(url));
            setFiles([]);
            setFilePreviews([]);

            if (onSuccess) {
                onSuccess();
            }
        } catch (err: any) {
            toast.error(err.message || t("errorRequired"));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <ContainerBox className="overflow-hidden shadow-xs">
            <div className="border-bdc-primary mb-5 flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-2.5">
                    <div className="bg-bgc-highlight/15 text-bgc-highlight flex h-9 w-9 items-center justify-center rounded-xl font-bold">
                        <ShieldAlert className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-text-primary text-lg font-bold">
                            {t("createReportSectionTitle")}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-text-muted text-xs font-semibold">
                        {t("fieldReportType")}:
                    </span>
                    <ReportTypeChip reportType="SYSTEM" />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
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

                <div className="flex justify-end pt-2">
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={submitting}
                        startIcon={
                            submitting ? (
                                <CircularProgress size={16} color="inherit" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )
                        }
                        className="!bg-bgc-highlight !text-text-pure rounded-lg px-8 py-2.5 font-bold normal-case shadow-sm hover:!opacity-90"
                    >
                        {submitting ? t("submitting") : t("submitBtn")}
                    </Button>
                </div>
            </form>
        </ContainerBox>
    );
}

export default ReportCreateForm;
