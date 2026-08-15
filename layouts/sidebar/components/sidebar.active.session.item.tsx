"use client";

import React from "react";
import { Loader2, Mic, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { getLastSessionMessage } from "../utils/session.util";
import type { ActiveSpeakingSessionResponse } from "@/types/responses/speaking.response";

interface SidebarActiveSessionItemProps {
    active: ActiveSpeakingSessionResponse;
    isCollapsed: boolean;
    onResume: () => void;
    onDelete: () => void;
    isResuming?: boolean;
    isDeleting?: boolean;
}

export function SidebarActiveSessionItem({
    active,
    isCollapsed,
    onResume,
    onDelete,
    isResuming = false,
    isDeleting = false,
}: Readonly<SidebarActiveSessionItemProps>) {
    const t = useTranslations("marugoto.path");
    const lastMessage =
        getLastSessionMessage(active.messages) || t("noUtterance");

    if (isCollapsed) {
        return (
            <TooltipCustom
                placement="right"
                title={
                    <div className="max-w-xs space-y-1 p-1">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-bgc-highlight">
                            <Mic className="h-3 w-3 animate-pulse" />
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
                    disabled={isResuming || isDeleting}
                    className={cn(
                        "relative flex h-9 w-full cursor-pointer items-center justify-center rounded-lg transition-all duration-200 ease-in-out",
                        "hover:bg-hbgc-app text-text-contrast",
                    )}
                >
                    {isResuming ? (
                        <Loader2 className="h-4 w-4 animate-spin text-bgc-highlight" />
                    ) : (
                        <Mic className="h-4 w-4 shrink-0 text-bgc-highlight animate-pulse" />
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
                    "text-text-contrast hover:bg-hbgc-app hover:translate-x-1",
                    isResuming && "opacity-70 pointer-events-none",
                )}
            >
                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                    {isResuming ? (
                        <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-bgc-highlight" />
                    ) : (
                        <Mic className="h-3.5 w-3.5 shrink-0 text-bgc-highlight animate-pulse" />
                    )}
                    <span className="truncate font-semibold text-text-contrast group-hover:text-bgc-highlight">
                        {lastMessage}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    disabled={isDeleting || isResuming}
                    title={t("deleteSessionTitle")}
                    className="text-text-muted hover:text-text-error cursor-pointer rounded p-1 opacity-60 transition-all hover:bg-black/10 hover:opacity-100 dark:hover:bg-white/10"
                >
                    {isDeleting ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <X className="h-3.5 w-3.5" />
                    )}
                </button>
            </div>
        </TooltipCustom>
    );
}

export default SidebarActiveSessionItem;
