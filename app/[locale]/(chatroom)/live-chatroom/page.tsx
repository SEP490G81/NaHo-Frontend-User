import React from "react";
import { getTranslations } from "next-intl/server";
import { LiveChatroomProvider } from "@/modules/protected/live-chatroom/providers/live.chatroom.provider";
import LiveChatroomView from "@/modules/protected/live-chatroom/features/live.chatroom.view";

interface LiveChatroomSessionPageProps {
    params: Promise<{
        locale: string;
    }>;
    searchParams: Promise<{
        sessionCode?: string;
        status?: string;
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
    searchParams,
}: Readonly<LiveChatroomSessionPageProps>) {
    const { sessionCode, status } = await searchParams;

    return (
        <LiveChatroomProvider sessionCode={sessionCode || ""} status={status}>
            <LiveChatroomView />
        </LiveChatroomProvider>
    );
}
