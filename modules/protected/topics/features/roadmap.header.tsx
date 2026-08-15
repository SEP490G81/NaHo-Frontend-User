"use client";
import React from "react";
import { ChevronRight, Compass, Sparkles, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn, formatPoints } from "@/libs/utils";
import { useCurrentLevelLabel } from "@/hooks/use.current.level";
import { useUserLearningProgress } from "@/components/providers/user.learning.progress.provider";
import ContainerBox from "@/components/ui/container.box";
import { useTourStore } from "@/store/tourStore";
import { MARUGOTO_TOUR_ID } from "@/modules/protected/user-guide/constants/marugoto.tour.constant";

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    /** Ghi đè class background cho icon box */
    iconBgClassName?: string;
    /** Có href → thẻ thành link (vd Tổng điểm → lịch sử nhận điểm). */
    href?: "/point-history";
}

function StatCard({
    icon,
    label,
    value,
    iconBgClassName,
    href,
}: StatCardProps) {
    const inner = (
        <>
            <div
                className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    iconBgClassName || "bg-bgc-highlight/15",
                )}
            >
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-text-muted text-[10px] leading-tight font-semibold tracking-tight uppercase">
                    {label}
                </p>
                <p className="text-text-contrast mt-0.5 truncate text-base leading-tight font-black">
                    {value}
                </p>
            </div>
            {href && (
                <ChevronRight className="text-text-muted h-4 w-4 shrink-0" />
            )}
        </>
    );
    const className = cn(
        "border-bdc-primary bg-bgc-page flex items-center gap-3 rounded-xl border px-4 py-3.5",
        href && "hover:border-bgc-highlight/60 hover:shadow-sm transition-all",
    );
    return href ? (
        <Link href={href} className={className}>
            {inner}
        </Link>
    ) : (
        <div className={className}>{inner}</div>
    );
}

export function RoadmapHeader() {
    const t = useTranslations("marugoto.roadmap");
    const tGuide = useTranslations("userGuide.tour");
    // Tiến độ thật của người dùng (điểm · streak) — lấy từ context.
    const { progress } = useUserLearningProgress();
    const totalPoint = formatPoints(progress?.totalPoint ?? 0);
    // Trình độ = quyển đang học theo mốc tiến độ; user mới luôn là quyển đầu (N5 · A1).
    const level = useCurrentLevelLabel();
    const startTour = useTourStore((s) => s.startTour);

    return (
        <ContainerBox>
            <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="border-bdc-primary bg-bgc-app text-text-muted inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide uppercase">
                        <span className="bg-bgc-highlight h-1.5 w-1.5 rounded-full" />
                        {t("badge")}
                    </span>
                    <button
                        type="button"
                        onClick={() => startTour(MARUGOTO_TOUR_ID)}
                        className="border-bdc-primary text-text-muted hover:border-bgc-highlight/60 hover:text-bgc-highlight inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-colors"
                    >
                        <Compass className="h-3.5 w-3.5" />
                        {tGuide("restart")}
                    </button>
                </div>
                <h1 className="text-text-contrast text-3xl leading-tight font-bold md:text-4xl">
                    {t("title")}
                </h1>
                <p className="text-text-muted max-w-2xl text-sm md:text-base">
                    {t("subtitle")}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <StatCard
                    icon={<Trophy className="text-bgc-highlight h-5 w-5" />}
                    label={t("currentLevel")}
                    value={t("levelValue", { level: level || "—" })}
                />
                <StatCard
                    icon={<Sparkles className="text-bgc-highlight h-5 w-5" />}
                    label={t("totalPoints")}
                    value={t("pointsValue", { points: totalPoint })}
                    href="/point-history"
                />
            </div>
        </ContainerBox>
    );
}

export default RoadmapHeader;
