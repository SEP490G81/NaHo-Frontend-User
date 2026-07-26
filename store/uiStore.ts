import { create } from "zustand";

interface UiState {
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
    toggleSidebarCollapse: () => void;
    closeSidebar: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    isSidebarOpen: false,
    isSidebarCollapsed: false,
    toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    toggleSidebarCollapse: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    closeSidebar: () => set({ isSidebarOpen: false }),
}));
