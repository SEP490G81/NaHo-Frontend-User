"use client";

import React from "react";
import { Chip } from "@mui/material";
import ChatSidebarSessionItem from "./chat.sidebar.session.item";
import { ChatSidebarSectionProps } from "../types/chat.sidebar.type";
import { isSessionActive } from "../utils/chat.sidebar.util";

const ChatSidebarSection = ({
    title,
    icon,
    count,
    sessions,
    emptyText,
    currentPathname,
    onSessionClick,
    onDeleteSession,
}: ChatSidebarSectionProps) => {
    return (
        <div className="flex flex-col space-y-1.5">
            <div className="flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-1.5 min-w-0">
                    {icon && (
                        <span className="shrink-0 text-text-muted flex items-center justify-center">
                            {icon}
                        </span>
                    )}
                    <span className="text-text-muted text-xs font-bold uppercase tracking-wider truncate">
                        {title}
                    </span>
                </div>
                {count > 0 && (
                    <Chip
                        label={count}
                        size="small"
                        sx={{
                            height: 18,
                            fontSize: "10px",
                            fontWeight: 700,
                            borderRadius: "6px",
                            backgroundColor: "var(--color-hbgc-app)",
                            color: "var(--color-text-contrast)",
                            "& .MuiChip-label": { px: 0.8 },
                        }}
                    />
                )}
            </div>

            {sessions.length === 0 ? (
                <div className="px-2.5 py-2 text-center">
                    <p className="text-text-muted text-xs italic">{emptyText}</p>
                </div>
            ) : (
                <ul className="space-y-1 p-0 m-0">
                    {sessions.map((session) => {
                        const isActive = isSessionActive(
                            session.sessionCode,
                            currentPathname,
                        );
                        return (
                            <ChatSidebarSessionItem
                                key={session.sessionCode || session.id}
                                session={session}
                                isActive={isActive}
                                onSelect={onSessionClick}
                                onDeleteClick={onDeleteSession}
                            />
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default ChatSidebarSection;
