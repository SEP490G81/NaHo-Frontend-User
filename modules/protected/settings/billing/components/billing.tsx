"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { getMySubscription } from "@/services/client/subscription.service";
import { SubscriptionPlanResponse } from "@/types/responses/subscription.response";
import CurrentPlan from "@/modules/protected/settings/billing/components/current.plan";
import SubscriptionModal from "@/modules/protected/settings/billing/features/subscription.modal";

const Billing = () => {
    const t = useTranslations("settings.billing");
    const searchParams = useSearchParams();
    const router = useRouter();

    const [subscription, setSubscription] =
        useState<SubscriptionPlanResponse | null>(null);
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

    const currentTier = subscription?.tier;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-text-primary text-2xl font-extrabold">
                    {t("currentPlanTitle")}
                </h1>
                <p className="text-text-muted mt-1 text-sm">
                    Quản lý gói đăng ký dịch vụ và quyền hạn sử dụng của bạn
                </p>
            </div>

            <CurrentPlan
                subscription={subscription}
                loading={loading}
                onOpenModal={() => setIsModalOpen(true)}
            />

            <SubscriptionModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentPlanTier={currentTier || "FREE"}
            />
        </div>
    );
};

export default Billing;
