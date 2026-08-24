import React from "react";
import { useTranslations } from "next-intl";
import { UserSubscriptionResponse } from "@/types/responses/subscription.response";
import UpdatePlanButton from "@/modules/protected/settings/billing/components/update.plan.button";
import Chip from "@mui/material/Chip";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Skeleton from "@mui/material/Skeleton";

interface CurrentPlanProps {
    subscription: UserSubscriptionResponse | null;
    loading: boolean;
    onOpenModal: () => void;
}

const CurrentPlan: React.FC<CurrentPlanProps> = ({
    subscription,
    loading,
    onOpenModal,
}) => {
    const t = useTranslations("settings.billing");

    if (loading) {
        return (
            <div className="border-bdc-primary bg-bgc-card rounded-2xl border p-6 shadow-sm">
                <Skeleton variant="text" width={200} height={32} />
                <Skeleton
                    variant="text"
                    width={300}
                    height={20}
                    className="mt-2"
                />
                <Skeleton
                    variant="rectangular"
                    height={100}
                    className="mt-4 rounded-xl"
                />
            </div>
        );
    }

    const plan = subscription?.subscriptionPlan || subscription?.plan;
    const tier = plan?.tier || "FREE";
    const planName =
        tier === "FREE"
            ? t("freePlan")
            : tier === "BASIC"
              ? t("basicPlan")
              : tier === "PREMIUM"
                ? t("premiumPlan")
                : tier;

    const isFree = tier === "FREE";

    const tierBadgeColor =
        tier === "PREMIUM"
            ? "bg-amber-500 text-white"
            : tier === "BASIC"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

    return (
        <div className="border-bdc-primary bg-bgc-card rounded-2xl border p-6 shadow-sm">
            {/* Header section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-xl">
                        <WorkspacePremiumIcon fontSize="large" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-text-primary text-xl font-bold">
                                {planName}
                            </h2>
                            <Chip
                                label={tier}
                                size="small"
                                className={`font-bold ${tierBadgeColor}`}
                            />
                            <Chip
                                icon={
                                    <CheckCircleIcon style={{ fontSize: 14 }} />
                                }
                                label={t("active")}
                                size="small"
                                color="success"
                                variant="outlined"
                                className="font-medium"
                            />
                        </div>
                        <p className="text-text-muted mt-1 text-xs">
                            {isFree ? t("permanent") : t("active")}
                        </p>
                    </div>
                </div>

                <div className="shrink-0">
                    {tier !== "PREMIUM" ? (
                        <UpdatePlanButton onOpenModal={onOpenModal} />
                    ) : (
                        <Chip
                            label={t("highestPlanBadge")}
                            color="warning"
                            variant="filled"
                            className="font-bold text-white shadow"
                        />
                    )}
                </div>
            </div>

            {/* Quota details if available */}
            {plan && (
                <div className="bg-bgc-subtle mt-6 grid grid-cols-1 gap-4 rounded-xl p-4 sm:grid-cols-3">
                    <div className="flex flex-col">
                        <span className="text-text-muted text-xs">
                            {t("quota.speakingEvaluationTitle")}
                        </span>
                        <span className="text-text-primary mt-1 text-base font-bold">
                            {t("quota.perDay", {
                                count:
                                    plan.dailySpeakingQuestionEvaluationLimit ??
                                    0,
                            })}
                        </span>
                        <span className="text-text-muted mt-0.5 text-xs">
                            {t("quota.maxRecordingPerTurn", {
                                seconds:
                                    plan.maxSpeakingQuestionRecordingSeconds ??
                                    60,
                            })}
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-text-muted text-xs">
                            {t("quota.aiConversationTitle")}
                        </span>
                        <span className="text-text-primary mt-1 text-base font-bold">
                            {t("quota.sessionsPerDay", {
                                count:
                                    plan.dailyAiSessionStartLimit ?? 0,
                            })}
                        </span>
                        <span className="text-text-muted mt-0.5 text-xs">
                            {t("quota.maxTurnsAndSeconds", {
                                turns: plan.maxTurnsPerAiSession ?? 10,
                                seconds: plan.maxAiTurnSpeakingSeconds ?? 20,
                            })}
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-text-muted text-xs">
                            {t("quota.sampleAnswerTitle")}
                        </span>
                        <span className="text-text-primary mt-1 text-base font-bold">
                            {plan.sampleAnswerEnabled
                                ? t("quota.supported")
                                : t("quota.notSupported")}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentPlan;
