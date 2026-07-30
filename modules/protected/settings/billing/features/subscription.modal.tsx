import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { getSubscriptionPlans } from "@/services/client/subscription.service";
import { createPaymentOrder } from "@/services/client/payment.service";
import { PlanTier, SubscriptionPlanResponse } from "@/types/responses/subscription.response";
import PlanCard from "@/modules/protected/settings/billing/components/plan.card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

interface SubscriptionModalProps {
    open: boolean;
    onClose: () => void;
    currentPlanTier: PlanTier;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
    open,
    onClose,
    currentPlanTier,
}) => {
    const t = useTranslations("settings.billing");
    const router = useRouter();

    const [plans, setPlans] = useState<SubscriptionPlanResponse[]>([]);
    const [loadingPlans, setLoadingPlans] = useState<boolean>(false);
    const [fetchPlansError, setFetchPlansError] = useState<boolean>(false);
    const [checkoutLoadingCode, setCheckoutLoadingCode] = useState<
        string | null
    >(null);

    // Idempotency state: UUID generated when user initiates a checkout attempt, reused on Retry
    const [activeIdempotencyKey, setActiveIdempotencyKey] = useState<
        string | null
    >(null);
    const [lastFailedPlanCode, setLastFailedPlanCode] = useState<string | null>(
        null,
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchPlans = async () => {
        setLoadingPlans(true);
        setFetchPlansError(false);
        setErrorMessage(null);
        try {
            const data = await getSubscriptionPlans();
            // Sort plans by price or tier level (FREE -> BASIC -> PREMIUM)
            const tierOrder: Record<PlanTier, number> = {
                FREE: 0,
                BASIC: 1,
                PREMIUM: 2,
            };
            const sorted = [...data].sort(
                (a, b) => (tierOrder[a.tier] ?? 0) - (tierOrder[b.tier] ?? 0),
            );
            setPlans(sorted);
        } catch (err: any) {
            setFetchPlansError(true);
            setErrorMessage(err.message || t("errors.fetchPlansFailed"));
        } finally {
            setLoadingPlans(false);
        }
    };

    useEffect(() => {
        if (!open) return;

        // Reset idempotency state when modal opens
        setActiveIdempotencyKey(null);
        setLastFailedPlanCode(null);
        setErrorMessage(null);
        setFetchPlansError(false);

        fetchPlans();
    }, [open]);

    const handleCheckout = async (planCode: string, isRetry = false) => {
        let key = activeIdempotencyKey;

        // 1. Mỗi lần bấm nút Mua gói mới -> Sinh 1 Idempotency Key mới (UUID)
        // Khi Retry do rớt mạng -> Giữ nguyên key UUID cũ
        if (!isRetry || !key) {
            key = crypto.randomUUID();
            setActiveIdempotencyKey(key);
        }

        // 2. Disable nút bấm để tránh spam click
        setCheckoutLoadingCode(planCode);
        setErrorMessage(null);

        try {
            const res = await createPaymentOrder(
                {
                    planCode,
                    provider: "VNPAY",
                },
                key,
            );

            if (res && res.paymentUrl) {
                try {
                    const savedUrls = JSON.parse(
                        localStorage.getItem("naho_payment_urls") || "{}",
                    );
                    savedUrls[res.orderCode] = res.paymentUrl;
                    localStorage.setItem(
                        "naho_payment_urls",
                        JSON.stringify(savedUrls),
                    );
                } catch (e) {
                    console.error(
                        "Failed to save paymentUrl to localStorage:",
                        e,
                    );
                }

                window.open(res.paymentUrl, "_blank");
                onClose();
                router.push("/orders");
            } else {
                throw new Error(t("errors.createPaymentFailed"));
            }
        } catch (error: any) {
            console.error("Payment order creation error:", error);
            setLastFailedPlanCode(planCode);
            setErrorMessage(error.message || t("errors.createPaymentFailed"));
        } finally {
            setCheckoutLoadingCode(null);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={checkoutLoadingCode ? undefined : onClose}
            maxWidth="lg"
            fullWidth
            slotProps={{
                paper: {
                    style: {
                        borderRadius: 20,
                        padding: 8,
                    },
                },
            }}
        >
            <div className="relative p-4 sm:p-6">
                <DialogTitle className="text-text-primary p-0 text-center text-2xl font-extrabold">
                    {t("modalTitle")}
                </DialogTitle>
                <p className="text-text-muted mt-1 text-center text-sm">
                    {t("modalSubtitle")}
                </p>

                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    disabled={checkoutLoadingCode !== null}
                    sx={{
                        position: "absolute",
                        right: 16,
                        top: 16,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <DialogContent className="mt-4 p-0">
                    {errorMessage && !fetchPlansError && (
                        <div className="mb-4">
                            <Alert
                                severity="error"
                                onClose={() => setErrorMessage(null)}
                            >
                                {errorMessage}
                            </Alert>
                        </div>
                    )}

                    {loadingPlans ? (
                        <div className="flex h-64 items-center justify-center">
                            <CircularProgress />
                        </div>
                    ) : fetchPlansError || plans.length === 0 ? (
                        <div className="my-6 flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center dark:border-rose-900/30 dark:bg-rose-950/20">
                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400">
                                <ErrorOutlineIcon style={{ fontSize: 32 }} />
                            </div>
                            <h3 className="text-text-primary text-lg font-bold">
                                {t("errors.fetchPlansFailedTitle")}
                            </h3>
                            <p className="text-text-muted mt-1 max-w-md text-sm">
                                {errorMessage || t("errors.fetchPlansFailed")}
                            </p>
                            <Button
                                variant="contained"
                                onClick={fetchPlans}
                                startIcon={<RefreshIcon />}
                                disabled={loadingPlans}
                                className="bg-primary hover:bg-primary-dark mt-5 font-semibold text-white shadow-md"
                            >
                                {t("errors.retryFetchPlans")}
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {plans.map((plan) => (
                                <PlanCard
                                    key={plan.id || plan.code}
                                    plan={plan}
                                    currentTier={currentPlanTier}
                                    onCheckout={handleCheckout}
                                    checkoutLoadingCode={checkoutLoadingCode}
                                    isFailed={lastFailedPlanCode === plan.code}
                                />
                            ))}
                        </div>
                    )}
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default SubscriptionModal;
