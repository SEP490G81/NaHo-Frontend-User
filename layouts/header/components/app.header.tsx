"use client";
import React, { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/intl/i18n/navigation";
import { Breadcrumbs, Typography, Box, Avatar, Menu, MenuItem, Button } from "@mui/material";
import { Flame, User as UserIcon, ChevronRight, Menu as MenuIcon } from "lucide-react";
import { IconButton } from "@mui/material";
import { useUiStore } from "@/store/uiStore";
import { currentLearner } from "@/data/mockLearnerDashboard";
import ThemeSwitchButton from "@/layouts/header/components/theme.switch.button";
import NotificationButton from "@/layouts/header/features/notification.button";
import UserAvatar from "./user.avatar";
import { LABELS } from "@/layouts/sidebar/constants/leaner.sidebar.constant";


function prettify(seg: string) {
    return LABELS[seg] ?? decodeURIComponent(seg).replace(/-/g, " ");
}

const AppHeader = () => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const toggleSidebar = useUiStore((state) => state.toggleSidebar);

    return (
        <header className="sticky top-0 z-20 flex h-16 items-center border-b border-bdc-primary bg-bgc-app/95 px-4 backdrop-blur md:px-6">
            {/* Mobile Menu Button */}
            <IconButton
                onClick={toggleSidebar}
                sx={{
                    display: { xs: "inline-flex", md: "none" },
                    marginRight: "8px",
                    color: "var(--color-text-contrast)",
                    "&:hover": { backgroundColor: "var(--color-hbgc-app)" },
                }}
            >
                <MenuIcon className="h-6 w-6" />
            </IconButton>

            {/* Breadcrumb */}
            <Breadcrumbs
                separator={<ChevronRight className="h-3 w-3 text-text-muted" />}
                aria-label="breadcrumb"
                className="hidden md:block flex-1"
            >
                <Link href="/dashboard">
                    <span className="text-sm font-semibold text-text-contrast hover:text-bgc-highlight transition-colors">
                        NAHO
                    </span>
                </Link>
                {segments.map((seg, i) => {
                    const isLast = i === segments.length - 1;
                    const path = "/" + segments.slice(0, i + 1).join("/");
                    if (isLast) {
                        return (
                            <Typography key={i} className="text-sm font-semibold capitalize text-text-contrast">
                                {prettify(seg)}
                            </Typography>
                        );
                    }
                    return (
                        <Link key={i} href={path as any}>
                            <span className="text-sm font-medium capitalize text-text-muted hover:text-bgc-highlight transition-colors">
                                {prettify(seg)}
                            </span>
                        </Link>
                    );
                })}
            </Breadcrumbs>

            {/* Mobile spacing */}
            <div className="flex-1 md:hidden" />

            {/* Center streak */}
            <div className="mx-auto hidden md:block">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-full bg-bgc-highlight px-4 py-1 text-sm font-semibold text-text-pure shadow-sm transition hover:opacity-90"
                >
                    <Flame className="h-4 w-4 fill-current text-text-pure" />
                    <span>{currentLearner.streakDays} ngày liên tiếp! 🔥</span>
                </Link>
            </div>

            <div className="flex-1 md:hidden" />

            {/* Right cluster */}
            <div className="flex items-center gap-x-2">
                {/* Notification */}
                <NotificationButton />

                {/* Theme Switch */}
                <ThemeSwitchButton />

                <UserAvatar />
            </div>
        </header>
    );
};

export default AppHeader;
