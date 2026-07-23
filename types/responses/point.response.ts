/** Các loại hoạt động điểm (khớp enum PointTransactionType của BE). */
export type PointTransactionType =
    | "LEARNING_PATH_NODE_COMPLETION"
    | "CAN_DO_COMPLETION"
    | "LESSON_COMPLETION"
    | "TOPIC_COMPLETION"
    | "BOOK_COMPLETION"
    | "DAILY_REWARD"
    | "STREAK_BONUS"
    | "ACHIEVEMENT_REWARD"
    | "PENALTY";

export type PointAmountType = "POSITIVE" | "NEGATIVE";
export type PointSortColumn = "POINT" | "TRANSACTION_TIME";
export type SortDirection = "ASC" | "DESC";

/** Một dòng lịch sử điểm (GET qua POST /point-history/all). */
export interface PointHistoryResponse {
    id: number;
    userId: number;
    learningPathNodeId: number | null;
    point: number;
    transactionType: PointTransactionType;
    transactionTime: string;
}

/** Body của POST /point-history/all. */
export interface PointHistoryQuery {
    page?: number;
    size?: number;
    sortColumn?: PointSortColumn;
    sortDirection?: SortDirection;
    transactionType?: PointTransactionType | null;
    amountType?: PointAmountType | null;
    transactionTimeFrom?: string | null;
    transactionTimeTo?: string | null;
}
