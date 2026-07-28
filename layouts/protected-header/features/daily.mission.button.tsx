"use client";

import React, { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { Target, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { getTodayUserDailyMissions } from "@/services/client/daily.mission.service";
import { UserDailyMissionResponse } from "@/types/responses/daily.mission.response";
import DailyMissionHeader from "../components/daily.mission.header";
import DailyMissionItem from "../components/daily.mission.item";
import DailyMissionLoading from "../components/daily.mission.loading";
import { calculateUserMissionProgress } from "../utils/daily.mission.util";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";

const DailyMissionButton = () => {
    const t = useTranslations("dailyMission");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userMissions, setUserMissions] = useState<
        UserDailyMissionResponse[]
    >([]);

    const fetchDailyMissionsData = async () => {
        setLoading(true);
        try {
            const missions = await getTodayUserDailyMissions();
            setUserMissions(missions);
        } catch (e) {
            console.error("Fetch Daily Missions Error:", e);
            if (e instanceof Error) {
                toast.error(e.message);
            }
        } finally {
            setLoading(false);
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

    const {
        completedCount,
        claimableCount,
        inProgressCount,
        totalCount,
        progressPercentage,
        totalPointsEarned,
    } = useMemo(
        () => calculateUserMissionProgress(userMissions),
        [userMissions],
    );

    const pendingCount = claimableCount + inProgressCount;

    return (
        <>
            <TooltipCustom title={t("triggerTooltip")} placement="bottom">
                <button
                    onClick={handleOpen}
                    className="text-text-contrast bg-bgc-app border-bdc-primary group relative flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all duration-300 hover:border-amber-400 hover:bg-amber-500/5"
                >
                    <div className="relative flex items-center justify-center">
                        <Target className="h-4 w-4 text-amber-500 transition-transform duration-300 group-hover:scale-110" />
                        {pendingCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                            </span>
                        )}
                    </div>
                    <span className="hidden font-bold sm:inline">
                        {t("triggerBtn")}
                    </span>
                    {totalCount > 0 && (
                        <span className="rounded-full bg-amber-500/10 px-1.5 py-0.2 text-[10px] font-extrabold text-amber-600 dark:text-amber-400">
                            {completedCount}/{totalCount}
                        </span>
                    )}
                </button>
            </TooltipCustom>

            <Dialog
                open={isOpen}
                onClose={handleClose}
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
                <DailyMissionHeader
                    handleClose={handleClose}
                    completedCount={completedCount}
                    totalCount={totalCount}
                    progressPercentage={progressPercentage}
                    totalPointsEarned={totalPointsEarned}
                />

                <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
                    {loading ? (
                        <DailyMissionLoading />
                    ) : userMissions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <p className="text-text-muted text-sm font-medium">
                                {t("empty")}
                            </p>
                        </div>
                    ) : (
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
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DailyMissionButton;