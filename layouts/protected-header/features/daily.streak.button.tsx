"use client";

import React from "react";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useTranslations } from "next-intl";
import { useUserLearningProgress } from "@/components/providers/user.learning.progress.provider";

const DailyStreakButton = () => {
    const t = useTranslations("dashboard");
    const { progress } = useUserLearningProgress();
    const streakDays = progress?.currentStreak ?? 0;

    return (
        <div className="group relative flex cursor-default items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-bold text-amber-700 shadow-2xs transition-all duration-300 hover:border-amber-500 hover:bg-amber-500/20 dark:border-amber-400/40 dark:bg-amber-500/15 dark:text-amber-300">
            <div className="relative flex items-center justify-center">
                <LocalFireDepartmentIcon
                    fontSize="small"
                    className="animate-pulse text-amber-500"
                    style={{ fontSize: 18 }}
                />
            </div>
            <span className="font-extrabold">
                {t("streakCount", { days: streakDays })}
            </span>
        </div>
    );
};

export default DailyStreakButton;
