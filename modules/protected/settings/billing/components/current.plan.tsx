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
            <div className="rounded-2xl border border-bdc-primary bg-bgc-card p-6 shadow-sm">
                <Skeleton variant="text" width={200} height={32} />
                <Skeleton variant="text" width={300} height={20} className="mt-2" />
                <Skeleton variant="rectangular" height={100} className="mt-4 rounded-xl" />
            </div>
        );
    }

    const plan = subscription?.plan;
    const tier = plan?.tier || "FREE";
    const planName = plan?.name || (tier === "FREE" ? "Gói Miễn Phí" : tier);

    const isFree = tier === "FREE";

    const formattedExpiryDate = subscription?.endTime
        ? new Date(subscription.endTime).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
          })
        : null;

    const tierBadgeColor =
        tier === "PREMIUM"
            ? "bg-amber-500 text-white"
            : tier === "BASIC"
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

    return (
        <div className="rounded-2xl border border-bdc-primary bg-bgc-card p-6 shadow-sm">
            {/* Header section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <WorkspacePremiumIcon fontSize="large" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-text-primary">{planName}</h2>
                            <Chip
                                label={tier}
                                size="small"
                                className={`font-bold ${tierBadgeColor}`}
                            />
                            <Chip
                                icon={<CheckCircleIcon style={{ fontSize: 14 }} />}
                                label={t("active")}
                                size="small"
                                color="success"
                                variant="outlined"
                                className="font-medium"
                            />
                        </div>
                        <p className="mt-1 text-xs text-text-muted">
                            {isFree || !formattedExpiryDate
                                ? t("permanent")
                                : t("planExpiry", { date: formattedExpiryDate })}
                        </p>
                    </div>
                </div>

                <div className="shrink-0">
                    {tier !== "PREMIUM" ? (
                        <UpdatePlanButton onOpenModal={onOpenModal} />
                    ) : (
                        <Chip
                            label="Gói cao nhất 👑"
                            color="warning"
                            variant="filled"
                            className="font-bold text-white shadow"
                        />
                    )}
                </div>
            </div>

            {/* Quota details if available */}
            {plan && (
                <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-bgc-subtle p-4 sm:grid-cols-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-text-muted">
                            {t("features.assessmentLimit", { count: "" }).replace("/ tháng", "").trim()}
                        </span>
                        <span className="mt-1 text-base font-bold text-text-primary">
                            {plan.monthlyAssessmentLimit} bài / tháng
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs text-text-muted">
                            Luyện hội thoại
                        </span>
                        <span className="mt-1 text-base font-bold text-text-primary">
                            {Math.round(plan.monthlyConversationSeconds / 60)} phút / tháng
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs text-text-muted">
                            Giáo trình
                        </span>
                        <span className="mt-1 text-base font-bold text-text-primary">
                            {plan.fullCurriculumAccess ? "Toàn bộ bài học" : "Cơ bản"}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CurrentPlan;
