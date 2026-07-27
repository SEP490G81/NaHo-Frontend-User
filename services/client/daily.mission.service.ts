import { ProblemDetail } from "@/types/responses/base.response";
import {
    DailyMissionResponse,
    UserDailyMissionResponse,
} from "@/types/responses/daily.mission.response";

export async function getTodayDailyMissions(): Promise<DailyMissionResponse[]> {
    const response = await fetch("/api/daily-missions/today", {
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể lấy danh sách nhiệm vụ hàng ngày",
        );
    }

    return (result || []) as DailyMissionResponse[];
}

export async function getUserDailyMissions(): Promise<UserDailyMissionResponse[]> {
    const response = await fetch("/api/user-daily-missions/all", {
        credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
        const problemDetail = result as ProblemDetail;
        throw new Error(
            problemDetail?.detail ||
                problemDetail?.title ||
                "Không thể lấy lịch sử nhiệm vụ hàng ngày của người dùng",
        );
    }

    return (result || []) as UserDailyMissionResponse[];
}
