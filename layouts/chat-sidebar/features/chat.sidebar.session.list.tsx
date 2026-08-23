"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { SpeakingSessionListItemResponse } from "@/types/responses/speaking.llm.response";
import ChatSidebarSection from "../components/chat.sidebar.section";

interface ChatSidebarSessionListProps {
    readonly inProgressSessions: SpeakingSessionListItemResponse[];
    readonly completedProgressSessions: SpeakingSessionListItemResponse[];
    readonly currentPathname: string;
    readonly onSessionClick?: () => void;
    readonly onDeleteSession: (
        session: SpeakingSessionListItemResponse,
    ) => void;
}

const ChatSidebarSessionList = ({
    inProgressSessions,
    completedProgressSessions,
    currentPathname,
    onSessionClick,
    onDeleteSession,
}: ChatSidebarSessionListProps) => {
    const t = useTranslations("common.layout.chatroomSidebar");

    return (
        <div className="flex flex-col space-y-3 px-3 py-2">
            {/* Mục 1: IN_PROGRESS sessions (Đoạn chat) */}
            <ChatSidebarSection
                title={t("chatSection")}
                icon={<MessageCircle size={14} />}
                count={inProgressSessions.length}
                sessions={inProgressSessions}
                emptyText={t("noActiveChats")}
                currentPathname={currentPathname}
                onSessionClick={onSessionClick}
                onDeleteSession={onDeleteSession}
            />

            {/* Mục 2: COMPLETED sessions (Đã hoàn thành) */}
            <ChatSidebarSection
                title={t("completedSection")}
                icon={<MessageCircle size={14} />}
                count={completedProgressSessions.length}
                sessions={completedProgressSessions}
                emptyText={t("noCompletedChats")}
                currentPathname={currentPathname}
                onSessionClick={onSessionClick}
                onDeleteSession={onDeleteSession}
            />
        </div>
    );
};

export default ChatSidebarSessionList;
