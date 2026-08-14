import React from "react";
import { getTranslations } from "next-intl/server";
import DialogueHistory from "@/modules/protected/dialogue-history/components/dialogue-history";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<{ title: string }> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });
    return { title: t("dialogueHistory") };
}

const DialogueHistoryPage = async () => {
    return <DialogueHistory />;
};

export default DialogueHistoryPage;
