import React from "react";
import { getTranslations } from "next-intl/server";
import History from "@/modules/protected/history/components/history";

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
        title: t("history"),
    };
}

const HistoryPage = () => {
    return <History />;
};

export default HistoryPage;
