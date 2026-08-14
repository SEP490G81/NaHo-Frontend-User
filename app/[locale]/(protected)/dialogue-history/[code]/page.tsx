import React from "react";
import { getTranslations } from "next-intl/server";
import SessionDetail from "@/modules/protected/dialogue-history/components/session-detail";

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

const SessionDetailPage = async ({
    params,
}: {
    params: Promise<{ code: string }>;
}) => {
    const { code } = await params;
    return <SessionDetail sessionCode={code} />;
};

export default SessionDetailPage;
