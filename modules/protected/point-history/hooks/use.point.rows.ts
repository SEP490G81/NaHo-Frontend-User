"use client";
import { useTranslations } from "next-intl";
import { keepPreviousData, useQueries, useQuery } from "@tanstack/react-query";
import { getPointHistory } from "@/services/client/point.service";
import { getLearningPathNodeDetail } from "@/services/client/book.service";
import type {
    PointAmountType,
    PointHistoryQuery,
    PointTransactionType,
} from "@/types/responses/point.response";

export interface PointRow {
    id: number;
    transactionTime: string;
    transactionType: PointTransactionType;
    point: number;
    content: string;
}

export interface PointRowsInput {
    page: number; // 1-based (UI)
    size: number;
    type: PointTransactionType | "ALL";
    amount: PointAmountType | "ALL";
    sortColumn: NonNullable<PointHistoryQuery["sortColumn"]>;
    sortDirection: NonNullable<PointHistoryQuery["sortDirection"]>;
    /** Khoảng ngày (YYYY-MM-DD); rỗng = không lọc. */
    from: string;
    to: string;
}

/** YYYY-MM-DD → mốc ISO đầu/cuối ngày (giờ địa phương); rỗng → null. */
function dayBound(date: string, end: boolean): string | null {
    if (!date) return null;
    const suffix = end ? "T23:59:59.999" : "T00:00:00";
    const d = new Date(date + suffix);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

/** Nạp một trang lịch sử điểm, resolve nội dung node, kèm thống kê tổng của user. */
export function usePointRows(input: PointRowsInput) {
    const t = useTranslations("pointHistory");

    const historyQ = useQuery({
        queryKey: ["point-history", input],
        queryFn: () =>
            getPointHistory({
                page: input.page - 1,
                size: input.size,
                sortColumn: input.sortColumn,
                sortDirection: input.sortDirection,
                transactionType: input.type === "ALL" ? null : input.type,
                amountType: input.amount === "ALL" ? null : input.amount,
                transactionTimeFrom: dayBound(input.from, false),
                transactionTimeTo: dayBound(input.to, true),
            }),
        placeholderData: keepPreviousData,
    });

    const items = historyQ.data?.items ?? [];
    const nodeIds = Array.from(
        new Set(
            items
                .map((i) => i.learningPathNodeId)
                .filter((x): x is number => x != null),
        ),
    );
    const nodeQs = useQueries({
        queries: nodeIds.map((id) => ({
            queryKey: ["learning-node", id],
            queryFn: () => getLearningPathNodeDetail(id),
        })),
    });
    const nodeMap = new Map(nodeIds.map((id, i) => [id, nodeQs[i]?.data]));

    const contentOf = (nodeId: number | null): string => {
        if (nodeId == null) return "—";
        const d = nodeMap.get(nodeId);
        if (!d) return "…";
        if (d.nodeType === "SPEAKING_QUESTION")
            return d.speakingQuestion?.title || "—";
        if (d.nodeType === "CHEST") return d.chest?.title || t("ctxChest");
        if (d.nodeType === "VOCABULARY_QUESTION") return t("ctxVocab");
        return "—";
    };

    const rows: PointRow[] = items.map((it) => ({
        id: it.id,
        transactionTime: it.transactionTime,
        transactionType: it.transactionType,
        point: it.point,
        content: contentOf(it.learningPathNodeId),
    }));

    return {
        rows,
        pageMeta: historyQ.data?.pageMeta,
        isLoading: historyQ.isLoading,
        isError: historyQ.isError,
    };
}
