import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TourState {
    /** Chủ tài khoản của tour đang chạy; đổi user → tắt tour cũ để không lẫn tài khoản. */
    userId: string | null;
    activeTourId: string | null;
    scopeToUser: (userId: string) => void;
    startTour: (tourId: string) => void;
    stopTour: () => void;
}

export const useTourStore = create<TourState>()(
    persist(
        (set, get) => ({
            userId: null,
            activeTourId: null,
            scopeToUser: (userId) => {
                if (get().userId === userId) return;
                set({ userId, activeTourId: null });
            },
            startTour: (tourId) => set({ activeTourId: tourId }),
            stopTour: () => set({ activeTourId: null }),
        }),
        { name: "naho-tour-v1" },
    ),
);
