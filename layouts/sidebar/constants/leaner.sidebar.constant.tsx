import React from "react";
import {
    LayoutDashboard,
    Mic,
    History,
    MessagesSquare,
    Headphones,
    LineChart,
    Trophy,
    UserCog,
} from "lucide-react";

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
    { title: "Lịch sử luyện tập", url: "/history", icon: History },
    {
        title: "Trò chuyện tự do AI",
        url: "/dialogue-setup",
        icon: MessagesSquare,
        disabled: false,
    },
    {
        title: "Shadowing & Dictation",
        url: "/dashboard",
        icon: Headphones,
        disabled: true,
    },
    {
        title: "Báo cáo tiến độ",
        url: "/dashboard",
        icon: LineChart,
        disabled: true,
    },
    {
        title: "Bảng xếp hạng thi đua",
        url: "/leaderboard",
        icon: Trophy,
        disabled: false,
    },
];

export const LABELS: Record<string, string> = {
    dashboard: "Trang chủ",
    topics: "Lộ trình Kaiwa",
    books: "Lộ trình Kaiwa",
    learn: "Bài học",
    history: "Lịch sử luyện tập",
    analytics: "Báo cáo tiến độ",
    leaderboard: "Bảng xếp hạng",
    profile: "Hồ sơ",
    notifications: "Thông báo",
    sandbox: "Phòng luyện",
};
