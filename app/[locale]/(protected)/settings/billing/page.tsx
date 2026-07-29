import React from "react";
import { getTranslations } from "next-intl/server";
import Billing from "@/modules/protected/settings/billing/components/billing";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "settings.page",
    });

    return {
        title: t("billing"),
    };
}

const BillingPage = () => {
    return <Billing />;
};

export default BillingPage;
