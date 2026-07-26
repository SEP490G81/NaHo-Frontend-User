import React from "react";
import { useTranslations } from "next-intl";
import {
    PLAN_TIER_LEVEL,
    PlanTier,
    SubscriptionPlanResponse,
} from "@/types/responses/subscription.response";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

interface PlanCardProps {
    plan: SubscriptionPlanResponse;
    currentTier: PlanTier;
    onCheckout: (planCode: string, isRetry?: boolean) => void;
    checkoutLoadingCode: string | null;
    isFailed?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
    plan,
    currentTier,
    onCheckout,
    checkoutLoadingCode,
    isFailed,
}) => {
    const t = useTranslations("settings.billing");

    const planLevel = PLAN_TIER_LEVEL[plan.tier] ?? 0;
    const currentLevel = PLAN_TIER_LEVEL[currentTier] ?? 0;

    const isCurrentPlan = plan.tier === currentTier;
    const isOwnedOrLower = planLevel <= currentLevel;
    const canUpgrade = planLevel > currentLevel;

    const isLoadingThisPlan = checkoutLoadingCode === plan.code;
    const isPopular = plan.tier === "PREMIUM";

    const formatCurrency = (amount: number) => {
        if (amount === 0) return t("freePrice");
        return new Intl.NumberFormat("vi-VN").format(amount) + " " + t("perMonth");
    };

    const conversationMinutes = Math.round(plan.monthlyConversationSeconds / 60);

    return (
        <div
            className={`relative flex flex-col justify-between rounded-2xl border bg-bgc-card p-6 shadow-sm transition-all hover:shadow-md ${isPopular
                ? "border-primary shadow-lg ring-2 ring-primary/20"
                : isCurrentPlan
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-bdc-primary"
                }`}
        >
            {isPopular && (
                <div className="absolute -top-0 left-1/2 -translate-x-1/2">
                    <Chip
                        icon={<StarOutlinedIcon style={{ fontSize: 14, color: "#fff" }} />}
                        label={t("popular")}
                        size="small"
                        className="bg-primary text-xs font-bold text-white shadow"
                    />
                </div>
            )}

            <div>
                {/* Header */}
                <div className="mb-4 text-center">
                    <h3 className="text-xl font-bold text-text-primary">{plan.name}</h3>
                    <p className="mt-1 min-h-[36px] text-xs text-text-muted">
                        {plan.description}
                    </p>
                    <div className="mt-3">
                        <span className="text-3xl font-extrabold text-primary">
                            {formatCurrency(plan.priceAmount)}
                        </span>
                    </div>
                </div>

                <div className="my-4 h-px bg-bdc-primary/50" />

                {/* Features List */}
                <ul className="space-y-3 text-sm text-text-primary">
                    <li className="flex items-start gap-2.5">
                        <CheckCircleOutlinedIcon
                            fontSize="small"
                            className="mt-0.5 text-primary"
                        />
                        <span>
                            {t("features.assessmentLimit", {
                                count: plan.monthlyAssessmentLimit,
                            })}
                        </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <CheckCircleOutlinedIcon
                            fontSize="small"
                            className="mt-0.5 text-primary"
                        />
                        <span>
                            {t("features.conversationMinutes", {
                                minutes: conversationMinutes,
                            })}
                        </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <CheckCircleOutlinedIcon
                            fontSize="small"
                            className={
                                plan.fullCurriculumAccess
                                    ? "mt-0.5 text-primary"
                                    : "mt-0.5 text-text-muted opacity-40"
                            }
                        />
                        <span
                            className={
                                plan.fullCurriculumAccess ? "" : "line-through opacity-50"
                            }
                        >
                            {t("features.fullCurriculum")}
                        </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <CheckCircleOutlinedIcon
                            fontSize="small"
                            className={
                                plan.progressAnalyticsEnabled
                                    ? "mt-0.5 text-primary"
                                    : "mt-0.5 text-text-muted opacity-40"
                            }
                        />
                        <span
                            className={
                                plan.progressAnalyticsEnabled
                                    ? ""
                                    : "line-through opacity-50"
                            }
                        >
                            {t("features.analytics")}
                        </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <CheckCircleOutlinedIcon
                            fontSize="small"
                            className={
                                plan.sampleAnswerEnabled
                                    ? "mt-0.5 text-primary"
                                    : "mt-0.5 text-text-muted opacity-40"
                            }
                        />
                        <span
                            className={
                                plan.sampleAnswerEnabled
                                    ? ""
                                    : "line-through opacity-50"
                            }
                        >
                            {t("features.sampleAnswer")}
                        </span>
                    </li>
                </ul>
            </div>

            {/* Action Button */}
            <div className="mt-6">
                {isCurrentPlan ? (
                    <Button
                        variant="outlined"
                        fullWidth
                        disabled
                        className="border-emerald-500 text-emerald-600 font-semibold"
                    >
                        {t("currentPlanLabel")}
                    </Button>
                ) : isOwnedOrLower ? (
                    <Button
                        variant="outlined"
                        fullWidth
                        disabled
                        className="border-gray-300 text-text-muted"
                    >
                        {t("includedLabel")}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        fullWidth
                        disabled={checkoutLoadingCode !== null}
                        onClick={() => onCheckout(plan.code, isFailed)}
                        className="bg-primary hover:bg-primary/90 py-2.5 font-bold text-white shadow-md transition-transform active:scale-95"
                    >
                        {isLoadingThisPlan ? (
                            <div className="flex items-center gap-2">
                                <CircularProgress size={18} color="inherit" />
                                <span>{t("processing")}</span>
                            </div>
                        ) : isFailed ? (
                            t("retry")
                        ) : (
                            t("buyNow")
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PlanCard;
