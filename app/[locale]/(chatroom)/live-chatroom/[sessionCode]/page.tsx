import React from "react";
import { getTranslations } from "next-intl/server";
import LiveChatroom from "@/modules/protected/live-chatroom/features/live.chatroom";
import { getInProgressSessionDetailsServer } from "@/services/server/speaking.llm.service";
import { redirect } from "next/navigation";

interface LiveChatroomSessionPageProps {
    params: Promise<{
        locale: string;
        sessionCode: string;
    }>;
}

export async function generateMetadata({
    params,
}: LiveChatroomSessionPageProps): Promise<{
    title: string;
}> {
    const { locale } = await params;
    const t = await getTranslations({
        locale,
        namespace: "common.metadata.title",
    });

    return {
        title: t("liveChatroom"),
    };
}

export default async function LiveChatroomSessionPage({
    params,
}: Readonly<LiveChatroomSessionPageProps>) {
    const { sessionCode } = await params;

    const initialSession = await getInProgressSessionDetailsServer(sessionCode);

    if (!initialSession) {
        redirect("/not-found");
    }

    console.log(">>> check session: ", initialSession);
    return (
        <LiveChatroom
            sessionCode={sessionCode}
            initialSession={initialSession}
        />
    );
}
