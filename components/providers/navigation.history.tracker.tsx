"use client";
import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";
import { useNavigationHistoryStore } from "@/store/navigationHistoryStore";

/** Ghi lại path gần nhất ngoài /settings để nút "Quay lại" trong settings thoát đúng trang trước đó thay vì lùi qua từng tab sidebar. */
const NavigationHistoryTracker = () => {
    const pathname = usePathname();
    const setLastNonSettingsPath = useNavigationHistoryStore(
        (state) => state.setLastNonSettingsPath,
    );

    useEffect(() => {
        if (!pathname.startsWith("/settings")) {
            setLastNonSettingsPath(pathname);
        }
    }, [pathname, setLastNonSettingsPath]);

    return null;
};

export default NavigationHistoryTracker;
