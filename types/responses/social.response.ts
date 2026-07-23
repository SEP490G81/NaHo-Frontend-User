export type ReportType = "QUESTION" | "COMMENT" | "SYSTEM";

export interface ReportResponse {
    id: number;
    userId: number;
    title: string;
    description: string;
    reportType: ReportType;
    isResolved: boolean;
    questionId: number;
    commentId: number;
}
