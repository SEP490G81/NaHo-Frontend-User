"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { Box, Drawer } from "@mui/material";
import { cn } from "@/libs/utils";
import { useUiStore } from "@/store/uiStore";
import UserAvatar from "@/layouts/sidebar/components/user.avatar";
import { SpeakingSessionListItemResponse } from "@/types/responses/speaking.llm.response";
import { getSpeakingSessionsByStatus } from "@/services/client/speaking.llm.service";
import { ChatSidebarProps } from "../types/chat.sidebar.type";
import {
    CHAT_DRAWER_COLLAPSED_WIDTH,
    CHAT_DRAWER_WIDTH,
} from "../constants/chat.sidebar.constant";
import { useChatSidebarDelete } from "../hooks/use.chat.sidebar.delete";
import ChatSidebarLogo from "./chat.sidebar.logo";
import ChatSidebarNewButton from "./chat.sidebar.new.button";
import ChatSidebarSessionList from "../features/chat.sidebar.session.list";
import ChatSidebarCollapsedNav from "../features/chat.sidebar.collapsed.nav";
import ChatSidebarDeleteDialog from "../features/chat.sidebar.delete.dialog";

export function ChatSidebar({
    inProgressSessions = [],
    completedProgressSessions = [],
}: ChatSidebarProps) {
    const pathname = usePathname();
    const { isSidebarOpen, isSidebarCollapsed, closeSidebar } = useUiStore();
    const {
        sessionToDelete,
        isDeleting,
        openDeleteDialog,
        closeDeleteDialog,
        confirmDelete,
    } = useChatSidebarDelete();

    const [inProgressList, setInProgressList] =
        useState<SpeakingSessionListItemResponse[]>(inProgressSessions);
    const [completedList, setCompletedList] =
        useState<SpeakingSessionListItemResponse[]>(completedProgressSessions);

    // Sync initial props when layout re-renders
    useEffect(() => {
        if (inProgressSessions.length > 0) setInProgressList(inProgressSessions);
        if (completedProgressSessions.length > 0) setCompletedList(completedProgressSessions);
    }, [inProgressSessions, completedProgressSessions]);

    // Client-side dynamic refresh for real-time sidebar session updates
    const refreshSessions = useCallback(async () => {
        try {
            const [inProg, comp] = await Promise.all([
                getSpeakingSessionsByStatus("IN_PROGRESS"),
                getSpeakingSessionsByStatus("COMPLETED"),
            ]);
            setInProgressList(inProg);
            setCompletedList(comp);
        } catch {
            // ignore fetch errors
        }
    }, []);

    useEffect(() => {
        refreshSessions();

        const handleRefresh = () => {
            refreshSessions();
        };

        if (typeof window !== "undefined") {
            window.addEventListener("refresh-chat-sessions", handleRefresh);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("refresh-chat-sessions", handleRefresh);
            }
        };
    }, [pathname, refreshSessions]);

    const renderDrawerContent = (isCollapsed: boolean) => (
        <div className="flex h-full flex-col justify-between overflow-hidden">
            {/* Header: logo */}
            <div
                className={cn(
                    "border-bdc-primary flex min-h-16.5 shrink-0 items-center justify-center border-b py-3.5",
                    isCollapsed ? "px-2" : "px-4",
                )}
            >
                <ChatSidebarLogo isCollapsed={isCollapsed} />
            </div>

            {/* Main Content Area */}
            {isCollapsed ? (
                <div className="flex flex-1 flex-col overflow-y-auto">
                    <ChatSidebarCollapsedNav
                        inProgressSessions={inProgressList}
                        completedProgressSessions={completedList}
                        currentPathname={pathname}
                        onSessionClick={closeSidebar}
                        onDeleteClick={openDeleteDialog}
                    />
                </div>
            ) : (
                <Box className="flex flex-1 flex-col overflow-hidden">
                    {/* Fixed New Chat Button */}
                    <div className="shrink-0 p-3 pb-1">
                        <ChatSidebarNewButton onClick={closeSidebar} />
                    </div>

                    {/* Scrollable Sessions List */}
                    <div className="flex-1 overflow-y-auto">
                        <ChatSidebarSessionList
                            inProgressSessions={inProgressList}
                            completedProgressSessions={completedList}
                            currentPathname={pathname}
                            onSessionClick={closeSidebar}
                            onDeleteSession={openDeleteDialog}
                        />
                    </div>
                </Box>
            )}

            {/* User Avatar Footer */}
            <div className="border-bdc-primary shrink-0 border-t">
                <UserAvatar isCollapsed={isCollapsed} />
            </div>
        </div>
    );

    return (
        <>
            <Box
                component="nav"
                sx={{
                    width: {
                        md: isSidebarCollapsed
                            ? CHAT_DRAWER_COLLAPSED_WIDTH
                            : CHAT_DRAWER_WIDTH,
                    },
                    flexShrink: { md: 0 },
                    transition: "width 0.2s ease-in-out",
                }}
            >
                {/* Mobile Temporary Drawer */}
                <Drawer
                    variant="temporary"
                    open={isSidebarOpen}
                    onClose={closeSidebar}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            width: CHAT_DRAWER_WIDTH,
                            boxSizing: "border-box",
                            backgroundColor: "var(--color-bgc-app)",
                            borderRight: "1px solid var(--color-bdc-primary)",
                        },
                    }}
                >
                    {renderDrawerContent(false)}
                </Drawer>

                {/* Desktop Permanent Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", md: "block" },
                        "& .MuiDrawer-paper": {
                            width: isSidebarCollapsed
                                ? CHAT_DRAWER_COLLAPSED_WIDTH
                                : CHAT_DRAWER_WIDTH,
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

            {/* Dialog xác nhận xóa session */}
            <ChatSidebarDeleteDialog
                open={Boolean(sessionToDelete)}
                session={sessionToDelete}
                isDeleting={isDeleting}
                onConfirm={confirmDelete}
                onClose={closeDeleteDialog}
            />
        </>
    );
}

export default ChatSidebar;
