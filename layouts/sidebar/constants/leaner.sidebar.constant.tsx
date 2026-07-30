import React from "react";
import { LayoutDashboard, MessagesSquare, Mic, Trophy } from "lucide-react";

export interface SubNavItem {
    title: string;
    url: string;
}

export interface NavItem {
    title: string;
    url?: string;
    icon: React.ComponentType<{ className?: string }>;
    disabled?: boolean;
    children?: SubNavItem[];
}

export const NAV_ITEMS: NavItem[] = [
    { title: "Trang chủ", url: "/dashboard", icon: LayoutDashboard },
    { title: "Lộ trình Kaiwa", url: "/books", icon: Mic },
    {
        title: "Trò chuyện tự do AI",
        url: "/dialogue-setup",
        icon: MessagesSquare,
        disabled: false,
    },
    // {
    //     title: "Shadowing & Dictation",
    //     url: "/dashboard",
    //     icon: Headphones,
    //     disabled: true,
    // },
    {
        title: "Bảng xếp hạng thi đua",
        url: "/leaderboard",
        icon: Trophy,
        disabled: false,
    },
];
