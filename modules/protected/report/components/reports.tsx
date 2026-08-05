"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import ContainerBox from "@/components/ui/container.box";
import ReportCreateForm from "../features/report-create-form";
import ReportHistory from "../features/report-history";

const Reports = () => {
    const t = useTranslations("common.report");
    const [refreshKey, setRefreshKey] = useState<number>(0);

    const handleReportCreated = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="space-y-5">
            <ContainerBox className="text-center">
                <h1 className="text-text-primary mb-1 text-center text-2xl font-extrabold">
                    {t("pageTitle")}
                </h1>
                <p className="text-text-muted text-center text-sm">
                    {t("pageSubtitle")}
                </p>
            </ContainerBox>

            <ReportCreateForm onSuccess={handleReportCreated} />

            <ReportHistory refreshKey={refreshKey} />
        </div>
    );
};

export default Reports;
