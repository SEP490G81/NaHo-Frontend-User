import React from "react";
import { getTranslations } from "next-intl/server";
import HistoryDetail from "@/modules/protected/history-detail/components/history.detail";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "common.metadata.title" });

    return {
        title: t("historyDetail"),
    };
}

const HistoryDetailPage = () => {
    return <HistoryDetail />;
};

export default HistoryDetailPage;
