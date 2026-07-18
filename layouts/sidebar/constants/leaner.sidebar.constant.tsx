import React from "react";
import {
    LayoutDashboard,
    Mic,
    History,
    Wand2,
    Library,
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
    icon: React.ComponentType<any>;
    disabled?: boolean;
    children?: SubNavItem[];
}

export const NAV_ITEMS: NavItem[] = [
    { title: "Trang chủ Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Các chủ đề luyện tập", url: "/topics", icon: Mic },
    {
        title: "Lịch sử",
        icon: History,
        children: [
            { title: "Lịch sử câu hỏi tự tạo", url: "/history-custom" },
            { title: "Lịch sử câu hỏi đã luyện", url: "/history" },
        ],
    },
    {
        title: "Đề chọn tự phát",
        url: "/custom-question",
        icon: Wand2,
        disabled: false,
    },
    {
        title: "Thư viện cộng đồng",
        url: "/community-library",
        icon: Library,
        disabled: false,
    },
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
    {
        title: "Cài đặt & Hồ sơ",
        url: "/dashboard",
        icon: UserCog,
        disabled: true,
    },
];

export const LABELS: Record<string, string> = {
    dashboard: "Trang chủ",
    topics: "Chủ đề Kaiwa",
    history: "Lịch sử câu hỏi đã luyện",
    "history-custom": "Lịch sử câu hỏi tự tạo",
    "custom-question": "Đề chọn tự phát",
    "community-library": "Thư viện cộng đồng",
    analytics: "Báo cáo tiến độ",
    leaderboard: "Bảng xếp hạng",
    profile: "Hồ sơ",
    notifications: "Thông báo",
    sandbox: "Phòng luyện",
};
