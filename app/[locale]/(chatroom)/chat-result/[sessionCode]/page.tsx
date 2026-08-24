import React from "react";
import { getTranslations } from "next-intl/server";
import { getSpeakingSessionAssessmentServer } from "@/services/server/speaking.llm.service";
import ChatResultView from "@/modules/protected/chat-result/features/chat.result.view";

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
        title: t("speakingResult") || "Báo Cáo Đánh Giá AI",
    };
}

const ChatResultSessionPage = async ({
    params,
}: {
    params: Promise<{ sessionCode: string }>;
}) => {
    const { sessionCode } = await params;
    const sessionData = await getSpeakingSessionAssessmentServer(sessionCode);

    return <ChatResultView session={sessionData} />;
};

export default ChatResultSessionPage;
