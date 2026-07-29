"use client";
import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Pagination } from "@mui/material";
import type {
    PointAmountType,
    PointSortColumn,
    PointTransactionType,
    SortDirection,
} from "@/types/responses/point.response";
import { usePointRows } from "../hooks/use.point.rows";
import { ContainerBox } from "@/components/ui/container.box";
import PointHistoryHeader from "./point.history.header";
import PointHistoryToolbar from "./point.history.toolbar";
import PointHistoryTable from "./point.history.table";

const PAGE_SIZE = 10;

export function PointHistory() {
    const t = useTranslations("pointHistory");
    const [page, setPage] = useState(1);
    const [type, setType] = useState<PointTransactionType | "ALL">("ALL");
    const [amount, setAmount] = useState<PointAmountType | "ALL">("ALL");
    const [sortColumn, setSortColumn] =
        useState<PointSortColumn>("TRANSACTION_TIME");
    const [sortDirection, setSortDirection] = useState<SortDirection>("DESC");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const { rows, pageMeta, isLoading, isError } = usePointRows({
        page,
        size: PAGE_SIZE,
        type,
        amount,
        sortColumn,
        sortDirection,
        from,
        to,
    });

    const changeType = (v: PointTransactionType | "ALL") => {
        setType(v);
        setPage(1);
    };
    const changeAmount = (v: PointAmountType | "ALL") => {
        setAmount(v);
        setPage(1);
    };
    const changeFrom = (v: string) => {
        setFrom(v);
        setPage(1);
    };
    const changeTo = (v: string) => {
        setTo(v);
        setPage(1);
    };
    const clearDates = () => {
        setFrom("");
        setTo("");
        setPage(1);
    };
    const sortBy = (col: PointSortColumn) => {
        if (col === sortColumn) {
            setSortDirection((d) => (d === "ASC" ? "DESC" : "ASC"));
        } else {
            setSortColumn(col);
            setSortDirection("DESC");
        }
        setPage(1);
    };

    return (
        <div className="mx-auto max-w-5xl space-y-5">
            <PointHistoryHeader
                totalActivities={pageMeta?.totalElements ?? rows.length}
            />

            <PointHistoryToolbar
                type={type}
                amount={amount}
                from={from}
                to={to}
                onType={changeType}
                onAmount={changeAmount}
                onFrom={changeFrom}
                onTo={changeTo}
                onClearDates={clearDates}
            />

            {isLoading ? (
                <p className="text-text-muted py-16 text-center">
                    {t("loading")}
                </p>
            ) : isError ? (
                <p className="text-text-muted py-16 text-center">
                    {t("error")}
                </p>
            ) : rows.length === 0 ? (
                <ContainerBox className="border-bdc-muted flex flex-col items-center gap-2 border border-dashed text-center">
                    <Sparkles className="text-text-muted h-9 w-9" />
                    <p className="text-text-contrast font-semibold">
                        {t("empty")}
                    </p>
                    <p className="text-text-muted max-w-md text-sm">
                        {t("emptyHint")}
                    </p>
                </ContainerBox>
            ) : (
                <PointHistoryTable
                    rows={rows}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={sortBy}
                />
            )}

            {pageMeta && pageMeta.totalPages > 1 && (
                <div className="flex justify-center">
                    <Pagination
                        count={pageMeta.totalPages}
                        page={page}
                        onChange={(_, v) => setPage(v)}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "var(--color-text-contrast)",
                                "&.Mui-selected": {
                                    backgroundColor:
                                        "var(--color-bgc-highlight)",
                                    color: "var(--color-text-pure)",
                                },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default PointHistory;
