"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { IconButton, Tooltip } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { ChatSidebarSessionItemProps } from "../types/chat.sidebar.type";
import {
    CHAT_RESULT_ROUTE_PREFIX,
    CHAT_SESSION_ROUTE_PREFIX,
} from "../constants/chat.sidebar.constant";
import { formatSessionTime } from "../utils/chat.sidebar.util";

const ChatSidebarSessionItem = ({
    session,
    isActive,
    onSelect,
    onDeleteClick,
}: ChatSidebarSessionItemProps) => {
    const t = useTranslations("common.layout.chatroomSidebar");

    const isCompleted = String(session.status).toUpperCase() === "COMPLETED";
    const sessionUrl = isCompleted
        ? `${CHAT_RESULT_ROUTE_PREFIX}/${session.sessionCode}`
        : `${CHAT_SESSION_ROUTE_PREFIX}/${session.sessionCode}`;
    const formattedTime = formatSessionTime(session.startedAt);
    const title =
        session.persona?.name ||
        session.voiceName ||
        session.topic ||
        t("untitledChat");

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDeleteClick?.(session);
    };

    return (
        <li className="group relative list-none">
            <Link
                href={sessionUrl}
                onClick={onSelect}
                className={cn(
                    "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 pr-8 text-left transition-colors duration-150",
                    isActive
                        ? "bg-bgc-highlight/10 text-text-highlight font-semibold"
                        : "text-text-contrast hover:bg-hbgc-app",
                )}
            >
                <div className="min-w-0 flex-1">
                    <p
                        className={cn(
                            "truncate text-xs leading-snug",
                            isActive
                                ? "text-text-contrast font-bold"
                                : "text-text-contrast font-medium",
                        )}
                        title={title}
                    >
                        {title}
                    </p>
                    {formattedTime && (
                        <p
                            className="text-text-muted mt-0.5 truncate text-[10.5px] leading-tight"
                            title={formattedTime}
                        >
                            {formattedTime}
                        </p>
                    )}
                </div>
            </Link>

            <div className="absolute top-1/2 right-1.5 shrink-0 -translate-y-1/2">
                <Tooltip title={t("deleteChat")} arrow placement="top">
                    <IconButton
                        size="small"
                        onClick={handleDelete}
                        aria-label={t("deleteChat")}
                        sx={{
                            padding: "4px",
                            color: "var(--color-text-muted)",
                            "&:hover": {
                                color: "var(--color-text-error)",
                                backgroundColor: "rgba(239, 35, 60, 0.1)",
                            },
                        }}
                        className="opacity-70 transition-opacity group-hover:opacity-100"
                    >
                        <DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Tooltip>
            </div>
        </li>
    );
};

export default ChatSidebarSessionItem;
