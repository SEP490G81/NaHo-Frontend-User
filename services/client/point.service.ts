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
 * Service client cho lịch sử nhận điểm. Gọi qua Next route handler (/api/*) cùng
 * origin (pattern 2 lớp). BE trả `data` là MẢNG, còn phân trang nằm ở `meta.pageMeta`.
 */
export async function getPointHistory(
    query: PointHistoryQuery,
): Promise<PointHistoryPage> {
    const response = await fetch("/api/point-history/all", {
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
