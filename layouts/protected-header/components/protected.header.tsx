"use client";
import React from "react";
import NotificationButton from "@/layouts/protected-header/features/notification.button";
import LanguageSwitch from "@/components/ui/language.switch";
import ThemeSwitchButton from "@/layouts/public-header/components/theme.switch.button";
import UserAvatar from "@/layouts/protected-header/components/user.avatar";
import { IconButton } from "@mui/material";
import { useUiStore } from "@/store/uiStore";
import { MenuIcon, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { TooltipCustom } from "@/components/ui/mui-custom/tooltip.custom";
import HeaderDecoration from "./header-decoration";
import { ReportModal } from "@/modules/protected/report/features/report-modal";

const ProtectedHeader = () => {
    const { toggleSidebar, toggleSidebarCollapse, isSidebarCollapsed } =
        useUiStore();

    return (
        <div className="border-b-bdc-primary bg-bgc-app sticky top-0 left-0 z-10 flex items-center justify-between border-b px-3 py-3.5 overflow-hidden">
            <HeaderDecoration />

            {/* Left: collapse toggle (desktop) + mobile menu button */}
            <div className="z-10 flex min-w-0 items-center justify-start gap-1">
                <TooltipCustom
                    title={isSidebarCollapsed ? "Mở rộng" : "Thu gọn"}
                    placement="bottom"
                >
                    <IconButton
                        onClick={toggleSidebarCollapse}
                        sx={{
                            display: { xs: "none", md: "inline-flex" },
                            color: "var(--color-text-contrast)",
                            "&:hover": {
                                backgroundColor: "var(--color-hbgc-app)",
                            },
                        }}
                    >
                        {isSidebarCollapsed ? (
                            <PanelLeftOpen className="h-5 w-5" />
                        ) : (
                            <PanelLeftClose className="h-5 w-5" />
                        )}
                    </IconButton>
                </TooltipCustom>

                <IconButton
                    onClick={toggleSidebar}
                    sx={{
                        display: { xs: "inline-flex", md: "none" },
                        color: "var(--color-text-contrast)",
                        "&:hover": { backgroundColor: "var(--color-hbgc-app)" },
                    }}
                >
                    <MenuIcon className="h-6 w-6" />
                </IconButton>
            </div>

            {/* Right */}
            <div className="z-10 flex items-center gap-x-3">
                <NotificationButton />
                <LanguageSwitch
                    variant="icon-button"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                    }}
                />
                <ThemeSwitchButton />
                <UserAvatar />
                <ReportModal />
            </div>
        </div>
    );
};

export default ProtectedHeader;
