"use client";

import React from "react";
import { Box, Drawer } from "@mui/material";
import { cn } from "@/libs/utils";
import { useUiStore } from "@/store/uiStore";
import {
    CHATROOM_COLLAPSED_WIDTH,
    CHATROOM_DRAWER_WIDTH,
} from "../constants/chatroom.sidebar.constant";
import ChatroomNewChatButton from "./chatroom.new.chat.button";
import ChatroomUserAvatar from "./chatroom.user.avatar";
import ChatroomCompletedSection from "../features/chatroom.completed.section";
import ChatroomInProgressSection from "../features/chatroom.in.progress.section";
import SidebarLogoButton from "@/layouts/sidebar/components/sidebar.logo.button";

export function ChatroomSidebar() {
    const { isSidebarOpen, isSidebarCollapsed, closeSidebar } = useUiStore();

    const renderDrawerContent = (collapsed: boolean) => (
        <div className="flex h-full flex-col justify-between overflow-hidden">
            {/* Top Fixed Area: Logo + New Chat Button */}
            <div className="shrink-0">
                <div
                    className={cn(
                        "border-bdc-primary flex min-h-16.5 shrink-0 items-center justify-center border-b py-3.5",
                        collapsed ? "px-2" : "px-4",
                    )}
                >
                    <SidebarLogoButton>
                        {!collapsed && (
                            <h1 className="text-text-contrast text-xl font-bold tracking-wider">
                                NaHo
                            </h1>
                        )}
                    </SidebarLogoButton>
                </div>

                <ChatroomNewChatButton
                    isCollapsed={collapsed}
                    onClick={closeSidebar}
                />
            </div>

            {/* Scrollable Center Area */}
            <Box className="flex-1 overflow-y-auto px-1.5 py-2">
                <div className="space-y-4">
                    {/* Section 1: Đã hoàn thành */}
                    <ChatroomCompletedSection
                        isCollapsed={collapsed}
                        onItemClick={closeSidebar}
                    />

                    {/* Section 2: Đoạn chat */}
                    <ChatroomInProgressSection
                        isCollapsed={collapsed}
                        onItemClick={closeSidebar}
                    />
                </div>
            </Box>

            {/* Bottom Fixed Area: User Avatar */}
            <ChatroomUserAvatar isCollapsed={collapsed} />
        </div>
    );

    return (
        <Box
            component="nav"
            sx={{
                width: {
                    md: isSidebarCollapsed
                        ? CHATROOM_COLLAPSED_WIDTH
                        : CHATROOM_DRAWER_WIDTH,
                },
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
                        width: CHATROOM_DRAWER_WIDTH,
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
                        width: isSidebarCollapsed
                            ? CHATROOM_COLLAPSED_WIDTH
                            : CHATROOM_DRAWER_WIDTH,
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

export default ChatroomSidebar;
