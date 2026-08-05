export const OperationType = {
    UPLOAD: "UPLOAD",
    DELETE: "DELETE",
    DOWNLOAD: "DOWNLOAD",
} as const;

export type OperationType = (typeof OperationType)[keyof typeof OperationType];

export const OperationStatus = {
    COMPLETED: "COMPLETED",
    PROCESSING: "PROCESSING",
    FAILED: "FAILED",
    RETRY_LIMIT_EXCEEDED: "RETRY_LIMIT_EXCEEDED",
} as const;

export type OperationStatus =
    (typeof OperationStatus)[keyof typeof OperationStatus];

export interface FileResponse {
    id: number;

    accessUrl: string;
    originalFileName: string;

    size: number;
    checksum: string;

    operationType: OperationType;
    operationStatus: OperationStatus;
}

export type FileResult = FileResponse;
