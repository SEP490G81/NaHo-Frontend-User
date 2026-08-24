import React from "react";
import { getTranslations } from "next-intl/server";
import GeneralSettings from "@/modules/protected/settings/features/general.settings";

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
        title: t("general"),
    };
}

const SettingsPage = () => {
    return <GeneralSettings />;
};

export default SettingsPage;
