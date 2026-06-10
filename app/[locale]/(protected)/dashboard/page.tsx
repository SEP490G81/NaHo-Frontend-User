import React from "react";
import { getTranslations } from "next-intl/server";
import Dashboard from "@/modules/protected/dashboard/components/dashboard";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata.title" });

    return {
        title: t("dashboard"),
    };
}

const DashboardPage = () => {
    return <Dashboard />;
};

export default DashboardPage;
