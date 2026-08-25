import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TourState {
    /** Chủ tài khoản của tour đang chạy; đổi user → tắt tour cũ để không lẫn tài khoản. */
    userId: string | null;
    activeTourId: string | null;
    /** Đã trả lời câu hỏi "Bạn đã biết cách học chưa?" lúc mới vào web chưa. */
    hasSeenOnboardingPrompt: boolean;
    scopeToUser: (userId: string) => void;
    startTour: (tourId: string) => void;
    stopTour: () => void;
    markOnboardingPromptSeen: () => void;
}

export const useTourStore = create<TourState>()(
    persist(
        (set, get) => ({
            userId: null,
            activeTourId: null,
            hasSeenOnboardingPrompt: false,
            scopeToUser: (userId) => {
                if (get().userId === userId) return;
                set({ userId, activeTourId: null, hasSeenOnboardingPrompt: false });
            },
            startTour: (tourId) => set({ activeTourId: tourId }),
            stopTour: () => set({ activeTourId: null }),
            markOnboardingPromptSeen: () => set({ hasSeenOnboardingPrompt: true }),
        }),
        { name: "naho-tour-v1" },
    ),
);
