import { ProblemDetail } from "@/types/responses/base.response";
import { DailyRewardResponse } from "@/types/responses/daily.reward.response";

export async function getCurrentMonthDailyRewards() {
    const response = await fetch("/api/daily-reward", {
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(problemDetail?.detail || "Không thể lấy dữ liệu điểm danh hàng ngày");
    }

    return result as DailyRewardResponse[];
}
