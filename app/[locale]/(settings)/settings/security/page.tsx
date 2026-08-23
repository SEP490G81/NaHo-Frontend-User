import React from "react";
import { getTranslations } from "next-intl/server";
import SecuritySettings from "@/modules/protected/settings/features/security.settings";

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
        namespace: "settings.page",
    });

    return {
        title: t("security"),
    };
}

const SecurityPage = () => {
    return <SecuritySettings />;
};

export default SecurityPage;
