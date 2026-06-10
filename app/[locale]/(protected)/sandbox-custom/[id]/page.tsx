import React from "react";
import { getTranslations } from "next-intl/server";
import SandboxCustom from "@/modules/(protected)/sandbox-custom/components/sandbox-custom";

export async function generateMetadata({
    params,
}: {
    params: { locale: string; id: string };
}): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata.title" });

    return {
        title: t("sandbox-custom"),
    };
}

const SandboxCustomPage = async ({
    params,
}: {
    params: { id: string };
}) => {
    const { id } = await params;
    return <SandboxCustom id={id} />;
};

export default SandboxCustomPage;
