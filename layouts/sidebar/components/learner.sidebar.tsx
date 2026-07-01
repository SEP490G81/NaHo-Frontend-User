"use client";

import React from "react";
import { usePathname } from "@/i18n/navigation";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { Box, Drawer, IconButton, List } from "@mui/material";
import { cn } from "@/libs/utils";
import { NAV_ITEMS } from "@/layouts/sidebar/constants/leaner.sidebar.constant";
import { useUiStore } from "@/store/uiStore";
import SidebarLogoButton from "./sidebar.logo.button";
import SidebarItem from "./sidebar.item";
import { MenuIcon } from "lucide-react";

const DRAWER_WIDTH = 260;

export function LearnerSidebar() {
    const pathname = usePathname();
    const { isSidebarOpen, isSidebarCollapsed, toggleSidebarCollapse, closeSidebar } = useUiStore();
    const [openSubMenus, setOpenSubMenus] = React.useState<Record<string, boolean>>({});

    React.useEffect(() => {
        const initialOpenState: Record<string, boolean> = {};

        NAV_ITEMS.forEach((item) => {
            if (item.children) {
                const hasActiveChild = item.children.some(
                    (child) => pathname === child.url || pathname.startsWith(child.url + "/")
                );

                if (hasActiveChild) {
                    initialOpenState[item.title] = true;
                }
            }
        });

        setOpenSubMenus((prev) => ({ ...initialOpenState, ...prev }));
    }, [pathname]);

    const toggleSubMenu = (title: string) => {
        setOpenSubMenus((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const renderDrawerContent = (isCollapsed: boolean) => (
        <>
            {/* Header */}
            <div
                className={cn(
                    "border-bdc-primary border-b py-3.5 flex items-center justify-center relative min-h-[66px]",
                    isCollapsed ? "px-0" : "px-4"
                )}
            >
                <div className={cn(!isCollapsed && "absolute left-4")}>
                    <TooltipCustom title={isCollapsed ? "Mở rộng" : "Thu gọn"} placement="right">
                        <IconButton
                            onClick={toggleSidebarCollapse}
                            sx={{
                                display: { xs: "none", md: "inline-flex" },
                                color: "var(--color-text-contrast)",
                                "&:hover": { backgroundColor: "var(--color-hbgc-app)" },
                            }}
                        >
                            <MenuIcon className="h-6 w-6" />
                        </IconButton>
                    </TooltipCustom>
                </div>

                {!isCollapsed && (
                    <SidebarLogoButton>
                        <h1 className="text-text-contrast text-xl font-bold tracking-wider">
                            NaHo
                        </h1>
                    </SidebarLogoButton>
                )}
            </div>

            {/* Menu items */}
            <Box className="flex-1 overflow-y-auto py-4">
                <List disablePadding className={cn("space-y-2", isCollapsed ? "px-1.5" : "px-3")}>
                    {NAV_ITEMS.map((item) => (
                        <SidebarItem
                            key={item.title}
                            item={item}
                            pathname={pathname}
                            isCollapsed={isCollapsed}
                            isOpen={!!openSubMenus[item.title]}
                            onToggleSubMenu={() => toggleSubMenu(item.title)}
                            onCloseSidebar={closeSidebar}
                            toggleSidebarCollapse={toggleSidebarCollapse}
                        />
                    ))}
                </List>
            </Box>
        </>
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