"use client";

import React from "react";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { TextFieldCustom } from "@/components/ui/mui-custom/text.field.custom";
import { Image as ImageIcon, Trash2, Plus } from "lucide-react";

interface ReportFormFieldsProps {
    title: string;
    setTitle: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    files: File[];
    filePreviews: string[];
    handleFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveFile: (index: number) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function ReportFormFields({
    title,
    setTitle,
    description,
    setDescription,
    files,
    filePreviews,
    handleFilesChange,
    handleRemoveFile,
    fileInputRef,
}: ReportFormFieldsProps) {
    const t = useTranslations("common.report");

    return (
        <div className="space-y-4">
            {/* Title input */}
            <div className="space-y-1">
                <label className="text-text-contrast block text-sm font-semibold">
                    {t("fieldTitle")} <span className="text-red-500">*</span>
                </label>
                <TextFieldCustom
                    fullWidth
                    size="small"
                    placeholder={t("titlePlaceholder")}
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        setTitle(e.target.value)
                    }
                    required
                />
            </div>

            {/* Description input */}
            <div className="space-y-1">
                <label className="text-text-contrast block text-sm font-semibold">
                    {t("fieldDescription")}{" "}
                    <span className="text-red-500">*</span>
                </label>
                <TextFieldCustom
                    fullWidth
                    multiline
                    rows={4}
                    placeholder={t("descriptionPlaceholder")}
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        setDescription(e.target.value)
                    }
                    required
                />
            </div>

            {/* Image Upload Input */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-text-contrast block text-sm font-semibold">
                        {t("fieldImage")}
                    </label>
                    {files.length > 0 && (
                        <span className="text-text-muted text-xs font-medium">
                            {t("imagesAttachedCount", { count: files.length })}
                        </span>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFilesChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                />

                {files.length === 0 ? (
                    <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        variant="outlined"
                        startIcon={<ImageIcon className="h-4 w-4" />}
                        className="border-bdc-primary text-text-contrast hover:bg-hbgc-app hover:border-bdc-muted w-full border border-dashed rounded-lg py-3 font-semibold normal-case"
                    >
                        {t("uploadImagesBtn")}
                    </Button>
                ) : (
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                            {files.map((file, idx) => (
                                <div
                                    key={idx}
                                    className="border-bdc-primary bg-bgc-page relative group flex flex-col items-center overflow-hidden rounded-lg border p-2 shadow-xs transition-all hover:shadow-md"
                                >
                                    <img
                                        src={filePreviews[idx]}
                                        alt={file.name}
                                        className="h-[90px] w-full rounded-md object-cover border border-bdc-primary"
                                    />
                                    <div className="mt-2 w-full min-w-0">
                                        <Typography
                                            variant="caption"
                                            className="text-text-contrast block truncate font-medium"
                                        >
                                            {file.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            className="text-text-muted block text-[11px]"
                                        >
                                            {(file.size / 1024).toFixed(0)} KB
                                        </Typography>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(idx)}
                                        className="bg-red-500/80 hover:bg-red-600 absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-white transition-colors"
                                        title={t("removeBtn")}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            variant="outlined"
                            size="small"
                            startIcon={<Plus className="h-4 w-4" />}
                            className="border-bdc-primary text-text-contrast hover:bg-hbgc-app hover:border-bdc-muted border rounded-lg font-semibold normal-case"
                        >
                            {t("uploadImageBtn")}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ReportFormFields;
