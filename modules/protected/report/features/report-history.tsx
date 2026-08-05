"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import { Flag as OutlinedFlagIcon } from "lucide-react";
import ContainerBox from "@/components/ui/container.box";
import { Report, ReportFile } from "../types/report";
import { getUserReports } from "@/services/client/report.service";
import ReportHistoryTable from "../components/report-history-table";
import ReportFilesModal from "../components/report-files-modal";

interface ReportHistoryProps {
    refreshKey?: number;
}

export function ReportHistory({ refreshKey }: ReportHistoryProps) {
    const t = useTranslations("common.report");

    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

    // Modal state for viewing attached images
    const [selectedFilesModal, setSelectedFilesModal] = useState<
        ReportFile[] | null
    >(null);

    const fetchReports = async () => {
        setLoading(true);
        try {
            const data = await getUserReports();
            const sorted = [...data].sort((a, b) => b.id - a.id);
            setReports(sorted);
        } catch (err: any) {
            console.error("Failed to fetch reports:", err);
            toast.error(err.message || t("errorRequired"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [refreshKey]);

    const filterTabs = [
        { key: "ALL", label: t("filterAll"), count: reports.length },
        {
            key: "PENDING",
            label: t("statusPending"),
            count: reports.filter((r) => !r.isResolved).length,
        },
        {
            key: "RESOLVED",
            label: t("statusResolved"),
            count: reports.filter((r) => r.isResolved).length,
        },
    ];

    const filteredReports =
        statusFilter === "ALL"
            ? reports
            : statusFilter === "RESOLVED"
                ? reports.filter((r) => r.isResolved)
                : reports.filter((r) => !r.isResolved);

    if (loading) {
        return (
            <div className="space-y-4">
                <Skeleton variant="rectangular" height={50} className="rounded-xl" />
                <Skeleton variant="rectangular" height={50} className="rounded-xl" />
                <Skeleton variant="rectangular" height={50} className="rounded-xl" />
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-text-primary flex items-center gap-2 text-xl font-extrabold">
                    <OutlinedFlagIcon className="text-bgc-highlight h-5 w-5" />
                    {t("historySectionTitle")}
                </h2>

                {/* Status Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                    {filterTabs.map((tab) => {
                        const isSelected = statusFilter === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => setStatusFilter(tab.key)}
                                className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 ${isSelected
                                        ? "scale-105 bg-gray-900 font-bold text-white shadow-sm dark:bg-gray-100 dark:text-gray-900"
                                        : "bg-hbgc-app hover:bg-primary/10 text-text-contrast hover:text-primary border-bdc-primary border"
                                    }`}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        );
                    })}
                </div>
            </div>

            {reports.length === 0 ? (
                <ContainerBox className="border-bdc-primary flex flex-col items-center justify-center border py-10 text-center">
                    <OutlinedFlagIcon className="text-text-muted mb-3 text-6xl opacity-40" />
                    <p className="text-text-primary text-base font-semibold">
                        {t("noReports")}
                    </p>
                </ContainerBox>
            ) : filteredReports.length === 0 ? (
                <ContainerBox className="border-bdc-primary/40 text-text-muted border py-8 text-center text-sm font-medium">
                    {t("noReportsFiltered")}
                </ContainerBox>
            ) : (
                <ReportHistoryTable
                    reports={filteredReports}
                    onViewFiles={(files) => setSelectedFilesModal(files)}
                />
            )}

            {/* Attached Images Lightbox Modal */}
            <ReportFilesModal
                files={selectedFilesModal}
                onClose={() => setSelectedFilesModal(null)}
            />
        </div>
    );
}

export default ReportHistory;
