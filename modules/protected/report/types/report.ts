export type ReportType = "QUESTION" | "COMMENT" | "SYSTEM";

export interface ReportFile {
    id: number;
    accessUrl: string;
    originalFileName: string;
    contentType: string;
    size: number;
    fileOperation?: {
        operationType: string;
        operationStatus: string;
    };
}

export interface Report {
    id: number;
    userId: number | string;
    questionId: number | string | null;
    commentId: number | null;
    title: string;
    description: string;
    reportType: ReportType;
    isResolved: boolean;
    files?: ReportFile[];
    createdAt?: string;
}
