import React from "react";
import { getTranslations } from "next-intl/server";
import QuestionDetail from "@/modules/protected/topic-detail/question-detail/question-detail";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "topicDetail" });

    return {
        title: t("questionDetail"),
    };
}

const TopicQuestionDetailPage = () => {
    return <QuestionDetail />;
};

export default TopicQuestionDetailPage;
