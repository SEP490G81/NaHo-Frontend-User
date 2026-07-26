"use client";

import React from "react";
import { Box, Collapse, List, ListItem, ListItemButton } from "@mui/material";
import { ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import { NavItem } from "../constants/leaner.sidebar.constant";
import { cn } from "@/libs/utils";

interface SidebarItemProps {
    item: NavItem;
    pathname: string;
    isCollapsed: boolean;
    isOpen: boolean;
    onToggleSubMenu: () => void;
    onCloseSidebar: () => void;
    toggleSidebarCollapse: () => void;
}

// Helper function to generate clean class names based on state
export const getItemClassName = (
    active: boolean,
    isCollapsed: boolean,
    isSubItem: boolean = false,
) => {
    if (isSubItem) {
        return cn(
            "relative flex w-full items-center rounded-lg text-xs transition-all duration-200 ease-in-out gap-3 px-3 py-2",
            active
                ? "bg-bgc-highlight/10 text-bgc-highlight font-semibold"
                : "text-text-contrast hover:bg-hbgc-app" +
                      (isCollapsed ? "" : " hover:translate-x-1"),
        );
    }
    return cn(
        "relative flex w-full items-center rounded-lg text-sm transition-all duration-200 ease-in-out",
        isCollapsed ? "justify-center px-0" : "gap-3 px-3",
        active
            ? "bg-bgc-highlight/15 text-bgc-highlight font-semibold"
            : "text-text-contrast hover:bg-hbgc-app" +
                  (isCollapsed ? "" : " hover:translate-x-1"),
    );
};

export const SidebarItem = ({
    item,
    pathname,
    isCollapsed,
    isOpen,
    onToggleSubMenu,
    onCloseSidebar,
    toggleSidebarCollapse,
}: SidebarItemProps) => {
    const hasChildren = item.children && item.children.length > 0;

    // Check if parent or any child route is active
    const active = item.url
        ? pathname === item.url ||
          (item.url !== "/dashboard" && pathname.startsWith(item.url + "/"))
        : item.children?.some(
              (child) =>
                  pathname === child.url ||
                  pathname.startsWith(child.url + "/"),
          );

    // 1. Render Disabled / Coming soon items
    if (item.disabled) {
        return (
            <ListItem disablePadding>
                <TooltipCustom
                    title={
                        isCollapsed
                            ? `${item.title} (Sắp ra mắt)`
                            : "Sắp ra mắt"
                    }
                    placement="right"
                >
                    <Box
                        component="span"
                        className={cn(
                            "flex w-full items-center rounded-lg text-sm",
                            isCollapsed
                                ? "justify-center px-0 py-2.5"
                                : "gap-3 px-3 py-2.5",
                            "text-text-muted cursor-not-allowed bg-transparent opacity-50",
                        )}
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
                </TooltipCustom>
            </ListItem>
        );
    }

    // 2. Render Collapsible items with sub-menus
    if (hasChildren) {
        return (
            <React.Fragment>
                <ListItem disablePadding>
                    <TooltipCustom
                        title={item.title}
                        placement="right"
                        disableHoverListener={!isCollapsed}
                    >
                        <span className="block w-full">
                            <ListItemButton
                                onClick={() => {
                                    if (isCollapsed) {
                                        toggleSidebarCollapse();
                                    }
                                    onToggleSubMenu();
                                }}
                                className={getItemClassName(
                                    !!active,
                                    isCollapsed,
                                )}
                                sx={{
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                    ...(isCollapsed && {
                                        justifyContent: "center",
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                    }),
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
                                {!isCollapsed && (
                                    <>
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
                                        <ChevronDown
                                            className={cn(
                                                "text-text-muted h-4 w-4 shrink-0 transition-transform duration-200",
                                                isOpen && "rotate-180",
                                            )}
                                        />
                                    </>
                                )}
                            </ListItemButton>
                        </span>
                    </TooltipCustom>
                </ListItem>

                <Collapse
                    in={isOpen && !isCollapsed}
                    timeout="auto"
                    unmountOnExit
                >
                    <List
                        component="div"
                        disablePadding
                        className="mt-1 space-y-1 pl-6"
                    >
                        {item.children!.map((child) => {
                            const childActive =
                                pathname === child.url ||
                                pathname.startsWith(child.url + "/");
                            return (
                                <ListItem key={child.title} disablePadding>
                                    <ListItemButton
                                        component={Link as any}
                                        href={child.url}
                                        onClick={onCloseSidebar}
                                        className={getItemClassName(
                                            childActive,
                                            isCollapsed,
                                            true,
                                        )}
                                    >
                                        {childActive && (
                                            <span className="bg-bgc-highlight absolute top-1/4 left-0 h-1/2 w-1 rounded-r-md" />
                                        )}
                                        <span
                                            className={cn(
                                                "flex-1 truncate text-xs font-medium transition-all duration-200",
                                                childActive
                                                    ? "text-bgc-highlight font-semibold"
                                                    : "text-text-muted",
                                            )}
                                        >
                                            {child.title}
                                        </span>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Collapse>
            </React.Fragment>
        );
    }

    // 3. Render Normal link items
    return (
        <ListItem disablePadding>
            <TooltipCustom
                title={item.title}
                placement="right"
                disableHoverListener={!isCollapsed}
            >
                <span className="block w-full">
                    <ListItemButton
                        component={Link as any}
                        href={item.url}
                        onClick={onCloseSidebar}
                        className={getItemClassName(!!active, isCollapsed)}
                        sx={{
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            ...(isCollapsed && {
                                justifyContent: "center",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }),
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
                </span>
            </TooltipCustom>
        </ListItem>
    );
};

export default SidebarItem;
