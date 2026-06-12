import React from "react";
import { getTranslations } from "next-intl/server";
import HistoryCustom from "@/modules/protected/history-custom/components/history-custom";

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
        title: t("history-custom"),
    };
}

const HistoryCustomPage = () => {
    return <HistoryCustom />;
};

export default HistoryCustomPage;
