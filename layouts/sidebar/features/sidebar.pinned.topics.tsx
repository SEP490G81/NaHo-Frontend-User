"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Divider } from "@mui/material";
import { Pin, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { usePinnedTopics } from "@/hooks/use.pinned.topics";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import SidebarPinnedTopicCard from "../components/sidebar.pinned.topic.card";

interface SidebarPinnedTopicsProps {
    isCollapsed: boolean;
    onCloseSidebar?: () => void;
}

export function SidebarPinnedTopics({
    isCollapsed,
    onCloseSidebar,
}: Readonly<SidebarPinnedTopicsProps>) {
    const pathname = usePathname();
    const t = useTranslations("marugoto");
    const { pinnedTopics, unpinTopic } = usePinnedTopics();

    if (pinnedTopics.length === 0) return null;

    return (
        <div className="mt-4">
            {/* Divider + Section Header on the same row */}
            {!isCollapsed ? (
                <div className="my-3 flex items-center gap-2 px-3">
                    <span className="text-text-muted shrink-0 text-[10px] font-black tracking-wider uppercase">
                        {t("path.pinnedSection")}
                    </span>
                    <div className="bg-bdc-primary h-px flex-1 opacity-60" />
                </div>
            ) : (
                <Divider className="border-bdc-primary my-3 opacity-60" />
            )}

            {/* List of up to 3 pinned topics */}
            <div className={cn("space-y-1", isCollapsed ? "px-1.5" : "px-3")}>
                {pinnedTopics.slice(0, 3).map((pinned) => {
                    const isActive =
                        pathname === pinned.url ||
                        pathname.startsWith(pinned.url + "/");

                    const bookLevel = pinned.bookLevel || "A1";
                    const topicLabel = pinned.topicOrder
                        ? t("topic.label", {
                              index: pinned.topicOrder,
                          })
                        : pinned.title;
                    const displayText =
                        pinned.bookLevel && pinned.topicOrder
                            ? `${bookLevel} - ${topicLabel}`
                            : pinned.title;

                    if (isCollapsed) {
                        return (
                            <TooltipCustom
                                key={pinned.id}
                                placement="right"
                                title={
                                    <SidebarPinnedTopicCard pinned={pinned} />
                                }
                            >
                                <Link
                                    href={pinned.url}
                                    onClick={onCloseSidebar}
                                    className={cn(
                                        "relative flex h-9 w-full cursor-pointer items-center justify-center rounded-lg transition-all duration-200 ease-in-out",
                                        isActive
                                            ? "bg-bgc-highlight/15 text-bgc-highlight font-semibold"
                                            : "text-text-contrast hover:bg-hbgc-app",
                                    )}
                                >
                                    {isActive && (
                                        <span className="bg-bgc-highlight absolute top-1/4 left-0 h-1/2 w-1 rounded-r-md" />
                                    )}
                                    <Pin className="text-bgc-highlight h-4 w-4 shrink-0 rotate-45" />
                                </Link>
                            </TooltipCustom>
                        );
                    }

                    return (
                        <TooltipCustom
                            key={pinned.id}
                            placement="right"
                            title={<SidebarPinnedTopicCard pinned={pinned} />}
                        >
                            <div
                                className={cn(
                                    "group relative flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-lg px-3 py-2 text-xs transition-all duration-200 ease-in-out",
                                    isActive
                                        ? "bg-bgc-highlight/15 text-bgc-highlight font-semibold"
                                        : "text-text-contrast hover:bg-hbgc-app hover:translate-x-1",
                                )}
                            >
                                {isActive && (
                                    <span className="bg-bgc-highlight absolute top-1/4 left-0 h-1/2 w-1 rounded-r-md" />
                                )}
                                <Link
                                    href={pinned.url}
                                    onClick={onCloseSidebar}
                                    className="flex min-w-0 flex-1 items-center gap-2.5"
                                >
                                    <Pin className="text-bgc-highlight h-3.5 w-3.5 shrink-0 rotate-45" />
                                    <span className="text-text-contrast group-hover:text-bgc-highlight truncate font-semibold">
                                        {displayText}
                                    </span>
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => unpinTopic(pinned.id)}
                                    title={t("path.unpinTopic")}
                                    className="text-text-muted hover:text-text-error cursor-pointer rounded p-1 opacity-60 transition-all hover:bg-black/10 hover:opacity-100 dark:hover:bg-white/10"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </TooltipCustom>
                    );
                })}
            </div>
        </div>
    );
}

export default SidebarPinnedTopics;
