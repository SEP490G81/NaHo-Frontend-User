import React from "react";
import { getTranslations } from "next-intl/server";
import DialogueSetup from "@/modules/protected/dialogue-setup/components/dialogue-setup";

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
        title: t("dialogueSetup"),
    };
}

const DialogueSetupPage = async () => {
    return (
        <DialogueSetup />
    );
};

export default DialogueSetupPage;
