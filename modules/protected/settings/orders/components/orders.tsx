"use client";

import React from "react";
import { useTranslations } from "next-intl";
import OrdersList from "@/modules/protected/settings/orders/features/orders.list";
import ContainerBox from "@/components/ui/container.box";

const Orders = () => {
    const t = useTranslations("settings.orders");

    return (
        <div className="space-y-5">
            <ContainerBox className="text-center">
                <h1 className="text-text-primary mb-1 text-center text-2xl font-extrabold">
                    {t("title")}
                </h1>
                <p className="text-text-muted text-center text-sm">
                    {t("subtitle")}
                </p>
            </ContainerBox>

            <OrdersList />
        </div>
    );
};

export default Orders;
