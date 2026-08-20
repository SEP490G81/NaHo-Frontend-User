"use client";

import React from "react";
import { Popover } from "@mui/material";
import { Link } from "@/i18n/navigation";
import { cn } from "@/libs/utils";
import {
    formatVietnamDateTime,
    isChatroomActive,
    truncateChatTitle,
} from "../utils/chatroom.sidebar.util";
import type { ChatroomInProgressPopoverProps } from "../types/chatroom.sidebar.type";

export function ChatroomInProgressPopover({
    anchorEl,
    isOpen,
    onClose,
    sessions,
    currentPathname,
    onItemClick,
    title,
}: Readonly<ChatroomInProgressPopoverProps>) {
    return (
        <Popover
            open={isOpen}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            slotProps={{
                paper: {
                    sx: {
                        ml: 1,
                        minWidth: 230,
                        maxWidth: 270,
                        maxHeight: 380,
                        borderRadius: "16px",
                        bgcolor: "var(--color-bgc-app)",
                        color: "var(--color-text-contrast)",
                        border: "1px solid var(--color-bdc-primary)",
                        boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.25)",
                    },
                },
            }}
        >
            <div className="flex flex-col py-2.5">
                {title && (
                    <div className="px-3.5 pt-0.5 pb-2">
                        <span className="text-text-muted text-xs font-bold tracking-wider">
                            {title}
                        </span>
                    </div>
                )}

                <div className="no-scrollbar max-h-75 space-y-0.5 overflow-y-auto px-1.5">
                    {sessions.map((session) => {
                        const topicText =
                            session.topic || session.sessionCode || "Hội thoại";
                        const formattedStartTime = formatVietnamDateTime(
                            session.startedAt,
                        );
                        const active = isChatroomActive(
                            currentPathname,
                            session.sessionCode,
                        );
                        const href = `/live-chatroom/${session.sessionCode}`;

                        return (
                            <Link
                                key={session.id || session.sessionCode}
                                href={href}
                                onClick={onItemClick}
                                className={cn(
                                    "group block w-full rounded-xl px-3 py-2 text-left transition-all duration-150 active:scale-[0.99]",
                                    active
                                        ? "bg-bgc-highlight text-white shadow-xs"
                                        : "text-text-contrast hover:bg-hbgc-app",
                                )}
                            >
                                <p
                                    className={cn(
                                        "truncate text-sm leading-tight font-medium",
                                        active
                                            ? "text-white"
                                            : "text-text-contrast",
                                    )}
                                >
                                    {truncateChatTitle(topicText, 26)}
                                </p>
                                {formattedStartTime && (
                                    <p
                                        className={cn(
                                            "mt-1 truncate text-[11px] leading-none",
                                            active
                                                ? "text-white/80"
                                                : "text-text-muted group-hover:text-text-contrast/70",
                                        )}
                                    >
                                        {formattedStartTime}
                                    </p>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </Popover>
    );
}

export default ChatroomInProgressPopover;
