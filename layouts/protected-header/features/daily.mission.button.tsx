"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { Target } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTodayUserDailyMissions } from "@/services/client/daily.mission.service";
import { UserDailyMissionResponse } from "@/types/responses/daily.mission.response";
import DailyMissionHeader from "../components/daily.mission.header";
import DailyMissionItem from "../components/daily.mission.item";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { calculateUserMissionProgress } from "../utils/daily.mission.util";

const DailyMissionButton = () => {
    const t = useTranslations("dailyMission");
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const { data: userMissions = [], refetch } = useQuery({
        queryKey: ["user-daily-missions"],
        queryFn: getTodayUserDailyMissions,
        staleTime: 60 * 1000,
    });

    const { claimableCount } = calculateUserMissionProgress(userMissions);

    const handleOpen = () => {
        setIsOpen(true);
        refetch();
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleEarnSuccess = (updatedMission: UserDailyMissionResponse) => {
        queryClient.setQueryData<UserDailyMissionResponse[]>(
            ["user-daily-missions"],
            (prev) =>
                prev
                    ? prev.map((m) =>
                          m.id === updatedMission.id ? updatedMission : m,
                      )
                    : [updatedMission],
        );
        queryClient.invalidateQueries({ queryKey: ["user-learning-progress"] });
    };

    useEffect(() => {
        const handleRefresh = () => {
            refetch();
        };

        window.addEventListener("refresh-daily-missions", handleRefresh);
        return () => {
            window.removeEventListener("refresh-daily-missions", handleRefresh);
        };
    }, [refetch]);

    return (
        <>
            <TooltipCustom title={t("triggerTooltip")} placement="bottom">
                <button
                    onClick={handleOpen}
                    className="group relative flex cursor-pointer items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-2xs transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500/20 dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-300"
                >
                    <div className="relative flex items-center justify-center">
                        <Target className="h-4 w-4 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
                        {claimableCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                            </span>
                        )}
                    </div>
                    <span className="hidden font-extrabold sm:inline">
                        {t("triggerBtn")}
                    </span>
                </button>
            </TooltipCustom>

            <Dialog
                open={isOpen}
                maxWidth="sm"
                fullWidth
                slotProps={{
                    backdrop: {
                        style: {
                            backgroundColor: "rgba(0, 0, 0, 0.45)",
                            backdropFilter: "blur(4px)",
                        },
                    },
                    paper: {
                        sx: {
                            borderRadius: "20px",
                            bgcolor: "var(--color-bgc-app)",
                            border: "1px solid var(--color-bdc-primary)",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            overflow: "hidden",
                            maxWidth: "580px",
                        },
                    },
                }}
            >
                <DailyMissionHeader handleClose={handleClose} />

                <DialogContent
                    sx={{ p: { xs: 2, sm: 3 }, mt: { xs: 2, sm: 3 } }}
                >
                    <div className="flex flex-col gap-3">
                        {userMissions.map((userMission) => (
                            <DailyMissionItem
                                key={userMission.id}
                                userMission={userMission}
                                onActionClick={handleClose}
                                onEarnSuccess={handleEarnSuccess}
                            />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DailyMissionButton;
