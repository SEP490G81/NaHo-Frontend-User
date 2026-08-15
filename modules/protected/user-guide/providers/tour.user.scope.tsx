"use client";
import { useEffect } from "react";
import { useTourStore } from "@/store/tourStore";

/**
 * Gắn danh sách tour đã xem với đúng tài khoản đang đăng nhập; đổi user → reset
 * để user mới cũng được xem. Đặt ở layout khu vực đã đăng nhập.
 */
export default function TourUserScope({ userId }: { userId: string }) {
    const scopeToUser = useTourStore((s) => s.scopeToUser);

    useEffect(() => {
        scopeToUser(userId);
    }, [userId, scopeToUser]);

    return null;
}
