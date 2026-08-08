"use client";

import React from "react";
import Chip from "@mui/material/Chip";
import { useTranslations } from "next-intl";
import { ReportType } from "../types/report";

interface ReportTypeChipProps {
    reportType: ReportType | string;
}

export function ReportTypeChip({ reportType }: ReportTypeChipProps) {
    const t = useTranslations("common.report");
    const type = String(reportType || "SYSTEM").toUpperCase();

    switch (type) {
        case "QUESTION":
            return (
                <Chip
                    label={t("typeQuestion")}
                    size="small"
                    className="!border !border-sky-500/30 !bg-sky-500/15 font-bold !text-sky-600 dark:!text-sky-400"
                />
            );
        case "COMMENT":
            return (
                <Chip
                    label={t("typeComment")}
                    size="small"
                    className="!border !border-purple-500/30 !bg-purple-500/15 font-bold !text-purple-600 dark:!text-purple-400"
                />
            );
        case "SYSTEM":
        default:
            return (
                <Chip
                    label={t("typeSystem")}
                    size="small"
                    className="!border !border-amber-500/30 !bg-amber-500/15 font-bold !text-amber-600 dark:!text-amber-400"
                />
            );
    }
}

export default ReportTypeChip;
