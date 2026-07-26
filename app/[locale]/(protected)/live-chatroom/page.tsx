import React from "react";
import { getTranslations } from "next-intl/server";
import LiveChatroom from "@/modules/protected/live-chatroom/components/live-chatroom";

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
        title: t("liveChatroom"),
    };
}

const LiveChatroomPage = async () => {
    return <LiveChatroom />;
};

export default LiveChatroomPage;
