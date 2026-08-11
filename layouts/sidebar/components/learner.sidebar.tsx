"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Box, Divider, Drawer, List } from "@mui/material";
import { Pin, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/libs/utils";
import { NAV_ITEMS } from "@/layouts/sidebar/constants/leaner.sidebar.constant";
import { useUiStore } from "@/store/uiStore";
import { usePinnedTopics } from "@/hooks/use.pinned.topics";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import SidebarLogoButton from "./sidebar.logo.button";
import SidebarItem from "./sidebar.item";
import UserAvatar from "./user.avatar";
import SidebarPinnedTopicCard from "./sidebar.pinned.topic.card";

const DRAWER_WIDTH = 260;

export function LearnerSidebar() {
    const pathname = usePathname();
    const t = useTranslations("marugoto");
    const {
        isSidebarOpen,
        isSidebarCollapsed,
        toggleSidebarCollapse,
        closeSidebar,
    } = useUiStore();
    const { pinnedTopics, unpinTopic } = usePinnedTopics();
    const [openSubMenus, setOpenSubMenus] = React.useState<
        Record<string, boolean>
    >({});

    React.useEffect(() => {
        const initialOpenState: Record<string, boolean> = {};

        NAV_ITEMS.forEach((item) => {
            if (item.children) {
                const hasActiveChild = item.children.some(
                    (child) =>
                        pathname === child.url ||
                        pathname.startsWith(child.url + "/"),
                );

                if (hasActiveChild) {
                    const key = item.titleKey || item.title;
                    initialOpenState[key] = true;
                }
            }
        });

        setOpenSubMenus((prev) => ({ ...initialOpenState, ...prev }));
    }, [pathname]);

    const toggleSubMenu = (key: string) => {
        setOpenSubMenus((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const renderDrawerContent = (isCollapsed: boolean) => (
        <div className="flex h-full flex-col justify-between overflow-hidden">
            {/* Header: chỉ còn logo */}
            <div
                className={cn(
                    "border-bdc-primary flex min-h-16.5 shrink-0 items-center justify-center border-b py-3.5",
                    isCollapsed ? "px-2" : "px-4",
                )}
            >
                <SidebarLogoButton>
                    {!isCollapsed && (
                        <h1 className="text-text-contrast text-xl font-bold tracking-wider">
                            NaHo
                        </h1>
                    )}
                </SidebarLogoButton>
            </div>

            {/* Menu items */}
            <Box className="flex flex-1 flex-col overflow-y-auto py-4">
                <List
                    disablePadding
                    className={cn("space-y-2", isCollapsed ? "px-1.5" : "px-3")}
                >
                    {NAV_ITEMS.map((item) => {
                        const itemKey = item.titleKey || item.title;
                        return (
                            <SidebarItem
                                key={itemKey}
                                item={item}
                                pathname={pathname}
                                isCollapsed={isCollapsed}
                                isOpen={openSubMenus[itemKey]}
                                onToggleSubMenu={() => toggleSubMenu(itemKey)}
                                onCloseSidebar={closeSidebar}
                                toggleSidebarCollapse={toggleSidebarCollapse}
                            />
                        );
                    })}
                </List>

                {/* Pinned Topics Section */}
                {pinnedTopics.length > 0 && (
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
                        <div
                            className={cn(
                                "space-y-1",
                                isCollapsed ? "px-1.5" : "px-3",
                            )}
                        >
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
                                    // Collapsed state: Icon only with Tooltip popover
                                    return (
                                        <TooltipCustom
                                            key={pinned.id}
                                            placement="right"
                                            title={
                                                <SidebarPinnedTopicCard
                                                    pinned={pinned}
                                                />
                                            }
                                        >
                                            <Link
                                                href={pinned.url}
                                                onClick={closeSidebar}
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

                                // Expanded state: Icon + Formatted Text + Unpin button
                                return (
                                    <TooltipCustom
                                        key={pinned.id}
                                        placement="right"
                                        title={
                                            <SidebarPinnedTopicCard
                                                pinned={pinned}
                                            />
                                        }
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
                                                onClick={closeSidebar}
                                                className="flex min-w-0 flex-1 items-center gap-2.5"
                                            >
                                                <Pin className="text-bgc-highlight h-3.5 w-3.5 shrink-0 rotate-45" />
                                                <span className="text-text-contrast group-hover:text-bgc-highlight truncate font-semibold">
                                                    {displayText}
                                                </span>
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    unpinTopic(pinned.id)
                                                }
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
                )}
            </Box>

            {/* User Avatar Footer */}
            <div className={cn("border-bdc-primary shrink-0 border-t")}>
                <UserAvatar isCollapsed={isCollapsed} />
            </div>
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: { md: isSidebarCollapsed ? 72 : DRAWER_WIDTH },
                flexShrink: { md: 0 },
                transition: "width 0.2s ease-in-out",
            }}
        >
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={isSidebarOpen}
                onClose={closeSidebar}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                        backgroundColor: "var(--color-bgc-app)",
                        borderRight: "1px solid var(--color-bdc-primary)",
                    },
                }}
            >
                {renderDrawerContent(false)}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        width: isSidebarCollapsed ? 72 : DRAWER_WIDTH,
                        boxSizing: "border-box",
                        backgroundColor: "var(--color-bgc-app)",
                        borderRight: "1px solid var(--color-bdc-primary)",
                        transition: "width 0.2s ease-in-out",
                        overflowX: "hidden",
                    },
                }}
            >
                {renderDrawerContent(isSidebarCollapsed)}
            </Drawer>
        </Box>
    );
}

export default LearnerSidebar;
