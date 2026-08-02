import { ProblemDetail } from "@/types/responses/base.response";

export class ApiError extends Error {
    readonly status: number;
    readonly errorCode: string;

    constructor(problemDetail: ProblemDetail) {
        super(problemDetail.detail);
        this.name = "ApiError";
        this.status = problemDetail.status;
        this.errorCode = problemDetail.errorCode;
    }
}

export function getErrorCode(error: unknown): string | undefined {
    return error instanceof ApiError ? error.errorCode : undefined;
}
