"use client";

import React from "react";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { cn } from "@/libs/utils";
import type { ChatroomSectionHeaderProps } from "../types/chatroom.sidebar.type";

const ChatroomSectionHeader = ({
    title,
    icon,
    isCollapsed,
    isActive,
    onClick,
}: Readonly<ChatroomSectionHeaderProps>) => {
    if (isCollapsed) {
        const buttonContent = (
            <div className="flex justify-center py-1">
                {onClick ? (
                    <button
                        type="button"
                        onClick={onClick}
                        className={cn(
                            "flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-150 active:scale-95",
                            isActive
                                ? "bg-hbgc-app text-text-contrast shadow-xs"
                                : "text-text-muted hover:bg-hbgc-app hover:text-text-contrast",
                        )}
                    >
                        {icon}
                    </button>
                ) : (
                    <div className="text-text-muted hover:text-text-contrast flex h-10 w-10 items-center justify-center rounded-xl transition-colors">
                        {icon}
                    </div>
                )}
            </div>
        );

        return (
            <TooltipCustom title={title} placement="right" arrow>
                {buttonContent}
            </TooltipCustom>
        );
    }

    return (
        <div className="flex items-center justify-between px-3.5 py-2">
            <div className="flex items-center gap-x-2">
                {icon && (
                    <span className="text-text-muted text-xs">{icon}</span>
                )}
                <span className="text-text-muted text-xs font-bold tracking-wider uppercase">
                    {title}
                </span>
            </div>
        </div>
    );
};

export default ChatroomSectionHeader;
