import React from "react";
import { Popover } from "@mui/material";
import { useTranslations } from "next-intl";
import { ChatSidebarPopoverProps } from "../types/chat.sidebar.type";
import ChatSidebarSessionItem from "../components/chat.sidebar.session.item";
import { isSessionActive } from "../utils/chat.sidebar.util";

const ChatSidebarPopover = ({
    anchorEl,
    open,
    inProgressSessions,
    completedProgressSessions,
    currentPathname,
    onClose,
    onSessionClick,
    onDeleteClick,
}: ChatSidebarPopoverProps) => {
    const t = useTranslations("common.layout.chatroomSidebar");

    const handleSelect = () => {
        onSessionClick?.();
        onClose();
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            slotProps={{
                paper: {
                    sx: {
                        ml: 1.5,
                        width: 270,
                        maxHeight: 440,
                        borderRadius: "14px",
                        backgroundColor: "var(--color-bgc-modal)",
                        border: "1px solid var(--color-bdc-primary)",
                        boxShadow:
                            "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        p: 1.5,
                    },
                },
            }}
        >
            {/* Content List */}
            <div className="flex-1 space-y-2.5 overflow-y-auto">
                {/* In Progress */}
                <div>
                    <span className="text-text-muted px-1 text-[11px] font-bold tracking-wider uppercase">
                        {t("chatSection")} ({inProgressSessions.length})
                    </span>
                    {inProgressSessions.length === 0 ? (
                        <p className="text-text-muted px-1 py-1 text-xs italic">
                            {t("noActiveChats")}
                        </p>
                    ) : (
                        <ul className="m-0 mt-1 space-y-0.5 p-0">
                            {inProgressSessions.map((s) => (
                                <ChatSidebarSessionItem
                                    key={s.sessionCode || s.id}
                                    session={s}
                                    isActive={isSessionActive(
                                        s.sessionCode,
                                        currentPathname,
                                    )}
                                    onSelect={handleSelect}
                                    onDeleteClick={onDeleteClick}
                                />
                            ))}
                        </ul>
                    )}
                </div>

                {/* Completed */}
                <div>
                    <span className="text-text-muted px-1 text-[11px] font-bold tracking-wider uppercase">
                        {t("completedSection")} (
                        {completedProgressSessions.length})
                    </span>
                    {completedProgressSessions.length === 0 ? (
                        <p className="text-text-muted px-1 py-1 text-xs italic">
                            {t("noCompletedChats")}
                        </p>
                    ) : (
                        <ul className="m-0 mt-1 space-y-0.5 p-0">
                            {completedProgressSessions.map((s) => (
                                <ChatSidebarSessionItem
                                    key={s.sessionCode || s.id}
                                    session={s}
                                    isActive={isSessionActive(
                                        s.sessionCode,
                                        currentPathname,
                                    )}
                                    onSelect={handleSelect}
                                    onDeleteClick={onDeleteClick}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </Popover>
    );
};

export default ChatSidebarPopover;
