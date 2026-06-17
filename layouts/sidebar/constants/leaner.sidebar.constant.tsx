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
        url: "/dashboard",
        icon: MessagesSquare,
        disabled: false,
    },
    {
        title: "Shadowing & Dictation",
        url: "/dashboard",
        icon: Headphones,
        disabled: false,
    },
    {
        title: "Báo cáo tiến độ",
        url: "/dashboard",
        icon: LineChart,
        disabled: false,
    },
    {
        title: "Bảng xếp hạng thi đua",
        url: "/dashboard",
        icon: Trophy,
        disabled: false,
    },
    {
        title: "Cài đặt & Hồ sơ",
        url: "/dashboard",
        icon: UserCog,
        disabled: false,
    },
];

export const LABELS: Record<string, string> = {
    dashboard: "Trang chủ",
    topics: "Chủ đề Kaiwa",
    history: "Lịch sử luyện tập",
    "custom-question": "Đề chọn tự phát",
    "community-library": "Thư viện cộng đồng",
    analytics: "Báo cáo tiến độ",
    leaderboard: "Bảng xếp hạng",
    profile: "Hồ sơ",
    notifications: "Thông báo",
    sandbox: "Phòng luyện",
};
