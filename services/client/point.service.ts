import {
    ApiResponse,
    PageMeta,
} from "@/types/responses/base.response";
import {
    PointHistoryQuery,
    PointHistoryResponse,
} from "@/types/responses/point.response";
import { clientFetch } from "./client.fetch";

export interface PointHistoryPage {
    items: PointHistoryResponse[];
    pageMeta?: PageMeta;
}

/**
 * Service client cho lịch sử nhận điểm. Gọi qua Next route handler (/api/*) cùng
 * origin với cơ chế tự động xoay token khi 401. BE trả `data` là MẢNG, còn phân trang nằm ở `meta.pageMeta`.
 */
export async function getPointHistory(
    query: PointHistoryQuery,
): Promise<PointHistoryPage> {
    const response = await clientFetch("/api/point-history/all", {
        method: "POST",
        body: JSON.stringify(query),
    });
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result?.detail || "Không tải được lịch sử điểm");
    }
    const api = result as ApiResponse<PointHistoryResponse[]>;
    return { items: api.data ?? [], pageMeta: api.meta?.pageMeta };
}
