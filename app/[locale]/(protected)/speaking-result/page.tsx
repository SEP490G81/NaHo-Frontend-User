import React from "react";
import { getTranslations } from "next-intl/server";
import SessionReport from "@/modules/protected/speaking-result/components/session-report";

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
        title: t("speakingResult"),
    };
}

const SpeakingResultPage = async () => {
    return <SessionReport />;
};

export default SpeakingResultPage;
