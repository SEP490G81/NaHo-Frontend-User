"use client";
import { useEffect } from "react";
import { useMarugotoStore } from "@/store/marugotoStore";

/**
 * Gắn tiến độ cục bộ (điểm/node đã học) với đúng tài khoản đang đăng nhập.
 * Khi user đổi (đăng nhập tài khoản khác trên cùng trình duyệt) thì xóa sạch dữ liệu
 * cũ để không lẫn giữa các tài khoản. Đặt ở layout khu vực đã đăng nhập.
 */
export default function MarugotoUserScope({ userId }: { userId: string }) {
    const scopeToUser = useMarugotoStore((s) => s.scopeToUser);
    useEffect(() => {
        scopeToUser(userId);
    }, [userId, scopeToUser]);
    return null;
}
