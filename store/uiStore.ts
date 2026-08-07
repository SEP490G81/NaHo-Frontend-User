import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PinnedTopic {
    id: string;
    bookId: string;
    topicId: string;
    title: string;
    url: string;
}

interface UiState {
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;
    pinnedTopics: PinnedTopic[];
    toggleSidebar: () => void;
    toggleSidebarCollapse: () => void;
    closeSidebar: () => void;
    pinTopic: (topic: PinnedTopic) => void;
    unpinTopic: (id: string) => void;
    togglePinTopic: (topic: PinnedTopic) => void;
    isTopicPinned: (id: string) => boolean;
}

export const useUiStore = create<UiState>()(
    persist(
        (set, get) => ({
            isSidebarOpen: false,
            isSidebarCollapsed: false,
            pinnedTopics: [],
            toggleSidebar: () =>
                set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            toggleSidebarCollapse: () =>
                set((state) => ({
                    isSidebarCollapsed: !state.isSidebarCollapsed,
                })),
            closeSidebar: () => set({ isSidebarOpen: false }),
            pinTopic: (topic) =>
                set((state) => {
                    const filtered = state.pinnedTopics.filter(
                        (t) => t.id !== topic.id,
                    );
                    const updated =
                        filtered.length >= 3
                            ? [...filtered.slice(1), topic]
                            : [...filtered, topic];
                    return { pinnedTopics: updated };
                }),
            unpinTopic: (id) =>
                set((state) => ({
                    pinnedTopics: state.pinnedTopics.filter((t) => t.id !== id),
                })),
            togglePinTopic: (topic) => {
                const isPinned = get().pinnedTopics.some(
                    (t) => t.id === topic.id,
                );
                if (isPinned) {
                    get().unpinTopic(topic.id);
                } else {
                    get().pinTopic(topic);
                }
            },
            isTopicPinned: (id) =>
                get().pinnedTopics.some((t) => t.id === id),
        }),
        {
            name: "naho-ui-store",
            partialize: (state) => ({
                isSidebarCollapsed: state.isSidebarCollapsed,
                pinnedTopics: state.pinnedTopics,
            }),
        },
    ),
);
