"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import Button from "@mui/material/Button";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import CompassCalibrationIcon from "@mui/icons-material/CompassCalibration";
import LinearProgress from "@mui/material/LinearProgress";

import { ContainerBox } from "@/components/ui/container.box";

interface WelcomeBannerProps {
    name: string;
    t: any;
}

export function WelcomeBanner({ name, t }: WelcomeBannerProps) {
    const hour = new Date().getHours();
    const greetingKey =
        hour < 12
            ? "greetingMorning"
            : hour < 18
              ? "greetingAfternoon"
              : "greetingEvening";

    // Daily goal stats (e.g. 15/20 minutes = 75%)
    const goalMinutes = 20;
    const currentMinutes = 15;
    const goalPercentage = Math.min(
        100,
        Math.round((currentMinutes / goalMinutes) * 100),
    );

    return (
        <ContainerBox className="border-bdc-primary from-bgc-card via-bgc-card relative overflow-hidden border bg-gradient-to-br to-[#ff99ac]/10">
            {/* Sakura ambient glow circles */}
            <div className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-[#ff99ac]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-[#ff758f]/10 blur-2xl" />

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Greeting & Subtitle */}
                <div className="max-w-xl space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff99ac]/30 bg-[#ff99ac]/20 px-3 py-1 text-xs font-bold text-[#ff758f]">
                            <CompassCalibrationIcon style={{ fontSize: 14 }} />
                            <span>{t(greetingKey)}</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                            <LocalFireDepartmentIcon
                                fontSize="small"
                                className="animate-pulse text-amber-500"
                            />
                            <span>{t("streakCount", { days: 5 })}</span>
                        </span>
                    </div>

                    <h1 className="text-text-primary text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                        {t("welcome", { name })} 👋
                    </h1>

                    <p className="text-text-muted text-sm leading-relaxed font-medium">
                        {t("slogan")}
                    </p>

                    {/* Daily Goal Mini Progress */}
                    <div className="max-w-md pt-2">
                        <div className="text-text-primary mb-1.5 flex items-center justify-between text-xs font-bold">
                            <span className="text-text-muted flex items-center gap-1">
                                🎯 Mục tiêu hàng ngày
                            </span>
                            <span className="text-[#ff758f]">
                                {currentMinutes}/{goalMinutes} phút (
                                {goalPercentage}%)
                            </span>
                        </div>
                        <LinearProgress
                            variant="determinate"
                            value={goalPercentage}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "var(--color-bdc-primary)",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: "#ff758f",
                                    borderRadius: 4,
                                },
                            }}
                        />
                    </div>
                </div>

                {/* Quick Action CTA Card */}
                <div className="bg-bgc-card/80 flex flex-col gap-3 rounded-2xl border border-[#ff99ac]/30 p-5 shadow-sm backdrop-blur-md sm:min-w-[280px]">
                    <div className="text-xs font-extrabold tracking-wider text-[#ff758f] uppercase">
                        ⚡ Bài học tiếp theo
                    </div>
                    <div>
                        <h4 className="text-text-primary text-sm font-bold">
                            Chủ đề: Phỏng vấn & Giao tiếp công sở
                        </h4>
                        <p className="text-text-muted mt-0.5 text-xs">
                            Bài 3 • Kaiwa phản xạ với AI Persona
                        </p>
                    </div>

                    <Button
                        component={Link}
                        href="/topics"
                        variant="contained"
                        size="large"
                        startIcon={<PlayArrowIcon />}
                        className="mt-1 rounded-xl bg-[#ff758f] py-3 text-sm font-black text-white shadow-md transition-transform hover:bg-[#ff99ac] active:scale-95"
                    >
                        Tiếp tục luyện tập ngay
                    </Button>
                </div>
            </div>
        </ContainerBox>
    );
}

export default WelcomeBanner;
