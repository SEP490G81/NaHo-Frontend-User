import React from "react";
import { DailyMissionResponse } from "@/types/responses/daily.mission.response";
import { getMissionConfig } from "@/layouts/protected-header/constants/daily.mission.constant";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface DailyMissionItemProps {
    mission: DailyMissionResponse;
    isCompleted: boolean;
    onActionClick: () => void;
}

const DailyMissionItem: React.FC<DailyMissionItemProps> = ({
    mission,
    isCompleted,
    onActionClick,
}) => {
    const t = useTranslations("dailyMission");
    const router = useRouter();
    const config = getMissionConfig(mission.missionType);
    const IconComponent = config.icon;

    const titleKey = `types.${config.i18nKey}.title` as Parameters<typeof t>[0];
    const descKey = `types.${config.i18nKey}.desc` as Parameters<typeof t>[0];

    const title = t.has(titleKey) ? t(titleKey) : t("types.default.title");

    const description = t.has(descKey) ? t(descKey) : t("types.default.desc");

    const handleNavigate = () => {
        onActionClick();
        router.push(config.actionUrl);
    };

    return (
        <div
            className={`group relative flex flex-col justify-between gap-3 rounded-2xl border p-4 transition-all duration-300 sm:flex-row sm:items-center ${
                isCompleted
                    ? "border-emerald-500/30 bg-emerald-500/5 shadow-2xs dark:border-emerald-500/20"
                    : "border-bdc-primary bg-bgc-app hover:bg-bgc-page/50 hover:border-amber-500/40 hover:shadow-md"
            }`}
        >
            <div className="flex items-start gap-3.5 sm:items-center">
                <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br shadow-2xs ${config.bgGradient} ${config.borderColor} ${config.accentColor}`}
                >
                    <IconComponent className="h-5 w-5" />
                </div>

                <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                        <h4 className="text-text-contrast text-sm font-semibold tracking-tight">
                            {title}
                        </h4>
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                            {t("totalPoints", { points: mission.point }).trim()}
                        </span>
                    </div>
                    <p className="text-text-muted text-xs leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            <div className="flex shrink-0 items-center justify-end sm:pl-2">
                {isCompleted ? (
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 shadow-2xs dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>{t("status.completed")}</span>
                    </div>
                ) : (
                    <button
                        onClick={handleNavigate}
                        className="group/btn border-bdc-primary bg-bgc-app text-text-contrast inline-flex cursor-pointer items-center gap-1 rounded-xl border px-3.5 py-1.5 text-xs font-semibold shadow-2xs transition-all duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500"
                    >
                        <span>{t("actionBtn")}</span>
                        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default DailyMissionItem;
