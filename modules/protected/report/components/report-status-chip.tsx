"use client";

import React from "react";
import Chip from "@mui/material/Chip";
import { CheckCircle2, Hourglass } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReportStatusChipProps {
    isResolved: boolean;
}

export function ReportStatusChip({ isResolved }: ReportStatusChipProps) {
    const t = useTranslations("common.report");

    if (isResolved) {
        return (
            <Chip
                icon={<CheckCircle2 className="h-3.5 w-3.5" />}
                label={t("statusResolved")}
                color="success"
                size="small"
                className="font-bold"
            />
        );
    }

    return (
        <Chip
            icon={<Hourglass className="h-3.5 w-3.5" />}
            label={t("statusPending")}
            color="warning"
            size="small"
            className="animate-pulse font-bold"
        />
    );
}

export default ReportStatusChip;
