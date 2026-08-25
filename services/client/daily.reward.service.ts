import {
    DailyRewardResponse,
    EarnDailyRewardRequest,
    UserDailyAttendanceResponse,
} from "@/types/responses/daily.reward.response";
import { clientFetchJson } from "./client.fetch";

export async function getCurrentMonthDailyRewards(): Promise<
    DailyRewardResponse[]
> {
    return clientFetchJson<DailyRewardResponse[]>(
        "/api/daily-reward/current-month",
    );
}

export async function getUserDailyAttendancesCurrentMonth(): Promise<
    UserDailyAttendanceResponse[]
> {
    return clientFetchJson<UserDailyAttendanceResponse[]>(
        "/api/user-daily-attendance/current-month",
    );
}

export async function earnDailyReward(
    dailyRewardId: number,
): Promise<UserDailyAttendanceResponse> {
    const earnDailyRewardRequest: EarnDailyRewardRequest = {
        dailyRewardId,
    };

    return clientFetchJson<UserDailyAttendanceResponse>("/api/daily-reward", {
        method: "POST",
        body: JSON.stringify(earnDailyRewardRequest),
    });
}
