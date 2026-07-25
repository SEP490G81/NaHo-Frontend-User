import React from "react";
import { getTranslations } from "next-intl/server";
import TopicPath from "@/modules/protected/lesson-path/features/topic.path";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{ title: string }> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });

    return {
        title: t("lessonPath"),
    };
}

const TopicPathPage = () => {
    return <TopicPath />;
};

export default TopicPathPage;
