import { UserDailyMissionResponse } from "@/types/responses/daily.mission.response";
import { EarnDailyMissionRequest } from "@/types/requests/daily.mission.request";
import { clientFetchJson } from "./client.fetch";

/**
 * Lấy danh sách nhiệm vụ hàng ngày hôm nay của người dùng
 */
export async function getTodayUserDailyMissions(): Promise<
    UserDailyMissionResponse[]
> {
    const result = await clientFetchJson<UserDailyMissionResponse[]>(
        "/api/user-daily-missions/today",
    );
    return result || [];
}

/**
 * Nhận phần thưởng nhiệm vụ hàng ngày
 */
export async function earnUserDailyMissionReward(
    userDailyMissionId: number,
): Promise<UserDailyMissionResponse> {
    const payload: EarnDailyMissionRequest = { userDailyMissionId };

    return clientFetchJson<UserDailyMissionResponse>(
        "/api/user-daily-missions/earn",
        {
            method: "POST",
            body: JSON.stringify(payload),
        },
    );
}
