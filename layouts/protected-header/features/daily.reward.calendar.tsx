"use client";

import React, { useMemo, useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { Gift } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
    earnDailyReward,
    getCurrentMonthDailyRewards,
    getUserDailyAttendancesCurrentMonth
} from "@/services/client/daily.reward.service";
import { DailyRewardResponse, UserDailyAttendanceResponse } from "@/types/responses/daily.reward.response";
import DailyRewardItem from "./daily.reward.item";
import DailyRewardCalendarHeader from "@/layouts/protected-header/components/daily.reward.calendar.header";
import DailyRewardCalendarLoading from "@/layouts/protected-header/components/daily.reward.calendar.loading";
import { DAYS_OF_WEEK } from "@/layouts/protected-header/constants/daily.reward.constant";
import { getDayOfWeekHeaderClass } from "@/layouts/protected-header/utils/daily.reward.util";

const DailyRewardCalendar = () => {
    const t = useTranslations("dailyReward");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [claimingId, setClaimingId] = useState<number | null>(null);
    const [rewardsData, setRewardsData] = useState<DailyRewardResponse[]>([]);
    const [attendancesData, setAttendancesData] = useState<
        UserDailyAttendanceResponse[]
    >([]);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthIndex = now.getMonth(); // 0-indexed
    const currentDay = now.getDate();

    // Calculate calendar offset days (Monday as first day of week)
    // getDay(): 0 = Sun, 1 = Mon, ..., 6 = Sat
    const firstDayOfWeek = new Date(currentYear, currentMonthIndex, 1).getDay();
    // Convert to Mon=0, Tue=1, ..., Sun=6
    const paddingDaysCount = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const fetchRewards = async () => {
        setLoading(true);

        try {
            const [rewards, attendances] = await Promise.all([
                getCurrentMonthDailyRewards(),
                getUserDailyAttendancesCurrentMonth(),
            ]);

            setRewardsData(rewards);
            setAttendancesData(attendances);
        } catch (e) {
            console.error(e);
            if (e instanceof Error) {
                toast.error(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClaimReward = async (item: DailyRewardResponse) => {
        if (!item.id) return;

        try {
            setClaimingId(item.id);

            const data = await earnDailyReward(item.id);

            toast.success(
                t("claimSuccess", {
                    points: data.earnedPoint ?? 0,
                }),
            );

            await fetchRewards();
        } catch (e) {
            console.error(e);
            if (e instanceof Error) {
                toast.error(e.message);
            }
        } finally {
            setClaimingId(null);
        }
    };

    const handleOpen = async () => {
        setIsOpen(true);
        await fetchRewards();
    };

    const attendedRewardIdsSet = useMemo(
        () =>
            new Set(attendancesData.map(({ dailyRewardId }) => dailyRewardId)),
        [attendancesData],
    );

    return (
        <>
            <button
                onClick={handleOpen}
                className="text-text-contrast bg-bgc-app border-bdc-primary group relative flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all duration-300 hover:border-pink-400 hover:bg-pink-500/5"
            >
                <Gift className="h-4 w-4 text-pink-500 transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden font-bold sm:inline">
                    {t("triggerBtn")}
                </span>
            </button>

            <Dialog
                open={isOpen}
                maxWidth="md"
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
                            maxWidth: "760px",
                        },
                    },
                }}
            >
                <DailyRewardCalendarHeader
                    handleClose={() => setIsOpen(false)}
                />

                <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <div className="mt-3 mb-2.5 grid grid-cols-7 gap-1.5 text-center sm:gap-2">
                        {DAYS_OF_WEEK.map((dayName, idx) => (
                            <div
                                key={dayName}
                                className={getDayOfWeekHeaderClass(idx)}
                            >
                                {dayName}
                            </div>
                        ))}
                    </div>

                    {loading ? (
                        <DailyRewardCalendarLoading />
                    ) : (
                        <div className="grid grid-cols-7 gap-1.5 py-1 sm:gap-2">
                            {Array.from({ length: paddingDaysCount }).map(
                                (_, padIdx) => (
                                    <div
                                        key={`pad-${padIdx}`}
                                        className="bg-bgc-page/20 border-bdc-primary/30 pointer-events-none min-h-20.5 rounded-xl border border-dashed opacity-20 sm:min-h-22.5"
                                    />
                                ),
                            )}

                            {rewardsData.map((item) => {
                                const dayNum = item.dayOfMonth;
                                const isToday = dayNum === currentDay;
                                const isLocked = dayNum > currentDay;
                                const isPast = dayNum < currentDay;
                                const isAttended = attendedRewardIdsSet.has(
                                    item.id,
                                );

                                return (
                                    <DailyRewardItem
                                        key={item.id || dayNum}
                                        data={item}
                                        dayNumber={dayNum}
                                        isToday={isToday}
                                        isLocked={isLocked}
                                        isPast={isPast}
                                        isAttended={isAttended}
                                        onClick={() => handleClaimReward(item)}
                                        isClaiming={claimingId === item.id}
                                    />
                                );
                            })}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default DailyRewardCalendar;
