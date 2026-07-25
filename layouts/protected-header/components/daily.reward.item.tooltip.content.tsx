import React from "react";
import { Divider } from "@mui/material";
import { useTranslations } from "next-intl";
import { getChestBadgeColor } from "@/layouts/protected-header/utils/daily.reward.util";
import { ChestResponse } from "@/types/responses/daily.reward.response";

const DailyRewardItemTooltipContent = ({ chest }: { chest: ChestResponse }) => {
    const chestType = chest.chestType;
    const t = useTranslations("dailyReward");
    const chestTypeLower = (chestType?.toLowerCase() || "none") as
        | "bronze"
        | "silver"
        | "gold"
        | "none";
    const chestName = t(`chest.${chestTypeLower}`);
    const chestBadgeColor = getChestBadgeColor(chestType);

    return (
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
};

export default DailyRewardItemTooltipContent;
