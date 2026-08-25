import { create } from "zustand";

interface NavigationHistoryState {
    /** Path gần nhất KHÔNG thuộc /settings mà user đã ghé, dùng để nút "Quay lại" trong settings biết thoát về đâu. */
    lastNonSettingsPath: string | null;
    setLastNonSettingsPath: (path: string) => void;
}

export const useNavigationHistoryStore = create<NavigationHistoryState>(
    (set) => ({
        lastNonSettingsPath: null,
        setLastNonSettingsPath: (path) => set({ lastNonSettingsPath: path }),
    }),
);
