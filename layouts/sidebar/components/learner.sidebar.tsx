"use client";
import React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Box, Drawer, List, ListItem, ListItemButton, IconButton } from "@mui/material";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/layouts/sidebar/constants/leaner.sidebar.constant";
import { useUiStore } from "@/store/uiStore";
import SidebarLogoButton from "./sidebar.logo.button";
import { MenuIcon } from "lucide-react";

const DRAWER_WIDTH = 260;

export function LearnerSidebar() {
    const pathname = usePathname();
    const { isSidebarOpen, isSidebarCollapsed, toggleSidebarCollapse, closeSidebar } = useUiStore();

    const renderDrawerContent = (isCollapsed: boolean) => (
        <>
            {/* Header */}
            <div className={cn(
                "border-bdc-primary border-b py-3.5 flex items-center justify-center relative min-h-[66px]",
                isCollapsed ? "px-0" : "px-4"
            )}>
                <div className={cn(!isCollapsed && "absolute left-4")}>
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
                    {NAV_ITEMS.map((item) => {
                        const active =
                            pathname === item.url ||
                            (item.url !== "/dashboard" &&
                                pathname.startsWith(item.url + "/"));

                        if (item.disabled) {
                            return (
                                <ListItem key={item.title} disablePadding>
                                    <Box
                                        className={cn(
                                            "flex w-full items-center rounded-lg text-sm",
                                            isCollapsed ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
                                            "text-text-muted cursor-not-allowed bg-transparent opacity-50",
                                        )}
                                        title={isCollapsed ? `${item.title} (Sắp ra mắt)` : "Sắp ra mắt"}
                                    >
                                        <item.icon className="h-4.5 w-4.5 shrink-0" />
                                        {!isCollapsed && (
                                            <>
                                                <span className="flex-1 truncate font-medium">
                                                    {item.title}
                                                </span>
                                                <span className="border-bdc-muted bg-bgc-page text-text-muted rounded-md border px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase">
                                                    Mới
                                                </span>
                                            </>
                                        )}
                                    </Box>
                                </ListItem>
                            );
                        }

                        return (
                            <ListItem key={item.title} disablePadding>
                                <ListItemButton
                                    component={Link as any}
                                    href={item.url}
                                    onClick={closeSidebar}
                                    className={cn(
                                        "relative flex w-full items-center rounded-lg text-sm transition-all duration-200 ease-in-out",
                                        isCollapsed ? "justify-center px-0" : "gap-3 px-3",
                                        active
                                            ? "bg-bgc-highlight/15 text-bgc-highlight font-semibold"
                                            : "text-text-contrast hover:bg-hbgc-app" + (isCollapsed ? "" : " hover:translate-x-1"),
                                    )}
                                    sx={{
                                        paddingTop: "10px",
                                        paddingBottom: "10px",
                                    }}
                                    title={isCollapsed ? item.title : undefined}
                                >
                                    {active && (
                                        <span className="bg-bgc-highlight absolute top-1/4 left-0 h-1/2 w-1 rounded-r-md" />
                                    )}
                                    <item.icon
                                        className={cn(
                                            "h-4.5 w-4.5 shrink-0 transition-transform duration-200",
                                            active
                                                ? "text-bgc-highlight"
                                                : "text-text-muted",
                                        )}
                                    />
                                    {!isCollapsed && (
                                        <span
                                            className={cn(
                                                "flex-1 text-sm font-medium transition-all duration-200",
                                                active
                                                    ? "text-bgc-highlight w-max font-semibold whitespace-nowrap"
                                                    : "text-text-contrast truncate",
                                            )}
                                        >
                                            {item.title}
                                        </span>
                                    )}
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
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
                ModalProps={{ keepMounted: true }} // Better open performance on mobile
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
