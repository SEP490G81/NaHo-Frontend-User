import React from "react";
import { getTranslations } from "next-intl/server";
import CustomQuestion from "@/modules/protected/custom-question/components/custom-question";

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
        title: t("custom-question"),
    };
}

const CustomQuestionPage = () => {
    return <CustomQuestion />;
};

export default CustomQuestionPage;
