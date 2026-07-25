import { ChestType } from "@/types/responses/daily.reward.response";
import {
    ChestBronze,
    ChestGold,
    ChestNone,
    ChestSilver,
} from "@/components/ui/chests";

export const renderChestIcon = (
    chestType?: ChestType | string,
    size: number = 44,
) => {
    switch (chestType) {
        case "BRONZE":
            return <ChestBronze size={size} />;
        case "SILVER":
            return <ChestSilver size={size} />;
        case "GOLD":
            return <ChestGold size={size} />;
        case "NONE":
        default:
            return <ChestNone size={size} />;
    }
};

export const getChestBadgeColor = (chestType?: ChestType | string) => {
    switch (chestType) {
        case "BRONZE":
            return "bg-amber-700/15 text-amber-700 dark:text-amber-400 border-amber-600/30";
        case "SILVER":
            return "bg-slate-400/15 text-slate-700 dark:text-slate-300 border-slate-400/30";
        case "GOLD":
            return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/40";
        case "NONE":
        default:
            return "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30";
    }
};

export interface DailyRewardItemClassParams {
    isLocked: boolean;
    isAttended: boolean;
    isMissed: boolean;
    isToday: boolean;
    isClaiming?: boolean;
}

/** Trả về class styling cho thẻ DailyRewardItem dựa theo trạng thái điểm danh. */
export const getDailyRewardItemCardClass = ({
    isLocked,
    isAttended,
    isMissed,
    isToday,
    isClaiming = false,
}: DailyRewardItemClassParams): string => {
    let stateStyle = "";

    if (isLocked) {
        stateStyle =
            "border-bdc-primary/50 bg-bgc-page/50 cursor-not-allowed opacity-80";
    } else if (isAttended) {
        stateStyle =
            "border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 cursor-default";
    } else if (isMissed) {
        stateStyle =
            "border-bdc-primary/30 bg-bgc-page/20 opacity-40 cursor-not-allowed filter grayscale-[0.5]";
    } else if (isToday) {
        stateStyle =
            "z-10 cursor-pointer scale-[1.04] border-pink-500 bg-pink-50/80 text-pink-600 shadow-md ring-2 ring-pink-500/40 hover:scale-[1.06] active:scale-[0.98] dark:border-pink-500 dark:bg-pink-950/40 dark:text-pink-400 dark:ring-pink-500/50";
    } else {
        stateStyle =
            "border-bdc-primary bg-bgc-app cursor-pointer hover:scale-[1.02] hover:border-pink-400 hover:bg-pink-50/30 hover:shadow-xs active:scale-[0.98] dark:hover:border-pink-500 dark:hover:bg-pink-950/20";
    }

    const claimingStyle = isClaiming ? "pointer-events-none opacity-70" : "";

    return `group relative flex min-h-20.5 flex-col items-center justify-between overflow-hidden rounded-xl border p-2 transition-all duration-300 select-none sm:min-h-[90px] ${stateStyle} ${claimingStyle}`.trim();
};

/** Trả về class styling cho số ngày hiển thị ở góc thẻ điểm danh. */
export const getDailyRewardDayNumberClass = (
    isAttended: boolean,
    isToday: boolean,
): string => {
    let colorClass = "text-text-contrast/80";

    if (isAttended) {
        colorClass = "text-emerald-600 dark:text-emerald-400";
    } else if (isToday) {
        colorClass = "text-sm text-pink-600 dark:text-pink-400";
    }

    return `flex items-center gap-1 text-xs font-extrabold ${colorClass}`;
};

/** Trả về class styling cho ô tiêu đề ngày trong tuần (T2-CN). */
export const getDayOfWeekHeaderClass = (dayIndex: number): string => {
    return `rounded-lg py-1.5 text-xs font-bold ${
        dayIndex >= 5
            ? "bg-rose-50 text-rose-500 dark:bg-rose-950/20"
            : "text-text-muted bg-bgc-page/40"
    }`;
};
