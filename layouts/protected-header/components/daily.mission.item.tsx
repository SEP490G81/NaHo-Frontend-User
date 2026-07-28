import React from "react";
import { UserDailyMissionResponse } from "@/types/responses/daily.mission.response";
import { getMissionConfig } from "@/layouts/protected-header/constants/daily.mission.constant";
import { CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import DailyMissionClaimButton from "../features/daily.mission.claim.button";

interface DailyMissionItemProps {
    userMission: UserDailyMissionResponse;
    onActionClick: () => void;
    onEarnSuccess: (updatedMission: UserDailyMissionResponse) => void;
}

const DailyMissionItem: React.FC<DailyMissionItemProps> = ({
    userMission,
    onActionClick,
    onEarnSuccess,
}) => {
    const t = useTranslations("dailyMission");
    const mission = userMission.dailyMission;
    const config = getMissionConfig(mission?.missionType || "");
    const IconComponent = config.icon;

    const titleKey = `types.${config.i18nKey}.title` as Parameters<typeof t>[0];
    const descKey = `types.${config.i18nKey}.desc` as Parameters<typeof t>[0];

    const title =
        mission?.title ||
        (t.has(titleKey) ? t(titleKey) : t("types.default.title"));

    const description =
        mission?.description ||
        (t.has(descKey) ? t(descKey) : t("types.default.desc"));

    const status = userMission.status;

    return (
        <div
            className={`group relative flex flex-col justify-between gap-3 rounded-2xl border p-4 transition-all duration-300 sm:flex-row sm:items-center ${
                status === "EARNED"
                    ? "border-emerald-500/20 bg-emerald-500/5 shadow-2xs dark:border-emerald-500/15"
                    : status === "COMPLETED"
                    ? "border-amber-500/40 bg-amber-500/5 shadow-sm dark:border-amber-500/30"
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
                            {t("totalPoints", { points: mission?.point || 0 }).trim()}
                        </span>
                    </div>
                    <p className="text-text-muted text-xs leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2 sm:pl-2">
                {status === "EARNED" ? (
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-600 shadow-2xs dark:text-emerald-400">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>{t("status.earned")}</span>
                    </div>
                ) : status === "COMPLETED" ? (
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            <Sparkles className="h-3 w-3 text-emerald-500" />
                            <span>{t("status.completed")}</span>
                        </div>
                        <DailyMissionClaimButton
                            userMissionId={userMission.id}
                            onEarnSuccess={onEarnSuccess}
                        />
                    </div>
                ) : (
                    <Link
                        href={config.actionUrl}
                        onClick={onActionClick}
                        className="group/btn border-bdc-primary bg-bgc-app text-text-contrast inline-flex cursor-pointer items-center gap-1 rounded-xl border px-3.5 py-1.5 text-xs font-semibold shadow-2xs transition-all duration-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500"
                    >
                        <span>{t("actionBtn")}</span>
                        <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default DailyMissionItem;
