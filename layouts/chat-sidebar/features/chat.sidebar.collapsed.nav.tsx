"use client";

import React, { useState } from "react";
import { Badge, IconButton, Tooltip } from "@mui/material";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { ChatSidebarCollapsedNavProps } from "../types/chat.sidebar.type";
import ChatSidebarNewButton from "../components/chat.sidebar.new.button";
import ChatSidebarPopover from "./chat.sidebar.popover";

const ChatSidebarCollapsedNav = ({
    inProgressSessions,
    completedProgressSessions,
    currentPathname,
    onSessionClick,
    onDeleteClick,
}: ChatSidebarCollapsedNavProps) => {
    const t = useTranslations("common.layout.chatroomSidebar");
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const isPopoverOpen = Boolean(anchorEl);

    const isCurrentActive =
        inProgressSessions.some((s) =>
            currentPathname.includes(s.sessionCode),
        ) ||
        completedProgressSessions.some((s) =>
            currentPathname.includes(s.sessionCode),
        );

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="flex flex-col items-center space-y-3 py-4">
            {/* Nút tạo đoạn chat mới */}
            <ChatSidebarNewButton isCollapsed onClick={onSessionClick} />

            {/* Nút icon message hiển thị danh sách sessions qua Popover */}
            <Tooltip title={t("chatSection")} placement="right" arrow>
                <IconButton
                    onClick={handleClick}
                    aria-label={t("chatSection")}
                    className={cn(
                        "group relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-200",
                        isPopoverOpen || isCurrentActive
                            ? "bg-bgc-highlight border-bgc-highlight shadow-bgc-highlight/30 text-white shadow-md"
                            : "text-text-contrast hover:bg-hbgc-app hover:text-text-highlight border-bdc-primary bg-bgc-app",
                    )}
                >
                    <Badge
                        badgeContent={inProgressSessions.length}
                        color="error"
                        sx={{
                            "& .MuiBadge-badge": {
                                fontSize: "9px",
                                height: "16px",
                                minWidth: "16px",
                                padding: "0 4px",
                            },
                        }}
                    >
                        <MessageCircle
                            size={20}
                            className="transition-transform group-hover:scale-110"
                        />
                    </Badge>
                </IconButton>
            </Tooltip>

            {/* Popover chi tiết các session */}
            <ChatSidebarPopover
                anchorEl={anchorEl}
                open={isPopoverOpen}
                inProgressSessions={inProgressSessions}
                completedProgressSessions={completedProgressSessions}
                currentPathname={currentPathname}
                onClose={handleClose}
                onSessionClick={onSessionClick}
                onDeleteClick={onDeleteClick}
            />
        </div>
    );
};

export default ChatSidebarCollapsedNav;
