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

export interface NavItem {
    title: string;
    url: string;
    icon: React.ComponentType<any>;
    disabled?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    { title: "Trang chủ Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Duyệt chủ đề Kaiwa", url: "/topics", icon: Mic },
    { title: "Lịch sử luyện tập", url: "/history", icon: History },
    {
        title: "Đề chọn tự phát",
        url: "/custom-workspace",
        icon: Wand2,
        disabled: true,
    },
    {
        title: "Thư viện cộng đồng",
        url: "/community-library",
        icon: Library,
        disabled: true,
    },
    {
        title: "Trò chuyện tự do AI",
        url: "/dialogue-setup",
        icon: MessagesSquare,
        disabled: true,
    },
    {
        title: "Shadowing & Dictation",
        url: "/shadowing",
        icon: Headphones,
        disabled: true,
    },
    {
        title: "Báo cáo tiến độ",
        url: "/analytics",
        icon: LineChart,
        disabled: true,
    },
    {
        title: "Bảng xếp hạng thi đua",
        url: "/leaderboard",
        icon: Trophy,
        disabled: true,
    },
    {
        title: "Cài đặt & Hồ sơ",
        url: "/profile",
        icon: UserCog,
        disabled: true,
    },
];

export const LABELS: Record<string, string> = {
    dashboard: "Trang chủ",
    topics: "Chủ đề Kaiwa",
    history: "Lịch sử luyện tập",
    "custom-workspace": "Đề chọn tự phát",
    "community-library": "Thư viện cộng đồng",
    "dialogue-setup": "Trò chuyện tự do",
    analytics: "Báo cáo tiến độ",
    leaderboard: "Bảng xếp hạng",
    profile: "Hồ sơ",
    notifications: "Thông báo",
    sandbox: "Phòng luyện",
};
