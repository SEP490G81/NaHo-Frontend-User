import React from "react";
import { useTranslations } from "next-intl";
import {
    PlanTier,
    SubscriptionPlanResponse,
} from "@/types/responses/subscription.response";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StarIcon from "@mui/icons-material/Star";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

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

    const tierCode = plan.tier || plan.code || "FREE";
    const planLevel = PlanTier[tierCode]?.level ?? 0;
    const currentLevel = PlanTier[currentTier]?.level ?? 0;

    const isCurrentPlan = tierCode === currentTier;
    const isOwnedOrLower = planLevel <= currentLevel;

    const isLoadingThisPlan = checkoutLoadingCode === plan.code;

    const formatPrice = (amount: number) => {
        if (amount === 0) return "0 đ";
        return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
    };

    const formatDurationText = (seconds: number) => {
        if (seconds >= 99999) return t("card.unlimited");
        const mins = Math.round(seconds / 60);
        if (mins >= 60) {
            const hrs = (mins / 60).toFixed(1).replace(".0", "");
            return t("card.hours", { count: hrs });
        }
        return t("card.minutes", { count: mins });
    };

    const formatLimitCount = (count: number) => {
        if (count >= 9999) return t("card.unlimited");
        return t("card.timesCount", { count });
    };

    // Tier specific styling configuration
    const isFree = tierCode === "FREE";
    const isBasic = tierCode === "BASIC";
    const isPremium = tierCode === "PREMIUM";

    const cardContainerStyles = isPremium
        ? "relative flex flex-col justify-between rounded-3xl border-2 border-amber-400 dark:border-amber-500/80 bg-gradient-to-b from-amber-500/10 via-rose-500/5 to-bgc-card p-6 shadow-xl shadow-amber-500/15 hover:shadow-2xl hover:shadow-amber-500/25 hover:-translate-y-1 transition-all duration-300 ring-1 ring-amber-400/30 overflow-hidden"
        : isBasic
          ? "relative flex flex-col justify-between rounded-3xl border-2 border-indigo-500/60 dark:border-indigo-400/60 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-bgc-card p-6 shadow-lg shadow-indigo-500/10 hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-300"
          : "relative flex flex-col justify-between rounded-3xl border border-bdc-primary bg-gradient-to-b from-slate-100/50 via-bgc-card to-bgc-card dark:from-slate-800/30 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300";

    const featureIconColor = isPremium
        ? "text-rose-500 dark:text-rose-400"
        : isBasic
          ? "text-indigo-600 dark:text-indigo-400"
          : "text-emerald-600 dark:text-emerald-400";

    return (
        <div className={cardContainerStyles}>
            {/* Ambient glowing light for Premium */}
            {isPremium && (
                <div className="pointer-events-none absolute -top-14 -right-14 h-40 w-40 rounded-full bg-gradient-to-tr from-amber-400/30 via-rose-400/20 to-transparent blur-2xl" />
            )}

            <div>
                {/* Badge Header */}
                <div className="mb-4 text-center">
                    <div className="mb-3 flex justify-center">
                        {isPremium ? (
                            <span className="inline-flex animate-pulse items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 px-4 py-1.5 text-xs font-black text-white shadow-md">
                                <WorkspacePremiumIcon
                                    style={{ fontSize: 15 }}
                                />
                                <span>{t("card.highestTierBadge")}</span>
                            </span>
                        ) : isBasic ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 px-3.5 py-1 text-xs font-extrabold text-white shadow-md">
                                <StarIcon style={{ fontSize: 14 }} />
                                <span>{t("card.recommendedBadge")}</span>
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                <SentimentSatisfiedAltIcon
                                    style={{ fontSize: 14 }}
                                />
                                <span>{t("card.freeBadge")}</span>
                            </span>
                        )}
                    </div>

                    <h3 className="text-text-primary text-2xl font-black tracking-tight">
                        {plan.name ||
                            (tierCode === "FREE"
                                ? t("freePlan")
                                : tierCode === "BASIC"
                                  ? t("basicPlan")
                                  : tierCode === "PREMIUM"
                                    ? t("premiumPlan")
                                    : tierCode)}
                    </h3>
                    <p className="text-text-muted mt-1.5 min-h-[38px] text-xs leading-relaxed font-medium">
                        {plan.description}
                    </p>

                    {/* Price Tag */}
                    <div className="mt-4 flex items-baseline justify-center gap-1">
                        {isPremium ? (
                            <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 bg-clip-text text-3xl font-black tracking-tight text-transparent">
                                {formatPrice(plan.priceAmount)}
                            </span>
                        ) : isBasic ? (
                            <span className="text-3xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                                {formatPrice(plan.priceAmount)}
                            </span>
                        ) : (
                            <span className="text-3xl font-black tracking-tight text-slate-800 dark:text-slate-200">
                                {formatPrice(plan.priceAmount)}
                            </span>
                        )}

                        <span className="text-text-muted text-xs font-semibold">
                            {plan.priceAmount === 0 || !plan.durationDays
                                ? t("card.lifetimeDuration")
                                : t("card.daysDuration", {
                                      days: plan.durationDays,
                                  })}
                        </span>
                    </div>
                </div>

                <div className="bg-bdc-primary/40 my-4 h-px w-full" />

                {/* Detailed Features List */}
                <div className="space-y-4">
                    {/* Section 1: Đánh giá & Hội thoại */}
                    <div>
                        <div className="text-text-muted mb-2 text-[11px] font-black tracking-wider uppercase opacity-75">
                            {t("card.sectionAssessmentAndAi")}
                        </div>
                        <ul className="space-y-2 text-xs">
                            <li className="text-text-primary flex items-start gap-2">
                                <CheckCircleIcon
                                    style={{ fontSize: 16 }}
                                    className={`${featureIconColor} mt-0.5 shrink-0`}
                                />
                                <span>
                                    {t("card.speakingAssessmentLabel")}{" "}
                                    <strong className="font-extrabold">
                                        {formatLimitCount(
                                            plan.dailySpeakingQuestionEvaluationLimit ??
                                                0,
                                        )}
                                    </strong>
                                    <span className="text-text-muted">
                                        {t("card.perDaySuffix")}
                                    </span>
                                </span>
                            </li>
                            <li className="text-text-primary flex items-start gap-2">
                                <CheckCircleIcon
                                    style={{ fontSize: 16 }}
                                    className={`${featureIconColor} mt-0.5 shrink-0`}
                                />
                                <span>
                                    {t("card.maxRecordingLabel")}{" "}
                                    <strong className="font-extrabold">
                                        {plan.maxSpeakingQuestionRecordingSeconds ??
                                            60}
                                        s
                                    </strong>
                                    <span className="text-text-muted">
                                        {t("card.perTurnSuffix")}
                                    </span>
                                </span>
                            </li>
                            <li className="text-text-primary flex items-start gap-2">
                                <CheckCircleIcon
                                    style={{ fontSize: 16 }}
                                    className={`${featureIconColor} mt-0.5 shrink-0`}
                                />
                                <span>
                                    {t("card.aiConversationLabel")}{" "}
                                    <strong className="font-extrabold">
                                        {formatLimitCount(
                                            plan.dailyAiSessionEvaluationLimit ??
                                                0,
                                        )}
                                    </strong>
                                    <span className="text-text-muted">
                                        {t("card.perDaySuffix")}
                                    </span>
                                </span>
                            </li>
                            <li className="text-text-primary flex items-start gap-2">
                                <CheckCircleIcon
                                    style={{ fontSize: 16 }}
                                    className={`${featureIconColor} mt-0.5 shrink-0`}
                                />
                                <span>
                                    {t("card.sessionLimitLabel")}{" "}
                                    <strong className="font-extrabold">
                                        {plan.maxTurnsPerAiSession ?? 10}{" "}
                                        {t("card.turnsSuffix")}
                                    </strong>
                                    <span className="text-text-muted">
                                        {" "}
                                        ({plan.maxAiTurnSpeakingSeconds ??
                                            20}{" "}
                                        {t("card.secondsPerTurnSuffix")})
                                    </span>
                                </span>
                            </li>
                            <li className="text-text-primary flex items-start gap-2">
                                <CheckCircleIcon
                                    style={{ fontSize: 16 }}
                                    className={`${featureIconColor} mt-0.5 shrink-0`}
                                />
                                <span>
                                    {t("card.concurrentSessionsLabel")}{" "}
                                    <strong className="font-extrabold">
                                        {plan.maxConcurrentAiSessionCount ?? 1}{" "}
                                        {t("card.sessionsSuffix")}
                                    </strong>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Section 2: Tiện ích & Quyền truy cập */}
                    <div>
                        <div className="text-text-muted mb-2 text-[11px] font-black tracking-wider uppercase opacity-75">
                            {t("card.sectionBenefits")}
                        </div>
                        <ul className="space-y-2 text-xs">
                            <li className="text-text-primary flex items-start gap-2">
                                {plan.sampleAnswerEnabled ? (
                                    <CheckCircleIcon
                                        style={{ fontSize: 16 }}
                                        className={`${featureIconColor} mt-0.5 shrink-0`}
                                    />
                                ) : (
                                    <CancelIcon
                                        style={{ fontSize: 16 }}
                                        className="text-text-muted/40 mt-0.5 shrink-0"
                                    />
                                )}
                                <span
                                    className={
                                        plan.sampleAnswerEnabled
                                            ? "font-medium"
                                            : "text-text-muted/60 line-through"
                                    }
                                >
                                    {t("card.smartSampleAnswersLabel")}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 pt-2">
                {isCurrentPlan ? (
                    <Button
                        variant="outlined"
                        fullWidth
                        disabled
                        className="rounded-xl border-emerald-500 py-2.5 font-bold text-emerald-600 dark:border-emerald-400 dark:text-emerald-400"
                    >
                        {t("currentPlanLabel")}
                    </Button>
                ) : isOwnedOrLower ? (
                    <Button
                        variant="outlined"
                        fullWidth
                        disabled
                        className="text-text-muted border-bdc-primary rounded-xl py-2.5 font-semibold"
                    >
                        {t("includedLabel")}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        fullWidth
                        disabled={checkoutLoadingCode !== null}
                        onClick={() => onCheckout(plan.code, isFailed)}
                        className={
                            isPremium
                                ? "rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 py-3 text-sm font-black text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-rose-500/30 active:scale-[0.98]"
                                : isBasic
                                  ? "rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-black text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-indigo-500/30 active:scale-[0.98]"
                                  : "rounded-xl bg-slate-800 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-900 active:scale-[0.98]"
                        }
                        sx={{
                            color: "#ffffff !important",
                            "& .MuiButton-startIcon": {
                                color: "#ffffff !important",
                            },
                        }}
                    >
                        {isLoadingThisPlan ? (
                            <div className="flex items-center gap-2 text-white">
                                <CircularProgress size={18} color="inherit" />
                                <span className="font-bold text-white">
                                    {t("processing")}
                                </span>
                            </div>
                        ) : isFailed ? (
                            <span className="font-bold text-white">
                                {t("retry")}
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-1.5 font-black text-white">
                                <AutoAwesomeIcon
                                    style={{ fontSize: 16, color: "#ffffff" }}
                                />
                                <span className="text-white">
                                    {t("buyNow")}
                                </span>
                            </span>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PlanCard;
