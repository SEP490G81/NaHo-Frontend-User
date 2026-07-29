import { ProblemDetail } from "@/types/responses/base.response";
import { UserDailyMissionResponse } from "@/types/responses/daily.mission.response";
import { EarnDailyMissionRequest } from "@/types/requests/daily.mission.request";

/**
 * Lấy danh sách nhiệm vụ hàng ngày hôm nay của người dùng
 */
export async function getTodayUserDailyMissions(): Promise<
    UserDailyMissionResponse[]
> {
    const response = await fetch("/api/user-daily-missions/today", {
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể lấy danh sách nhiệm vụ hàng ngày hôm nay",
        );
    }

    return (result || []) as UserDailyMissionResponse[];
}

/**
 * Nhận phần thưởng nhiệm vụ hàng ngày
 */
export async function earnUserDailyMissionReward(
    userDailyMissionId: number,
): Promise<UserDailyMissionResponse> {
    const payload: EarnDailyMissionRequest = { userDailyMissionId };

    const response = await fetch("/api/user-daily-missions/earn", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể nhận phần thưởng nhiệm vụ hàng ngày",
        );
    }

    return result as UserDailyMissionResponse;
}
