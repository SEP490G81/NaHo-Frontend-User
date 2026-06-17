"use client";
import React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import NotificationButton from "@/layouts/protected-header/features/notification.button";
import LanguageSwitch from "@/components/ui/language.switch";
import ThemeSwitchButton from "@/layouts/public-header/components/theme.switch.button";
import UserAvatar from "@/layouts/protected-header/components/user.avatar";
import { Breadcrumbs, IconButton, Typography } from "@mui/material";
import { useUiStore } from "@/store/uiStore";
import { LABELS } from "@/layouts/sidebar/constants/leaner.sidebar.constant";
import { ChevronRight, Flame, MenuIcon } from "lucide-react";
import { currentLearner } from "@/data/mockLearnerDashboard";
import { AllRoute } from "@/i18n/type";
import HeaderDecoration from "./header-decoration";

function prettify(seg: string) {
    return LABELS[seg] ?? decodeURIComponent(seg).replace(/-/g, " ");
}

const ProtectedHeader = () => {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    const toggleSidebar = useUiStore(
        (state: { toggleSidebar: any }) => state.toggleSidebar,
    );

    return (
        <div className="border-b-bdc-primary bg-bgc-app sticky top-0 left-0 z-10 flex items-center justify-between border-b px-3 py-3.5 overflow-hidden">
            <HeaderDecoration />

            {/* Left */}
            <div className="z-10 flex min-w-0 items-center justify-start">
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
                    separator={
                        <ChevronRight className="text-text-muted h-3 w-3" />
                    }
                    aria-label="breadcrumb"
                    className="hidden md:block"
                >
                    {segments.map((seg, i) => {
                        const isLast = i === segments.length - 1;
                        const path = "/" + segments.slice(0, i + 1).join("/");
                        if (isLast) {
                            return (
                                <Typography
                                    key={i}
                                    className="text-text-contrast text-sm font-semibold capitalize"
                                >
                                    {prettify(seg)}
                                </Typography>
                            );
                        }
                        return (
                            <Link key={i} href={path as AllRoute}>
                                <span className="text-text-muted hover:text-bgc-highlight text-sm font-medium capitalize transition-colors">
                                    {prettify(seg)}
                                </span>
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            </div>

            {/* Center streak */}
            <div className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
                <Link
                    href="/dashboard"
                    className="bg-bgc-highlight text-text-pure inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold shadow-sm transition hover:opacity-90 md:text-sm"
                >
                    <Flame className="text-text-pure h-3.5 w-3.5 fill-current md:h-4 md:w-4" />
                    <span>{currentLearner.streakDays} ngày liên tiếp! 🔥</span>
                </Link>
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
            </div>
        </div>
    );
};

export default ProtectedHeader;
