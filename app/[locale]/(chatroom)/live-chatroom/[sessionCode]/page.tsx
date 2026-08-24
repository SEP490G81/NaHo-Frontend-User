import React from "react";
import { getTranslations } from "next-intl/server";
import { LiveChatroomProvider } from "@/modules/protected/live-chatroom/providers/live.chatroom.provider";
import LiveChatroomView from "@/modules/protected/live-chatroom/features/live.chatroom.view";
import { getSpeakingSessionDetailServer } from "@/services/server/speaking.llm.service";
import { SpeakingSessionStatus } from "@/types/enums/speaking.llm.enum";

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
    const sessionDetails = await getSpeakingSessionDetailServer(
        sessionCode,
        SpeakingSessionStatus.IN_PROGRESS,
    );

    return (
        <LiveChatroomProvider
            sessionCode={sessionCode}
            initialSessionDetails={sessionDetails}
        >
            <LiveChatroomView />
        </LiveChatroomProvider>
    );
}
