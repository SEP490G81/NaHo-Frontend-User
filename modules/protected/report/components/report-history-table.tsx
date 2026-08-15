"use client";

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Image as ImageIcon, MessageSquareText } from "lucide-react";
import { useTranslations } from "next-intl";
import { Report, ReportFile } from "../types/report";
import ReportStatusChip from "./report-status-chip";
import ReportTypeChip from "./report-type-chip";
import { reportAnchorId } from "../hooks/use.report.anchor";

interface ReportHistoryTableProps {
    reports: Report[];
    onViewFiles: (files: ReportFile[]) => void;
    /** Báo cáo mà thông báo trỏ tới (hash URL) — nháy nền để thấy ngay. */
    highlightedReportId?: number | null;
}

export function ReportHistoryTable({
    reports,
    onViewFiles,
    highlightedReportId,
}: ReportHistoryTableProps) {
    const t = useTranslations("common.report");

    return (
        <TableContainer
            component={Paper}
            elevation={0}
            className="border-bdc-primary overflow-hidden rounded-xl border"
        >
            <Table
                sx={{
                    minWidth: "100%",
                    "& .MuiTableCell-root": { px: 2, py: 1.8 },
                }}
                aria-label="reports table"
            >
                <TableHead className="bg-bgc-subtle">
                    <TableRow>
                        <TableCell className="text-text-primary font-bold whitespace-nowrap">
                            {t("tableHeaderId")}
                        </TableCell>
                        <TableCell className="text-text-primary font-bold whitespace-nowrap">
                            {t("tableHeaderType")}
                        </TableCell>
                        <TableCell className="text-text-primary font-bold">
                            {t("tableHeaderContent")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="text-text-primary font-bold whitespace-nowrap"
                        >
                            {t("tableHeaderStatus")}
                        </TableCell>
                        <TableCell
                            align="center"
                            className="text-text-primary font-bold whitespace-nowrap"
                        >
                            {t("tableHeaderImages")}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reports.map((report) => (
                        <TableRow
                            key={report.id}
                            id={reportAnchorId(report.id)}
                            className={`hover:bg-bgc-subtle/50 transition-colors ${
                                report.id === highlightedReportId
                                    ? "animate-naho-row-flash"
                                    : ""
                            }`}
                        >
                            <TableCell className="text-text-primary font-mono font-medium whitespace-nowrap">
                                #{report.id}
                            </TableCell>
                            <TableCell className="whitespace-nowrap">
                                <ReportTypeChip
                                    reportType={report.reportType}
                                />
                            </TableCell>
                            <TableCell>
                                <p className="text-text-primary text-sm font-bold">
                                    {report.title}
                                </p>
                                <p className="text-text-muted mt-1 line-clamp-2 text-xs leading-relaxed">
                                    {report.description}
                                </p>
                                {report.adminReply && (
                                    <div className="bg-bgc-subtle border-bdc-primary mt-2.5 rounded-lg border p-2.5 text-xs">
                                        <div className="text-text-primary mb-1 flex items-center gap-1.5 font-semibold">
                                            <MessageSquareText className="text-text-contrast h-3.5 w-3.5 shrink-0" />
                                            <span>{t("adminReplyLabel")}:</span>
                                        </div>
                                        <p className="text-text-muted leading-relaxed whitespace-pre-wrap">
                                            {report.adminReply}
                                        </p>
                                    </div>
                                )}
                            </TableCell>
                            <TableCell
                                align="center"
                                className="whitespace-nowrap"
                            >
                                <ReportStatusChip
                                    isResolved={report.isResolved}
                                />
                            </TableCell>
                            <TableCell
                                align="center"
                                className="whitespace-nowrap"
                            >
                                {report.files && report.files.length > 0 ? (
                                    <div className="flex flex-col items-center gap-1.5">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            startIcon={
                                                <ImageIcon className="h-3.5 w-3.5" />
                                            }
                                            onClick={() =>
                                                onViewFiles(report.files || [])
                                            }
                                            className="border-bdc-primary text-text-contrast hover:bg-hbgc-app rounded-md border text-xs font-semibold normal-case"
                                        >
                                            {t("viewImages", {
                                                count: report.files.length,
                                            })}
                                        </Button>

                                        {/* Mini Thumbnail Row */}
                                        <div className="flex items-center gap-1">
                                            {report.files
                                                .slice(0, 3)
                                                .map((f) => (
                                                    <Box
                                                        key={f.id}
                                                        component="img"
                                                        src={f.accessUrl}
                                                        alt={f.originalFileName}
                                                        onClick={() =>
                                                            onViewFiles(
                                                                report.files ||
                                                                    [],
                                                            )
                                                        }
                                                        sx={{
                                                            width: 28,
                                                            height: 28,
                                                            objectFit: "cover",
                                                            borderRadius: "4px",
                                                            cursor: "pointer",
                                                            border: "1px solid var(--color-bdc-primary)",
                                                        }}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-text-muted text-xs italic">
                                        {t("noImages")}
                                    </span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ReportHistoryTable;
