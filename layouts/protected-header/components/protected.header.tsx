"use client";
import React from "react";
import { Link, usePathname } from "@/intl/i18n/navigation";
import { useTranslations } from "next-intl";
import NotificationButton from "@/layouts/protected-header/features/notification.button";
import LanguageSwitch from "@/components/ui/language.switch";
import ThemeSwitchButton from "@/layouts/public-header/components/theme.switch.button";
import UserAvatar from "@/layouts/protected-header/components/user.avatar";
import { Breadcrumbs, IconButton, Typography } from "@mui/material";
import { useUiStore } from "@/store/uiStore";
import { LABELS } from "@/layouts/sidebar/constants/leaner.sidebar.constant";
import { ChevronRight, Flame, MenuIcon } from "lucide-react";
import { currentLearner } from "@/data/mockLearnerDashboard";


function prettify(seg: string) {
    return LABELS[seg] ?? decodeURIComponent(seg).replace(/-/g, " ");
}


const ProtectedHeader = () => {
    const t = useTranslations();
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const toggleSidebar = useUiStore((state) => state.toggleSidebar);
    return (
        <div className="border-b-bdc-primary bg-bgc-app sticky top-0 left-0 z-10 flex items-center justify-between border-b px-3 py-3.5">

            {/* Left */}
            <div className="flex items-center justify-start z-10 min-w-0">
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
                    className="hidden md:block"
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
            </div>

            {/* Center streak */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-full bg-bgc-highlight px-3 py-1 text-xs md:text-sm font-semibold text-text-pure shadow-sm transition hover:opacity-90"
                >
                    <Flame className="h-3.5 w-3.5 md:h-4 md:w-4 fill-current text-text-pure" />
                    <span>{currentLearner.streakDays} ngày liên tiếp! 🔥</span>
                </Link>
            </div>

            {/* Right */}
            <div className="flex items-center gap-x-3 z-10">
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
