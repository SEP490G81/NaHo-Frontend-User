import React from "react";
import { getTranslations } from "next-intl/server";
import { LiveChatroomProvider } from "@/modules/protected/live-chatroom/providers/live.chatroom.provider";
import LiveChatroomView from "@/modules/protected/live-chatroom/features/live.chatroom.view";

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

    return (
        <LiveChatroomProvider sessionCode={sessionCode}>
            <LiveChatroomView />
        </LiveChatroomProvider>
    );
}
