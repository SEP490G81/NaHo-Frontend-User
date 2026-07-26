"use client";

import React from "react";
import { useTranslations } from "next-intl";
import OrdersList from "@/modules/protected/settings/orders/features/orders.list";

const Orders = () => {
    const t = useTranslations("settings.orders");

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-extrabold text-text-primary text-center">
                    {t("title")}
                </h1>
                <p className="mt-1 text-sm text-text-muted text-center">
                    {t("subtitle")}
                </p>
            </div>

            <OrdersList />
        </div>
    );
};

export default Orders;
