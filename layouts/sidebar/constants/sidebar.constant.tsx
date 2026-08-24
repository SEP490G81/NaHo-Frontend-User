import React from "react";
import { LayoutDashboard, MessagesSquare, Mic, Trophy } from "lucide-react";

export interface SubNavItem {
    title: string;
    titleKey?: string;
    url: string;
}

export interface NavItem {
    title: string;
    titleKey?: string;
    url?: string;
    icon: React.ComponentType<{ className?: string }>;
    disabled?: boolean;
    children?: SubNavItem[];
}

export const NAV_ITEMS: NavItem[] = [
    {
        title: "Trang chủ",
        titleKey: "home",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Lộ trình Kaiwa",
        titleKey: "kaiwaPath",
        url: "/books",
        icon: Mic,
    },
    {
        title: "Trò chuyện tự do AI",
        titleKey: "freeDialogue",
        url: "/persona-setup",
        icon: MessagesSquare,
        disabled: false,
    },
    {
        title: "Bảng xếp hạng thi đua",
        titleKey: "leaderboard",
        url: "/leaderboard",
        icon: Trophy,
        disabled: false,
    },
];
