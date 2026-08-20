"use client";

import React, { useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import ChatroomSectionHeader from "../components/chatroom.section.header";
import ChatroomItem from "../components/chatroom.item";
import { isChatroomActive } from "../utils/chatroom.sidebar.util";
import type {
    ChatroomSidebarItemData,
    ChatroomSidebarSectionProps,
} from "../types/chatroom.sidebar.type";

export function ChatroomCompletedSection({
    isCollapsed,
    onItemClick,
}: Readonly<ChatroomSidebarSectionProps>) {
    const t = useTranslations("common.layout.chatroomSidebar");
    const pathname = usePathname();

    // Placeholder state for completed items (to be wired with API)
    const [completedItems] = useState<ChatroomSidebarItemData[]>([]);

    if (completedItems.length === 0) return <></>;
    return (
        <div className="w-full">
            <ChatroomSectionHeader
                title={t("completedSection")}
                icon={<CheckCircleOutlineOutlinedIcon sx={{ fontSize: 16 }} />}
                isCollapsed={isCollapsed}
            />

            <div className="space-y-0.5">
                {completedItems.map((item) => (
                    <ChatroomItem
                        key={item.id || item.sessionCode}
                        item={item}
                        isActive={isChatroomActive(pathname, item.sessionCode)}
                        isCollapsed={isCollapsed}
                        onClick={onItemClick}
                    />
                ))}
            </div>
        </div>
    );
}

export default ChatroomCompletedSection;
