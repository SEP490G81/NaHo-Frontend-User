import React from "react";
import { getTranslations } from "next-intl/server";
import QuestionDetail from "@/modules/protected/question-detail/features/question.detail";

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
        title: t("questionDetail"),
    };
}

const QuestionDetailPage = () => {
    return <QuestionDetail />;
};

export default QuestionDetailPage;
