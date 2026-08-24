"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Tooltip } from "@mui/material";
import { SquarePen } from "lucide-react";
import { cn } from "@/libs/utils";
import { CHAT_NEW_ROUTE } from "../constants/chat.sidebar.constant";

interface ChatSidebarNewButtonProps {
    readonly isCollapsed?: boolean;
    readonly onClick?: () => void;
}

const ChatSidebarNewButton = ({
    isCollapsed = false,
    onClick,
}: ChatSidebarNewButtonProps) => {
    const t = useTranslations("common.layout.chatroomSidebar");
    const pathname = usePathname();
    const isActive =
        pathname === CHAT_NEW_ROUTE ||
        pathname.startsWith(`${CHAT_NEW_ROUTE}/`);

    const buttonLabel = t("newChat");

    if (isCollapsed) {
        return (
            <Tooltip title={buttonLabel} placement="right" arrow>
                <Link
                    href={CHAT_NEW_ROUTE}
                    onClick={onClick}
                    className={cn(
                        "group relative flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200",
                        isActive
                            ? "bg-bgc-highlight/15 text-text-highlight"
                            : "text-text-contrast hover:bg-hbgc-app",
                    )}
                >
                    <SquarePen
                        size={19}
                        className="transition-transform group-hover:scale-105"
                    />
                </Link>
            </Tooltip>
        );
    }

    return (
        <Link
            href={CHAT_NEW_ROUTE}
            onClick={onClick}
            className={cn(
                "group relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                    ? "bg-bgc-highlight/15 text-text-highlight font-semibold"
                    : "text-text-contrast hover:bg-hbgc-app",
            )}
        >
            <SquarePen
                size={17}
                className={cn(
                    "shrink-0 transition-transform group-hover:scale-105",
                    isActive ? "text-text-highlight" : "text-text-contrast",
                )}
            />
            <span className="truncate">{buttonLabel}</span>
        </Link>
    );
};

export default ChatSidebarNewButton;
