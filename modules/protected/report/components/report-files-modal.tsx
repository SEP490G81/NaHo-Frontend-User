"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Image as ImageIcon, X as CloseIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReportFile } from "../types/report";

interface ReportFilesModalProps {
    files: ReportFile[] | null;
    onClose: () => void;
}

export function ReportFilesModal({ files, onClose }: ReportFilesModalProps) {
    const t = useTranslations("common.report");

    return (
        <Dialog
            open={Boolean(files)}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            slotProps={{
                paper: {
                    className:
                        "bg-bgc-app border-bdc-primary rounded-2xl border p-2",
                },
            }}
        >
            <DialogTitle className="flex items-center justify-between pb-2">
                <span className="text-text-contrast flex items-center gap-2 text-base font-bold">
                    <ImageIcon className="text-bgc-highlight h-5 w-5" />
                    {t("tableHeaderImages")} ({files?.length || 0})
                </span>
                <IconButton onClick={onClose}>
                    <CloseIcon className="text-text-muted hover:text-text-contrast h-5 w-5" />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {files?.map((file) => (
                        <div
                            key={file.id}
                            className="border-bdc-primary bg-bgc-page flex flex-col overflow-hidden rounded-xl border p-2 shadow-xs"
                        >
                            <a
                                href={file.accessUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block overflow-hidden rounded-lg"
                            >
                                <img
                                    src={file.accessUrl}
                                    alt={file.originalFileName}
                                    className="h-[180px] w-full rounded-lg object-cover transition-transform duration-200 hover:scale-105"
                                />
                            </a>
                            <div className="mt-2 flex items-center justify-between px-1">
                                <span className="text-text-contrast max-w-[180px] truncate text-xs font-semibold">
                                    {file.originalFileName}
                                </span>
                                <span className="text-text-muted text-[11px]">
                                    {(file.size / 1024).toFixed(0)} KB
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
            <DialogActions className="p-3">
                <Button
                    onClick={onClose}
                    variant="contained"
                    className="!bg-bgc-highlight !text-text-pure rounded-lg px-5 py-1.5 font-bold normal-case"
                >
                    {t("cancelBtn")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ReportFilesModal;
