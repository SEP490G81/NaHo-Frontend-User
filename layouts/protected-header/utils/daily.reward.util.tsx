import { ChestType } from "@/types/responses/daily.reward.response";
import { ChestBronze, ChestGold, ChestNone, ChestSilver } from "@/components/ui/chests";

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

export const getChestLabel = (chestType: ChestType | string) => {
    switch (chestType) {
        case "BRONZE":
            return {
                name: "Rương Đồng",
                color: "bg-amber-700/15 text-amber-600 dark:text-amber-400 border-amber-600/30",
            };
        case "SILVER":
            return {
                name: "Rương Bạc",
                color: "bg-slate-400/15 text-slate-600 dark:text-slate-300 border-slate-400/30",
            };
        case "GOLD":
            return {
                name: "Rương Vàng",
                color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/40",
            };
        case "NONE":
        default:
            return {
                name: "Điểm Trực Tiếp",
                color: "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30",
            };
    }
};

