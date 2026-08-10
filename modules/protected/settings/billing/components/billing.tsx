"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { Divider } from "@mui/material";
import { getMySubscription } from "@/services/client/subscription.service";
import {
    SubscriptionPlanResponse,
    UserSubscriptionResponse,
} from "@/types/responses/subscription.response";
import CurrentPlan from "@/modules/protected/settings/billing/components/current.plan";
import SubscriptionModal from "@/modules/protected/settings/billing/features/subscription.modal";
import { useSettingHighlight } from "@/modules/protected/settings/hooks/use.setting.highlight";

const Billing = () => {
    const t = useTranslations("settings.billing");
    const searchParams = useSearchParams();
    const router = useRouter();
    useSettingHighlight();

    const [subscription, setSubscription] =
        useState<UserSubscriptionResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchSub = async () => {
        setLoading(true);
        try {
            const data = await getMySubscription();
            setSubscription(data);
        } catch (err) {
            console.error("Failed to load user subscription:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSub();
    }, []);

    // Check payment return status from URL query parameters after VNPAY redirect
    useEffect(() => {
        const status = searchParams.get("status");
        if (!status) return;

        if (status === "PAID") {
            toast.success(
                "🎉 Chúc mừng bạn đã nâng cấp gói dịch vụ thành công!",
                {
                    autoClose: 5000,
                },
            );
            fetchSub();
        } else {
            toast.error(
                "Thanh toán không thành công. Vui lòng kiểm tra lại giao dịch.",
                {
                    autoClose: 5000,
                },
            );
        }

        // Clean up query parameters from URL
        router.replace("/settings/billing");
    }, [searchParams, router]);

    const plan = subscription?.subscriptionPlan || subscription?.plan;
    const currentTier = plan?.tier || "FREE";

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-y-6 pb-12">
            {/* Part 4 Header */}
            <div>
                <h1 className="text-text-contrast text-2xl font-bold">
                    {t("title")}
                </h1>
                <p className="text-text-muted mt-1 text-sm">
                    {t("description")}
                </p>
            </div>

            <Divider className="border-bdc-primary/50" />

            {/* Section: Current Plan */}
            <div
                id="setting-current-plan"
                data-setting-id="setting-current-plan"
                className="rounded-xl transition-all duration-300"
            >
                <CurrentPlan
                    subscription={subscription}
                    loading={loading}
                    onOpenModal={() => setIsModalOpen(true)}
                />
            </div>

            <SubscriptionModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentPlanTier={currentTier}
            />
        </div>
    );
};

export default Billing;
