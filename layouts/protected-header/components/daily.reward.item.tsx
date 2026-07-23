"use client";

import React from "react";
import { Tooltip, Zoom } from "@mui/material";
import { Lock, Sparkles } from "lucide-react";
import { DailyRewardResponse, ChestType } from "@/types/responses/daily.reward.response";
import ChestNone from "@/components/ui/icons/chests/chest.none";
import ChestBronze from "@/components/ui/icons/chests/chest.bronze";
import ChestSilver from "@/components/ui/icons/chests/chest.silver";
import ChestGold from "@/components/ui/icons/chests/chest.gold";

interface DailyRewardItemProps {
    data: DailyRewardResponse | null;
    dayNumber: number;
    isToday: boolean;
    isLocked: boolean;
    isPast: boolean;
}

const renderChestIcon = (chestType?: ChestType | string, size: number = 44) => {
    switch (chestType) {
        case "BRONZE":
            return <ChestBronze size={size} />;
        case "SILVER":
        case "SLIVER": // Backend API sends "SLIVER"
            return <ChestSilver size={size} />;
        case "GOLD":
            return <ChestGold size={size} />;
        case "NONE":
        default:
            return <ChestNone size={size} />;
    }
};

const getChestLabel = (chestType?: ChestType | string) => {
    switch (chestType) {
        case "BRONZE":
            return { name: "Rương Đồng", color: "bg-amber-700/15 text-amber-600 dark:text-amber-400 border-amber-600/30" };
        case "SILVER":
        case "SLIVER":
            return { name: "Rương Bạc", color: "bg-slate-400/15 text-slate-600 dark:text-slate-300 border-slate-400/30" };
        case "GOLD":
            return { name: "Rương Vàng", color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/40" };
        case "NONE":
        default:
            return { name: "Điểm Trực Tiếp", color: "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30" };
    }
};

const DailyRewardItem: React.FC<DailyRewardItemProps> = ({
    data,
    dayNumber,
    isToday,
    isLocked,
    isPast,
}) => {
    const chest = data?.chest;
    const chestType = chest?.chestType;
    const chestInfo = getChestLabel(chestType);

    // Format point label for tooltip
    let pointText = "+5 pt";
    if (chest) {
        if (chest.minPoint && chest.maxPoint && chest.minPoint !== chest.maxPoint) {
            pointText = `${chest.minPoint}~${chest.maxPoint} pt`;
        } else if (chest.minPoint) {
            pointText = `+${chest.minPoint} pt`;
        }
    }

    // Custom Tooltip Content
    const tooltipContent = (
        <div className="p-3 max-w-xs space-y-2 text-xs font-sans">
            <div className="flex items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    Ngày {dayNumber}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${chestInfo.color}`}>
                    {chestInfo.name}
                </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {chest?.description || "Điểm danh đúng ngày để nhận điểm tích lũy đổi quà hấp dẫn."}
            </p>

            <div className="pt-1 flex items-center justify-between text-gray-500 dark:text-gray-400 font-medium">
                <span>Phần thưởng dự kiến:</span>
                <span className="font-bold text-pink-600 dark:text-pink-400 text-xs">
                    {pointText}
                </span>
            </div>

            <div className="pt-1 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
                <span className="text-gray-400">Trạng thái:</span>
                {isToday ? (
                    <span className="text-pink-500 font-bold flex items-center gap-1">
                        ● Hôm nay (Sẵn sàng)
                    </span>
                ) : isLocked ? (
                    <span className="text-gray-400 flex items-center gap-1">
                        🔒 Chưa mở (Khóa)
                    </span>
                ) : (
                    <span className="text-emerald-500 font-medium flex items-center gap-1">
                        ✓ Ngày đã qua
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <Tooltip
            title={tooltipContent}
            slots={{ transition: Zoom }}
            arrow
            placement="top"
            slotProps={{
                tooltip: {
                    sx: {
                        bgcolor: "var(--color-bgc-app)",
                        color: "var(--color-text-contrast)",
                        border: "1px solid var(--color-bdc-primary)",
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                        borderRadius: "12px",
                        p: 0,
                    },
                },
                arrow: {
                    sx: {
                        color: "var(--color-bgc-app)",
                        "&::before": {
                            border: "1px solid var(--color-bdc-primary)",
                        },
                    },
                },
            }}
        >
            <div
                className={`
                    relative group flex flex-col items-center justify-between p-2 rounded-xl transition-all duration-300 cursor-pointer select-none
                    min-h-[82px] sm:min-h-[90px] border
                    ${
                        isToday
                            ? "bg-gradient-to-b from-pink-500/15 via-rose-500/10 to-amber-500/15 border-pink-500 shadow-md shadow-pink-500/20 ring-2 ring-pink-500/80 scale-[1.04] z-10"
                            : isLocked
                            ? "bg-bgc-page/40 border-bdc-primary/60 opacity-60 hover:opacity-90 hover:border-pink-300/50"
                            : "bg-bgc-app border-bdc-primary hover:border-pink-400/50 hover:shadow-sm"
                    }
                `}
            >
                {/* Header Day Number & Status Indicator */}
                <div className="w-full flex items-center justify-between px-1">
                    <span
                        className={`text-xs font-extrabold ${
                            isToday
                                ? "text-pink-600 dark:text-pink-400 text-sm"
                                : "text-text-contrast/80"
                        }`}
                    >
                        {dayNumber < 10 ? `0${dayNumber}` : dayNumber}
                    </span>

                    {isLocked ? (
                        <Lock className="w-3 h-3 text-text-muted opacity-60" />
                    ) : null}
                </div>

                {/* Center Chest Graphic */}
                <div className="my-auto py-1 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {renderChestIcon(chestType, isToday ? 48 : 42)}
                </div>
            </div>
        </Tooltip>
    );
};

export default DailyRewardItem;