import React from "react";
import { getTranslations } from "next-intl/server";
import PointHistory from "@/modules/protected/point-history/components/point.history";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{ title: string }> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pointHistory" });
    return { title: t("title") };
}

const PointHistoryPage = () => {
    return <PointHistory />;
};

export default PointHistoryPage;
