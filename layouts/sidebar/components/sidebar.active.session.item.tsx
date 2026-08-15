"use client";

import React from "react";
import { Loader2, Mic, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { getLastSessionMessage } from "../utils/session.util";
import type { SpeakingSessionResponse } from "@/types/responses/speaking.llm.response";

interface SidebarActiveSessionItemProps {
    session: SpeakingSessionResponse;
    isCollapsed: boolean;
    isActive?: boolean;
    onResume: () => void;
    onDelete: () => void;
    isDeleting?: boolean;
}

export function SidebarActiveSessionItem({
    session,
    isCollapsed,
    isActive = false,
    onResume,
    onDelete,
    isDeleting = false,
}: Readonly<SidebarActiveSessionItemProps>) {
    const t = useTranslations("marugoto.path");
    const lastMessage =
        getLastSessionMessage(session.messages) || t("noUtterance");

    if (isCollapsed) {
        return (
            <TooltipCustom
                placement="right"
                title={
                    <div className="max-w-xs space-y-1 p-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-bgc-highlight">
                            {isDeleting ? (
                                <Loader2 className="h-3 w-3 animate-spin text-bgc-highlight" />
                            ) : (
                                <Mic className="h-3 w-3" />
                            )}
                            <span>{t("activeSessionSection")}</span>
                        </div>
                        <p className="line-clamp-2 text-xs font-medium text-text-contrast">
                            {lastMessage}
                        </p>
                    </div>
                }
            >
                <button
                    type="button"
                    onClick={onResume}
                    disabled={isDeleting}
                    className={cn(
                        "relative flex h-9 w-full cursor-pointer items-center justify-center rounded-lg transition-all duration-200 ease-in-out",
                        isActive
                            ? "bg-bgc-highlight/15 text-bgc-highlight font-semibold"
                            : "hover:bg-hbgc-app text-text-contrast",
                        isDeleting && "opacity-60 cursor-not-allowed",
                    )}
                >
                    {isActive && (
                        <span className="bg-bgc-highlight absolute top-1/4 left-0 h-1/2 w-1 rounded-r-md" />
                    )}
                    {isDeleting ? (
                        <Loader2 className="h-4 w-4 animate-spin text-bgc-highlight" />
                    ) : (
                        <Mic className="h-4 w-4 shrink-0 text-bgc-highlight" />
                    )}
                </button>
            </TooltipCustom>
        );
    }

    return (
        <TooltipCustom
            placement="right"
            title={
                <div className="max-w-xs space-y-1 p-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-bgc-highlight">
                        <Mic className="h-3 w-3" />
                        <span>{t("activeSessionSection")}</span>
                    </div>
                    <p className="text-xs font-medium text-text-contrast">
                        {lastMessage}
                    </p>
                </div>
            }
        >
            <div
                onClick={onResume}
                className={cn(
                    "group relative flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-xs transition-all duration-200 ease-in-out",
                    isActive
                        ? "bg-bgc-highlight/15 text-bgc-highlight font-semibold shadow-xs"
                        : "text-text-contrast hover:bg-hbgc-app hover:translate-x-1",
                    isDeleting && "opacity-50 pointer-events-none",
                )}
            >
                {isActive && (
                    <span className="bg-bgc-highlight absolute top-1/4 left-0 h-1/2 w-1 rounded-r-md" />
                )}
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                    <Mic className="h-3.5 w-3.5 shrink-0 text-bgc-highlight" />
                    <span
                        className={cn(
                            "truncate font-semibold transition-colors",
                            isActive
                                ? "text-bgc-highlight"
                                : "text-text-contrast group-hover:text-bgc-highlight",
                        )}
                    >
                        {lastMessage}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    disabled={isDeleting}
                    title={t("deleteSessionTitle")}
                    className={cn(
                        "cursor-pointer rounded p-1 opacity-60 transition-all hover:opacity-100",
                        isActive
                            ? "text-bgc-highlight hover:text-text-error hover:bg-bgc-highlight/20"
                            : "text-text-muted hover:text-text-error hover:bg-black/10 dark:hover:bg-white/10",
                    )}
                >
                    {isDeleting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-red-500" />
                    ) : (
                        <X className="h-3.5 w-3.5" />
                    )}
                </button>
            </div>
        </TooltipCustom>
    );
}

export default SidebarActiveSessionItem;
