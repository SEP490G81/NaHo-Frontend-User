import React from "react";
import { getTranslations } from "next-intl/server";
import Topics from "@/modules/protected/topics/components/topics";

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
        title: t("topics"),
    };
}

const TopicsPage = async () => {
    // const res = await getTopics(); //goi api de lay data topic
    //goi api de lay data topic
    return (
        <Topics /> //truyen data topic vao component topics de render
    );
};

export default TopicsPage;
