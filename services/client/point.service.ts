import {
    ApiResponse,
    PageMeta,
    ProblemDetail,
} from "@/types/responses/base.response";
import {
    PointHistoryQuery,
    PointHistoryResponse,
} from "@/types/responses/point.response";

export interface PointHistoryPage {
    items: PointHistoryResponse[];
    pageMeta?: PageMeta;
}

/**
 * Gọi proxy /api/*; nếu BE trả 401 (access token hết hạn giữa phiên sống lâu,
 * middleware không refresh vì matcher loại /api) thì rotation 1 lần rồi thử
 * lại. Body dạng string tái sử dụng được nên retry an toàn.
 */
async function apiRequest(
    input: string,
    init?: RequestInit,
): Promise<Response> {
    let response = await fetch(input, init);
    if (response.status === 401) {
        const rotated = await fetch("/api/auth/rotation", {
            method: "POST",
            credentials: "include",
        });
        if (rotated.ok) {
            response = await fetch(input, init);
        }
    }
    return response;
}

/**
 * Service client cho lịch sử nhận điểm. Gọi qua Next route handler (/api/*) cùng
 * origin (pattern 2 lớp). BE trả `data` là MẢNG, còn phân trang nằm ở `meta.pageMeta`.
 */
export async function getPointHistory(
    query: PointHistoryQuery,
): Promise<PointHistoryPage> {
    const response = await apiRequest("/api/point-history/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(
            (result as ProblemDetail).detail || "Không tải được lịch sử điểm",
        );
    }
    const api = result as ApiResponse<PointHistoryResponse[]>;
    return { items: api.data ?? [], pageMeta: api.meta?.pageMeta };
}
