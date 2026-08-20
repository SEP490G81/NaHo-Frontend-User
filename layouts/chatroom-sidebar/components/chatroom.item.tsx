"use client";

import React from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Link } from "@/i18n/navigation";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { cn } from "@/libs/utils";
import {
    formatVietnamDateTime,
    truncateChatTitle,
} from "../utils/chatroom.sidebar.util";
import type { ChatroomSidebarItemProps } from "../types/chatroom.sidebar.type";

const ChatroomItem = ({
    item,
    isActive,
    isCollapsed,
    onClick,
}: Readonly<ChatroomSidebarItemProps>) => {
    const topicText =
        item.topic || item.title || item.sessionCode || "Hội thoại";
    const formattedStartTime = formatVietnamDateTime(item.startedAt);
    const href = `/live-chatroom/${item.sessionCode}`;

    if (isCollapsed) {
        const tooltipContent = (
            <div className="flex flex-col gap-0.5 py-0.5 text-xs">
                <span className="font-bold">{topicText}</span>
                {formattedStartTime && (
                    <span className="text-text-muted text-[10px]">
                        {formattedStartTime}
                    </span>
                )}
            </div>
        );

        return (
            <div className="flex justify-center py-1">
                <TooltipCustom title={tooltipContent} placement="right" arrow>
                    <Link
                        href={href}
                        onClick={onClick}
                        className={cn(
                            "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-150 active:scale-95",
                            isActive
                                ? "bg-bgc-highlight text-white shadow-xs"
                                : "text-text-muted hover:bg-hbgc-app hover:text-text-contrast",
                        )}
                    >
                        {item.isCompleted ? (
                            <CheckCircleOutlineOutlinedIcon className="h-5 w-5" />
                        ) : (
                            <span className="text-xs font-semibold">
                                {topicText.slice(0, 2).toUpperCase()}
                            </span>
                        )}
                    </Link>
                </TooltipCustom>
            </div>
        );
    }

    return (
        <div className="px-2 py-0.5">
            <Link
                href={href}
                onClick={onClick}
                className={cn(
                    "group flex w-full cursor-pointer items-start gap-x-2.5 rounded-xl px-3 py-2 text-left transition-all duration-150 active:scale-[0.99]",
                    isActive
                        ? "bg-bgc-highlight text-white shadow-xs"
                        : "text-text-contrast hover:bg-hbgc-app",
                )}
            >
                {item.isCompleted && (
                    <span
                        className={cn(
                            "mt-0.5 shrink-0 transition-colors",
                            isActive
                                ? "text-white"
                                : "text-text-muted group-hover:text-text-contrast",
                        )}
                    >
                        <CheckCircleOutlineOutlinedIcon className="h-4 w-4" />
                    </span>
                )}

                <div className="min-w-0 flex-1">
                    <p
                        className={cn(
                            "truncate text-sm leading-tight font-medium",
                            isActive ? "text-white" : "text-text-contrast",
                        )}
                    >
                        {truncateChatTitle(topicText, 24)}
                    </p>
                    {formattedStartTime && (
                        <p
                            className={cn(
                                "mt-1 truncate text-[11px] leading-none",
                                isActive
                                    ? "text-white/80"
                                    : "text-text-muted group-hover:text-text-contrast/70",
                            )}
                        >
                            {formattedStartTime}
                        </p>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default ChatroomItem;
