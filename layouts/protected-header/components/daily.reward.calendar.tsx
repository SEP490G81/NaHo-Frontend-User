"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Skeleton, Tooltip } from "@mui/material";
import { Gift, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { getCurrentMonthDailyRewards } from "@/services/client/daily.reward.service";
import { DailyRewardResponse } from "@/types/responses/daily.reward.response";
import DailyRewardItem from "./daily.reward.item";

const DAYS_OF_WEEK = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const DailyRewardCalendar: React.FC = () => {
    const t = useTranslations("dailyReward");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [rewardsData, setRewardsData] = useState<DailyRewardResponse[]>([]);
    const [error, setError] = useState<string | null>(null);

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonthIndex = now.getMonth(); // 0-indexed
    const currentDay = now.getDate();

    const formattedMonthYear = t("monthFormat", {
        month: String(currentMonthIndex + 1).padStart(2, "0"),
        year: currentYear,
    });

    // Calculate calendar offset days (Monday as first day of week)
    // getDay(): 0 = Sun, 1 = Mon, ..., 6 = Sat
    const firstDayOfWeek = new Date(currentYear, currentMonthIndex, 1).getDay();
    // Convert to Mon=0, Tue=1, ..., Sun=6
    const paddingDaysCount = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const fetchRewards = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getCurrentMonthDailyRewards();
            if (data && Array.isArray(data)) {
                setRewardsData(data);
            } else {
                setRewardsData([]);
            }
        } catch (err: any) {
            console.error(" Daily reward API failed:", err);
            setError(err?.message || t("fetchError"));
            setRewardsData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchRewards();
        }
    }, [isOpen]);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            {/* Header Trigger Button */}
            <Tooltip
                title={t("triggerTooltip")}
                arrow
                placement="bottom"
            >
                <button
                    onClick={handleOpen}
                    className="text-text-contrast bg-bgc-app border-bdc-primary group relative flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all duration-300 hover:border-pink-400 hover:bg-pink-500/5"
                >
                    <div className="relative">
                        <Gift className="h-4 w-4 text-pink-500 transition-transform duration-300 group-hover:scale-110" />
                        <span className="absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full bg-pink-500" />
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-pink-500" />
                    </div>
                    <span className="hidden font-bold sm:inline">
                        {t("triggerBtn")}
                    </span>
                </button>
            </Tooltip>

            {/* Popup Dialog */}
            <Dialog
                open={isOpen}
                onClose={handleClose}
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
                {/* Modal Header Banner */}
                <DialogTitle
                    sx={{ p: 0, position: "relative" }}
                    className="border-bdc-primary border-b bg-linear-to-r from-pink-500/15 via-rose-500/10 to-amber-500/15"
                >
                    <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
                        <div className="flex items-center gap-3">
                            <h2 className="text-text-contrast text-base font-bold tracking-tight sm:text-lg">
                                {t("title")}
                            </h2>
                            <span className="border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400 rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                                {formattedMonthYear}
                            </span>
                        </div>

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
                            <X className="h-5 w-5" />
                        </IconButton>
                    </div>
                </DialogTitle>

                {/* Calendar Body Content */}
                <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
                    {/* Days of Week Header with clear top spacing */}
                    <div className="mt-3 mb-2.5 grid grid-cols-7 gap-1.5 text-center sm:gap-2">
                        {DAYS_OF_WEEK.map((dayName, idx) => (
                            <div
                                key={dayName}
                                className={`rounded-lg py-1.5 text-xs font-bold ${
                                    idx >= 5
                                        ? "bg-rose-50 text-rose-500 dark:bg-rose-950/20"
                                        : "text-text-muted bg-bgc-page/40"
                                }`}
                            >
                                {dayName}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid Days */}
                    {loading ? (
                        <div className="grid grid-cols-7 gap-1.5 py-2 sm:gap-2">
                            {Array.from({ length: 31 }).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    variant="rounded"
                                    height={84}
                                    sx={{
                                        borderRadius: "12px",
                                        bgcolor: "var(--color-hbgc-app)",
                                    }}
                                />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="space-y-3 py-8 text-center">
                            <p className="text-text-error text-sm">{error}</p>
                            <button
                                onClick={fetchRewards}
                                className="rounded-xl bg-pink-500 px-4 py-2 text-xs font-bold text-white transition hover:bg-pink-600 cursor-pointer"
                            >
                                {t("retry")}
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-7 gap-1.5 py-1 sm:gap-2">
                            {/* Render Padding Cells for Month Start Alignment */}
                            {Array.from({ length: paddingDaysCount }).map(
                                (_, padIdx) => (
                                    <div
                                        key={`pad-${padIdx}`}
                                        className="bg-bgc-page/20 border-bdc-primary/30 pointer-events-none min-h-[82px] sm:min-h-[90px] rounded-xl border border-dashed opacity-20"
                                    />
                                ),
                            )}

                            {/* Render Days */}
                            {rewardsData.map((item) => {
                                const dayNum = item.dayOfMonth;
                                const isToday = dayNum === currentDay;
                                const isLocked = dayNum > currentDay;
                                const isPast = dayNum < currentDay;

                                return (
                                    <DailyRewardItem
                                        key={item.id || dayNum}
                                        data={item}
                                        dayNumber={dayNum}
                                        isToday={isToday}
                                        isLocked={isLocked}
                                        isPast={isPast}
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


