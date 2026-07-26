import React from "react";
import { getTranslations } from "next-intl/server";
import Orders from "@/modules/protected/settings/orders/components/orders";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "settings.page",
    });

    return {
        title: t("orders"),
    };
}

const OrdersPage = () => {
    return <Orders />;
};

export default OrdersPage;
