"use client";
import React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Box, Drawer, List, ListItem, ListItemButton } from "@mui/material";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/layouts/sidebar/constants/leaner.sidebar.constant";
import { useUiStore } from "@/store/uiStore";
import LogoButton from "@/modules/public/login/components/logo.button";

const DRAWER_WIDTH = 260;

export function LearnerSidebar() {
    const pathname = usePathname();
    const { isSidebarOpen, closeSidebar } = useUiStore();

    const drawerContent = (
        <>
            {/* Header */}
            <Box className="border-bdc-primary flex h-16 items-center border-b px-5">
                <div className="pt-3">
                    <LogoButton>
                        <span className="text-text-contrast text-xl font-bold tracking-wider">
                            NaHo
                        </span>
                    </LogoButton>
                </div>
            </Box>

            {/* Menu items */}
            <Box className="flex-1 overflow-y-auto py-4">
                <List disablePadding className="space-y-2 px-3">
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
                                            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                                            "text-text-muted cursor-not-allowed bg-transparent opacity-50",
                                        )}
                                        title="Sắp ra mắt"
                                    >
                                        <item.icon className="h-4.5 w-4.5 shrink-0" />
                                        <span className="flex-1 truncate font-medium">
                                            {item.title}
                                        </span>
                                        <span className="border-bdc-muted bg-bgc-page text-text-muted rounded-md border px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase">
                                            Mới
                                        </span>
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
                                        "relative flex w-full items-center gap-3 rounded-lg px-3 text-sm transition-all duration-200 ease-in-out",
                                        active
                                            ? "bg-bgc-highlight/15 text-bgc-highlight font-semibold"
                                            : "text-text-contrast hover:bg-hbgc-app hover:translate-x-1",
                                    )}
                                    sx={{
                                        paddingTop: "10px",
                                        paddingBottom: "10px",
                                    }}
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
            sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
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
                {drawerContent}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        boxSizing: "border-box",
                        backgroundColor: "var(--color-bgc-app)",
                        borderRight: "1px solid var(--color-bdc-primary)",
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}
export default LearnerSidebar;
