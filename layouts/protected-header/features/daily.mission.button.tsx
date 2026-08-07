"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { Target } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { getTodayUserDailyMissions } from "@/services/client/daily.mission.service";
import { UserDailyMissionResponse } from "@/types/responses/daily.mission.response";
import DailyMissionHeader from "../components/daily.mission.header";
import DailyMissionItem from "../components/daily.mission.item";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";

const DailyMissionButton = () => {
    const t = useTranslations("dailyMission");
    const [isOpen, setIsOpen] = useState(false);
    const [userMissions, setUserMissions] = useState<
        UserDailyMissionResponse[]
    >([]);

    const fetchDailyMissionsData = async () => {
        try {
            const missions = await getTodayUserDailyMissions();
            setUserMissions(missions);
        } catch (e) {
            console.error("Fetch Daily Missions Error:", e);
            if (e instanceof Error) {
                toast.error(e.message);
            }
        }
    };

    const handleOpen = async () => {
        setIsOpen(true);
        await fetchDailyMissionsData();
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleEarnSuccess = (updatedMission: UserDailyMissionResponse) => {
        setUserMissions((prev) =>
            prev.map((m) => (m.id === updatedMission.id ? updatedMission : m)),
        );
    };

    return (
        <>
            <TooltipCustom title={t("triggerTooltip")} placement="bottom">
                <button
                    onClick={handleOpen}
                    className="group relative flex cursor-pointer items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-2xs transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500/20 dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-300"
                >
                    <div className="relative flex items-center justify-center">
                        <Target className="h-4 w-4 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
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
