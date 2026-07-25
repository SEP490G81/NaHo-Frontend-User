export type ChestType = "NONE" | "BRONZE" | "SLIVER" | "GOLD";

export interface ChestResponse {
    id: number;
    chestType: ChestType;
    description: string | null;
    minPoint: number;
    maxPoint: number | null;
}

export interface DailyRewardResponse {
    id: number;
    chest: ChestResponse;
    rewardYearMonth: string;
    dayOfMonth: number;
}

export interface EarnDailyRewardRequest {
    dailyRewardId: number;
}

export interface UserDailyAttendanceResponse {
    id: number;
    userId: number;
    dailyRewardId: number;
    attendanceDate: string;
    earnedPoint: number;
}
