import { Report } from "@/modules/protected/report/types/report";
import { clientFetchJson } from "./client.fetch";

/**
 * Gửi báo cáo mới kèm 1 hoặc nhiều hình ảnh.
 */
export async function createReport(formData: FormData): Promise<Report> {
    return clientFetchJson<Report>("/api/reports", {
        method: "POST",
        body: formData,
    });
}

/**
 * Lấy danh sách lịch sử báo cáo của người dùng hiện tại.
 */
export async function getUserReports(): Promise<Report[]> {
    const result = await clientFetchJson<Report[]>("/api/reports/user", {
        method: "GET",
        cache: "no-store",
    });
    return result || [];
}
