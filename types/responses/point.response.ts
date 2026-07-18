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

export interface PointHistoryResponse {
    id: number;
    userId: number;
    learningPathNodeId: number;
    objectiveId: number;
    lessonId: number;
    topicId: number;
    bookId: number;
    point: number;
    transactionType: PointTransactionType;
    transactionTime: string;
}
