"use client";

import React from "react";
import { useTranslations } from "next-intl";
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
    const goalPercentage = Math.min(100, Math.round((currentMinutes / goalMinutes) * 100));

    return (
        <ContainerBox className="relative overflow-hidden border border-bdc-primary bg-gradient-to-br from-bgc-card via-bgc-card to-[#ff99ac]/10">
            {/* Sakura ambient glow circles */}
            <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#ff99ac]/15 blur-3xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 h-48 w-48 rounded-full bg-[#ff758f]/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Greeting & Subtitle */}
                <div className="space-y-3 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff99ac]/20 px-3 py-1 text-xs font-bold text-[#ff758f] border border-[#ff99ac]/30">
                            <CompassCalibrationIcon style={{ fontSize: 14 }} />
                            <span>{t(greetingKey)}</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <LocalFireDepartmentIcon fontSize="small" className="text-amber-500 animate-pulse" />
                            <span>{t("streakCount", { days: 5 })}</span>
                        </span>
                    </div>

                    <h1 className="text-2xl font-black text-text-primary sm:text-3xl lg:text-4xl tracking-tight">
                        {t("welcome", { name })} 👋
                    </h1>

                    <p className="text-sm font-medium text-text-muted leading-relaxed">
                        {t("slogan")}
                    </p>

                    {/* Daily Goal Mini Progress */}
                    <div className="pt-2 max-w-md">
                        <div className="flex items-center justify-between text-xs font-bold text-text-primary mb-1.5">
                            <span className="flex items-center gap-1 text-text-muted">
                                🎯 Mục tiêu hàng ngày
                            </span>
                            <span className="text-[#ff758f]">
                                {currentMinutes}/{goalMinutes} phút ({goalPercentage}%)
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
                <div className="flex flex-col gap-3 rounded-2xl border border-[#ff99ac]/30 bg-bgc-card/80 p-5 backdrop-blur-md shadow-sm sm:min-w-[280px]">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-[#ff758f]">
                        ⚡ Bài học tiếp theo
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-text-primary">
                            Chủ đề: Phỏng vấn & Giao tiếp công sở
                        </h4>
                        <p className="text-xs text-text-muted mt-0.5">
                            Bài 3 • Kaiwa phản xạ với AI Persona
                        </p>
                    </div>

                    <Button
                        component={Link}
                        href="/topics"
                        variant="contained"
                        size="large"
                        startIcon={<PlayArrowIcon />}
                        className="bg-[#ff758f] hover:bg-[#ff99ac] font-black text-white shadow-md transition-transform active:scale-95 py-3 rounded-xl text-sm mt-1"
                    >
                        Tiếp tục luyện tập ngay
                    </Button>
                </div>
            </div>
        </ContainerBox>
    );
}

export default WelcomeBanner;
