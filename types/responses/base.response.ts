export interface PageMeta {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
}

export interface ProblemDetail {
    title: string;
    status: number;
    detail: string;
    errorCode: string;
    traceId?: string;
    timestamp?: string;
    fieldErrors?: FieldErrorResponse[];
}

export interface ApiMeta {
    traceId: string;
    timestamp: string;
    pageMeta: PageMeta;
}

export interface ApiResponse<T> {
    meta: ApiMeta;
    message: string;
    data: T;
}

export interface FieldErrorResponse {
    field: string;
    message: string;
}

export interface ProblemDetailResponse {
    errorCode?: string;
    traceId?: string;
    timestamp?: string;
    fieldErrors?: FieldErrorResponse[];
}

export interface ProblemDetailResponseBuilder {
    response: ProblemDetailResponse;
}
