import { ProblemDetail } from "@/types/responses/base.response";
import {
    DailyRewardResponse,
    EarnDailyRewardRequest,
    UserDailyAttendanceResponse
} from "@/types/responses/daily.reward.response";

export async function getCurrentMonthDailyRewards() {
    const response = await fetch("/api/daily-reward/current-month", {
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể lấy dữ liệu điểm danh hàng ngày",
        );
    }

    return result as DailyRewardResponse[];
}

export async function getUserDailyAttendancesCurrentMonth() {
    const response = await fetch("/api/user-daily-attendance/current-month", {
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể lấy lịch sử điểm danh hàng ngày",
        );
    }

    return result as UserDailyAttendanceResponse[];
}

export async function earnDailyReward(dailyRewardId: number) {
    const earnDailyRewardRequest: EarnDailyRewardRequest = {
        dailyRewardId,
    };

    const response = await fetch("/api/daily-reward", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(earnDailyRewardRequest),
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể nhận phần thưởng điểm danh",
        );
    }

    return result as UserDailyAttendanceResponse;
}
