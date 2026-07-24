export type ChestType = "NONE" | "BRONZE" | "SLIVER" | "GOLD";

export interface ChestResult {
    id: number;
    chestType: ChestType;
    description: string | null;
    minPoint: number;
    maxPoint: number | null;
}

export interface DailyRewardResponse {
    id: number;
    chest: ChestResult | null;
    rewardYearMonth: string;
    dayOfMonth: number;
}
