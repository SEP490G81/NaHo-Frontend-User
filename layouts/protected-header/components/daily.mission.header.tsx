import React from "react";
import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslations } from "next-intl";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { Target } from "lucide-react";

const DailyMissionHeader = ({ handleClose }: { handleClose: () => void }) => {
    const t = useTranslations("dailyMission");

    return (
        <DialogTitle sx={{ p: 0, position: "relative" }} className="bg-bgc-app">
            <div className="border-b-bdc-primary flex flex-col border-b px-5 pt-4 pb-4 sm:px-6 sm:pt-5 sm:pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 shadow-2xs dark:bg-amber-500/20 dark:text-amber-400">
                            <Target className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-text-contrast text-base font-bold tracking-tight sm:text-lg">
                                {t("title")}
                            </h2>
                            <p className="text-text-muted text-xs font-normal">
                                {t("subtitle")}
                            </p>
                        </div>
                    </div>

                    <TooltipCustom
                        title={t("close")}
                        color="--color-hbgc-error"
                        textColor="#ffffff"
                    >
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
            </div>
        </DialogTitle>
    );
};

export default DailyMissionHeader;
