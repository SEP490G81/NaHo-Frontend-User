"use client";

import React from "react";
import {CircularProgress, Zoom} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {Check} from "lucide-react";
import {DailyRewardResponse} from "@/types/responses/daily.reward.response";
import {
    getDailyRewardDayNumberClass,
    getDailyRewardItemCardClass,
    renderChestIcon,
} from "@/layouts/protected-header/utils/daily.reward.util";
import {TooltipCustom} from "@/components/ui/mui-custom/tooltip.custom";
import DailyRewardItemTooltipContent from "@/layouts/protected-header/components/daily.reward.item.tooltip.content";

interface DailyRewardItemProps {
    data: DailyRewardResponse;
    dayNumber: number;
    isToday: boolean;
    isLocked: boolean;
    isPast: boolean;
    isAttended?: boolean;
    onClick?: () => void;
    isClaiming?: boolean;
}

const DailyRewardItem: React.FC<DailyRewardItemProps> = ({
    data,
    dayNumber,
    isToday,
    isLocked,
    isPast,
    isAttended = false,
    onClick,
    isClaiming = false,
}) => {
    const chest = data.chest;
    const chestType = chest.chestType;

    const isMissed = isPast && !isAttended;

    const handleClick = () => {
        if (!isLocked && !isAttended && !isMissed && !isClaiming && onClick) {
            onClick();
        }
    };

    const cardClassName = getDailyRewardItemCardClass({
        isLocked,
        isAttended,
        isMissed,
        isToday,
        isClaiming,
    });

    const dayNumberClassName = getDailyRewardDayNumberClass(
        isAttended,
        isToday,
    );

    return (
        <button onClick={handleClick} className={cardClassName}>
            <div className="flex w-full items-center justify-between px-1">
                <span className={dayNumberClassName}>
                    {dayNumber < 10 ? `0${dayNumber}` : dayNumber}
                </span>

                <TooltipCustom
                    title={<DailyRewardItemTooltipContent chest={chest} />}
                    slots={{ transition: Zoom }}
                    placement="top"
                    arrow
                >
                    <span className="z-20 flex h-4 w-4 cursor-pointer items-center justify-center">
                        <InfoOutlinedIcon
                            sx={{ fontSize: "16px" }}
                            className="text-text-muted hover:text-text-highlight"
                        />
                    </span>
                </TooltipCustom>
            </div>

            <div className="relative my-auto flex items-center justify-center py-1 transition-transform duration-300 group-hover:scale-110">
                {isClaiming ? (
                    <CircularProgress size={32} color="secondary" />
                ) : (
                    <>
                        {renderChestIcon(
                            chestType,
                            isToday && !isAttended ? 48 : 42,
                        )}
                        {isAttended && (
                            <div className="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs ring-2 ring-white dark:ring-slate-900">
                                <Check className="h-3.5 w-3.5 stroke-3" />
                            </div>
                        )}
                    </>
                )}
            </div>

            {isLocked && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-slate-900/30 backdrop-blur-[1px] transition-opacity dark:bg-slate-950/60">
                    <div className="flex items-center justify-center rounded-full bg-slate-900/70 p-1.5 text-white shadow-sm dark:bg-slate-800/80">
                        <LockOutlinedIcon sx={{ fontSize: 18 }} />
                    </div>
                </div>
            )}
        </button>
    );
};

export default DailyRewardItem;
