import React from "react";
import { getTranslations } from "next-intl/server";
import Reports from "@/modules/protected/report/components/reports";

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
        namespace: "common.metadata.title",
    });

    return {
        title: t("report"),
    };
}

const ReportsPage = () => {
    return <Reports />;
};

export default ReportsPage;
