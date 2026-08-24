import React from "react";
import { getTranslations } from "next-intl/server";
import AccountSettings from "@/modules/protected/settings/account/features/account.settings";

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
        title: t("account"),
    };
}

const SettingsAccountPage = () => {
    return <AccountSettings />;
};

export default SettingsAccountPage;
