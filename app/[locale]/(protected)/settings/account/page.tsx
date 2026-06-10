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
        namespace: "page.settings.title",
    });

    return {
        title: t("account"),
    };
}

const SettingsAccountPage = () => {
    return <div>Account Page</div>;
};

export default SettingsAccountPage;
