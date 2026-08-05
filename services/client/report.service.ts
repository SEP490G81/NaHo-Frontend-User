import { ApiResponse, ProblemDetail } from "@/types/responses/base.response";
import { Report } from "@/modules/protected/report/types/report";

/**
 * Gửi báo cáo mới kèm 1 hoặc nhiều hình ảnh.
 */
export async function createReport(formData: FormData): Promise<Report> {
    const response = await fetch("/api/reports", {
        method: "POST",
        body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
        const problem = result as ProblemDetail;
        throw new Error(
            problem.detail ||
            result.message ||
            "Không thể tạo báo cáo.",
        );
    }

    const api = result as ApiResponse<Report>;
    return api.data ?? (result as Report);
}

/**
 * Lấy danh sách lịch sử báo cáo của người dùng hiện tại.
 */
export async function getUserReports(): Promise<Report[]> {
    const response = await fetch("/api/reports/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
        const problem = result as ProblemDetail;
        throw new Error(
            problem.detail ||
            result.message ||
            "Không thể lấy danh sách báo cáo.",
        );
    }

    const api = result as ApiResponse<Report[]>;
    return api.data ?? (result as Report[]);
}
