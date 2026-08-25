"use client";
import { useRouter } from "@/i18n/navigation";
import { AllRoute } from "@/i18n/type";
import { useNavigationHistoryStore } from "@/store/navigationHistoryStore";

const SETTINGS_BACK_FALLBACK: AllRoute = "/dashboard";

/** Đưa user thoát hẳn khỏi khu vực settings, về đúng trang trước khi vào settings thay vì lùi qua từng tab sidebar. */
export function useSettingsBackNavigation() {
    const router = useRouter();
    const lastNonSettingsPath = useNavigationHistoryStore(
        (state) => state.lastNonSettingsPath,
    );

    return () => {
        router.push((lastNonSettingsPath ?? SETTINGS_BACK_FALLBACK) as AllRoute);
    };
}
