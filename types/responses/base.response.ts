export interface ApiMeta {
    traceId: string;
    timestamp: string;
    pageMeta: PageMeta;
}
export interface PageMeta {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
}
export interface ApiResponse<T> {
    meta: ApiMeta;
    message: string;
    data: T;
}

export interface ProblemDetail {
    title: string;
    status: number;
    detail: string;
    errorCode: string;
}
