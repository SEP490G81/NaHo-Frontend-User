import React from "react";
import { getTranslations } from "next-intl/server";
import Sandbox from "@/modules/protected/sandbox/components/sandbox";

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "common.metadata.title" });

    return {
        title: t("sandbox"),
    };
}

const SandboxPage = () => {
    return <Sandbox />;
};

export default SandboxPage;
