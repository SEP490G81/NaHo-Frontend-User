import React from "react";
import { Trophy } from "lucide-react";
import { cn } from "@/libs/utils";
import { MEDAL_CLASSES } from "../constants/leaderboard.constant";

interface RankBadgeProps {
    rank: number;
    /** Thứ hạng ngoài Top thì hiển thị dạng "#42" cho dễ phân biệt. */
    withHashPrefix?: boolean;
}

export function RankBadge({ rank, withHashPrefix = false }: RankBadgeProps) {
    // Top 3 (chỉ trong bảng, không tính ô "vị trí của bạn") đeo cúp vàng/bạc/đồng.
    const isPodium = !withHashPrefix && rank >= 1 && rank <= 3;

    if (isPodium) {
        return (
            <div
                className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                    MEDAL_CLASSES[rank],
                )}
            >
                <Trophy className="h-[18px] w-[18px]" />
            </div>
        );
    }

    return (
        <div
            className={cn(
                "flex h-9 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                withHashPrefix ? "min-w-9 px-2.5" : "w-9",
                "bg-bgc-page text-text-muted border-bdc-primary border",
            )}
        >
            {withHashPrefix ? `#${rank}` : rank}
        </div>
    );
}

export default RankBadge;
