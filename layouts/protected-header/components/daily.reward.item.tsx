"use client";

import React from "react";
import { Divider, Zoom } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { DailyRewardResponse } from "@/types/responses/daily.reward.response";
import { getChestBadgeColor, renderChestIcon } from "@/layouts/protected-header/utils/daily.reward.util";
import { useTranslations } from "next-intl";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";

interface DailyRewardItemProps {
    data: DailyRewardResponse;
    dayNumber: number;
    isToday: boolean;
    isLocked: boolean;
    isPast: boolean;
}

const DailyRewardItem: React.FC<DailyRewardItemProps> = ({
    data,
    dayNumber,
    isToday,
    isLocked,
    isPast,
}) => {
    const t = useTranslations("dailyReward");
    const chest = data.chest;
    const chestType = chest.chestType;
    const chestTypeLower = (chestType?.toLowerCase() || "none") as
        | "bronze"
        | "silver"
        | "gold"
        | "none";
    const chestName = t(`chest.${chestTypeLower}`);
    const chestBadgeColor = getChestBadgeColor(chestType);

    const tooltipContent = (
        <div className="max-w-xs space-y-1.5 p-1.5 font-sans text-xs">
            <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-medium text-white/80">
                    {t("tooltip.chestLabel")}
                </span>
                <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${chestBadgeColor}`}
                >
                    {chestName}
                </span>
            </div>
            <Divider
                sx={{
                    marginBlock: 0.75,
                    borderColor: "rgba(255, 255, 255, 0.2)",
                }}
            />
            <div className="text-xs font-semibold text-white">
                {t("expectedReward", {
                    min: chest.minPoint,
                    max: chest.maxPoint ?? chest.minPoint,
                })}
            </div>
        </div>
    );

    return (
        <div
            className={`group relative flex min-h-20.5 cursor-pointer flex-col items-center justify-between overflow-hidden rounded-xl border p-2 transition-all duration-300 select-none sm:min-h-[90px] ${
                isToday
                    ? "z-10 scale-[1.04] border-pink-500 bg-pink-50/80 text-pink-600 shadow-md ring-2 ring-pink-500/40 dark:border-pink-500 dark:bg-pink-950/40 dark:text-pink-400 dark:ring-pink-500/50"
                    : isLocked
                      ? "border-bdc-primary/50 bg-bgc-page/50 opacity-80"
                      : "border-bdc-primary bg-bgc-app hover:border-pink-400 hover:bg-pink-50/30 hover:shadow-xs dark:hover:border-pink-500 dark:hover:bg-pink-950/20"
            }`}
        >
            <div className="flex w-full items-center justify-between px-1">
                <span
                    className={`text-xs font-extrabold ${
                        isToday
                            ? "text-sm text-pink-600 dark:text-pink-400"
                            : "text-text-contrast/80"
                    }`}
                >
                    {dayNumber < 10 ? `0${dayNumber}` : dayNumber}
                </span>

                <TooltipCustom
                    title={tooltipContent}
                    slots={{ transition: Zoom }}
                    placement="top"
                    arrow
                >
                    <button
                        type="button"
                        className="text-text-muted z-20 cursor-pointer rounded-full p-0.5 transition-colors hover:text-pink-500 focus:outline-hidden dark:hover:text-pink-400"
                        aria-label={t("infoTooltip")}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <InfoOutlinedIcon sx={{ fontSize: 16 }} />
                    </button>
                </TooltipCustom>
            </div>

            <div className="my-auto flex items-center justify-center py-1 transition-transform duration-300 group-hover:scale-110">
                {renderChestIcon(chestType, isToday ? 48 : 42)}
            </div>

            {isLocked && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-slate-900/30 backdrop-blur-[1px] transition-opacity dark:bg-slate-950/60">
                    <div className="flex items-center justify-center rounded-full bg-slate-900/70 p-1.5 text-white shadow-sm dark:bg-slate-800/80">
                        <LockOutlinedIcon sx={{ fontSize: 18 }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyRewardItem;
