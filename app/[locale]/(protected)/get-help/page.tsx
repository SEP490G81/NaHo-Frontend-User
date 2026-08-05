import React from "react";
import { getTranslations } from "next-intl/server";
import HelpCenter from "@/modules/protected/get-help/features/help.center";

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
        title: t("getHelp"),
    };
}

const GetHelpPage = () => {
    return <HelpCenter />;
};

export default GetHelpPage;
