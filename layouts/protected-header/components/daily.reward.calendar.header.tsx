import React from "react";
import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslations } from "next-intl";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";

const DailyRewardCalendarHeader = ({
    handleClose,
}: {
    handleClose: () => void;
}) => {
    const t = useTranslations("dailyReward");
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthIndex = now.getMonth(); // 0-indexed

    const formattedMonthYear = t("monthFormat", {
        month: String(currentMonthIndex + 1).padStart(2, "0"),
        year: currentYear,
    });

    return (
        <DialogTitle
            sx={{ p: 0, position: "relative" }}
            className="border-bdc-primary bg-bgc-app border-b"
        >
            <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center gap-3">
                    <h2 className="text-text-contrast text-base font-bold tracking-tight sm:text-lg">
                        {t("title")}
                    </h2>
                    <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-2.5 py-0.5 text-xs font-semibold text-pink-600 dark:text-pink-400">
                        {formattedMonthYear}
                    </span>
                </div>

                <TooltipCustom title={t("close")}>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            color: "var(--color-text-muted)",
                            "&:hover": {
                                color: "var(--color-text-contrast)",
                                bgcolor: "var(--color-hbgc-app)",
                            },
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </TooltipCustom>
            </div>
        </DialogTitle>
    );
};

export default DailyRewardCalendarHeader;
