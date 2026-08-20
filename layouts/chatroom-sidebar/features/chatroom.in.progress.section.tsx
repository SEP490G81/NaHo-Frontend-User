"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { getInProgressSessions } from "@/services/client/speaking.llm.service";
import ChatroomSectionHeader from "../components/chatroom.section.header";
import ChatroomItem from "../components/chatroom.item";
import ChatroomInProgressPopover from "../components/chatroom.in.progress.popover";
import { isChatroomActive } from "../utils/chatroom.sidebar.util";
import type { ChatroomSidebarSectionProps } from "../types/chatroom.sidebar.type";

export function ChatroomInProgressSection({
    isCollapsed,
    onItemClick,
}: Readonly<ChatroomSidebarSectionProps>) {
    const t = useTranslations("common.layout.chatroomSidebar");
    const pathname = usePathname();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const { data: inProgressSessions } = useQuery({
        queryKey: ["in-progress-speaking-sessions"],
        queryFn: getInProgressSessions,
        staleTime: 30 * 1000,
    });

    if (!inProgressSessions || inProgressSessions.length === 0) {
        return <></>;
    }

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const handleSelectSession = () => {
        handleClosePopover();
        onItemClick?.();
    };

    if (isCollapsed) {
        return (
            <div className="w-full">
                <ChatroomSectionHeader
                    title={t("chatSection")}
                    icon={<MessageCircle className="h-5 w-5" />}
                    isCollapsed={true}
                    isActive={Boolean(anchorEl)}
                    onClick={handleOpenPopover}
                />

                <ChatroomInProgressPopover
                    anchorEl={anchorEl}
                    isOpen={Boolean(anchorEl)}
                    onClose={handleClosePopover}
                    sessions={inProgressSessions}
                    currentPathname={pathname}
                    onItemClick={handleSelectSession}
                    title={t("chatSection")}
                />
            </div>
        );
    }

    return (
        <div className="w-full">
            <ChatroomSectionHeader
                title={t("chatSection")}
                icon={<MessageCircle className="h-4 w-4" />}
                isCollapsed={false}
            />

            <div className="space-y-0.5">
                {inProgressSessions.map((session) => (
                    <ChatroomItem
                        key={session.id || session.sessionCode}
                        item={{
                            id: session.id,
                            sessionCode: session.sessionCode,
                            topic: session.topic,
                            startedAt: session.startedAt,
                            marugotoLevel: session.marugotoLevel,
                            formalityLevel: session.formalityLevel,
                            totalTurns: session.totalTurns,
                        }}
                        isActive={isChatroomActive(
                            pathname,
                            session.sessionCode,
                        )}
                        isCollapsed={false}
                        onClick={onItemClick}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChatroomInProgressSection;
