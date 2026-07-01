import React from "react";
import { getTranslations } from "next-intl/server";
import QuestionCustomDetail from "@/modules/protected/custom-question/question-custom-detail/question-custom-detail";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "communityLibrary" });

    return {
        title: t("questionCustomDetail"),
    };
}

const CommunityQuestionDetailPage = () => {
    return <QuestionCustomDetail />;
};

export default CommunityQuestionDetailPage;
