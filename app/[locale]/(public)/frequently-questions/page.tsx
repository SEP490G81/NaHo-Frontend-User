import React from "react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });

    return {
        title: t("frequentlyQuestions"),
    };
}

const FrequentlyQuestionsPage = () => {
    return <div>Frequently questions page</div>;
};

export default FrequentlyQuestionsPage;
