import React from "react";
import { getTranslations } from "next-intl/server";
import TopicDetail from "@/modules/protected/topic-detail/features/topic.detail";

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
        title: t("topicDetail"),
    };
}

const TopicDetailPage = () => {
    return <TopicDetail />;
};

export default TopicDetailPage;
