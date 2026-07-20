"use client";
import React from "react";
import { Flame, Sparkles, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { getBookById, CURRENT_BOOK_ID } from "@/data/marugoto";
import { getUserLearningProgress } from "@/modules/protected/leaderboard/services/leaderboard.service";

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function StatCard({ icon, label, value }: StatCardProps) {
    return (
        <div className="border-bdc-primary bg-bgc-page flex items-center gap-3 rounded-xl border p-4">
            <div className="bg-bgc-highlight/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-text-muted text-[11px] tracking-wide uppercase">
                    {label}
                </p>
                <p className="text-text-contrast truncate text-sm font-semibold">
                    {value}
                </p>
            </div>
        </div>
    );
}

export function RoadmapHeader() {
    const t = useTranslations("marugoto.roadmap");
    // Tiến độ thật của người dùng (điểm · streak) — theo suốt hành trình học.
    const { data: progress } = useQuery({
        queryKey: ["user-learning-progress"],
        queryFn: getUserLearningProgress,
    });
    const totalPoint = Math.round(progress?.totalPoint ?? 0);
    const streakDays = progress?.currentStreak ?? 0;
    const level = getBookById(CURRENT_BOOK_ID)?.level ?? "A2";

    return (
        <div className="border-bdc-primary bg-bgc-app grid gap-6 rounded-2xl border p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0 space-y-2">
                <span className="border-bdc-primary bg-bgc-app text-text-muted inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide uppercase">
                    <span className="bg-bgc-highlight h-1.5 w-1.5 rounded-full" />
                    {t("badge")}
                </span>
                <h1 className="text-text-contrast text-3xl leading-tight font-bold md:text-4xl">
                    {t("title")}
                </h1>
                <p className="text-text-muted max-w-2xl text-sm md:text-base">
                    {t("subtitle")}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[560px]">
                <StatCard
                    icon={<Flame className="text-bgc-highlight h-5 w-5" />}
                    label={t("streak")}
                    value={t("streakValue", { days: streakDays })}
                />
                <StatCard
                    icon={<Trophy className="text-bgc-highlight h-5 w-5" />}
                    label={t("currentLevel")}
                    value={t("levelValue", { level })}
                />
                <StatCard
                    icon={<Sparkles className="text-bgc-highlight h-5 w-5" />}
                    label={t("totalPoints")}
                    value={t("pointsValue", { points: totalPoint })}
                />
            </div>
        </div>
    );
}

export default RoadmapHeader;
