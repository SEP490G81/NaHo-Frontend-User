import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PinnedTopic {
    id: string;
    bookId: string;
    topicId: string;
    title: string;
    url: string;
    bookTitle?: string;
    bookLevel?: string;
    bookCoverImage?: string;
    bookCoverColor?: string;
    topicOrder?: number;
    topicTitle?: string;
    topicFuriganaMarkup?: string;
    topicEnTitle?: string;
    topicDescription?: string;
}

interface UiState {
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;
    pinnedTopicsByUser: Record<string, PinnedTopic[]>;
    pinnedTopics: PinnedTopic[];
    toggleSidebar: () => void;
    toggleSidebarCollapse: () => void;
    closeSidebar: () => void;
    pinTopicForUser: (topic: PinnedTopic, userKey: string) => void;
    unpinTopicForUser: (id: string, userKey: string) => void;
    togglePinTopicForUser: (topic: PinnedTopic, userKey: string) => void;
    getPinnedTopicsForUser: (userKey: string) => PinnedTopic[];
    isTopicPinnedForUser: (id: string, userKey: string) => boolean;
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
            pinnedTopicsByUser: {},
            pinnedTopics: [],
            toggleSidebar: () =>
                set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            toggleSidebarCollapse: () =>
                set((state) => ({
                    isSidebarCollapsed: !state.isSidebarCollapsed,
                })),
            closeSidebar: () => set({ isSidebarOpen: false }),
            pinTopicForUser: (topic, userKey) =>
                set((state) => {
                    const currentList = state.pinnedTopicsByUser[userKey] || [];
                    const filtered = currentList.filter(
                        (t) => t.id !== topic.id,
                    );
                    const updated =
                        filtered.length >= 3
                            ? [...filtered.slice(1), topic]
                            : [...filtered, topic];
                    return {
                        pinnedTopicsByUser: {
                            ...state.pinnedTopicsByUser,
                            [userKey]: updated,
                        },
                    };
                }),
            unpinTopicForUser: (id, userKey) =>
                set((state) => {
                    const currentList = state.pinnedTopicsByUser[userKey] || [];
                    return {
                        pinnedTopicsByUser: {
                            ...state.pinnedTopicsByUser,
                            [userKey]: currentList.filter((t) => t.id !== id),
                        },
                    };
                }),
            togglePinTopicForUser: (topic, userKey) => {
                const list = get().pinnedTopicsByUser[userKey] || [];
                const isPinned = list.some((t) => t.id === topic.id);
                if (isPinned) {
                    get().unpinTopicForUser(topic.id, userKey);
                } else {
                    get().pinTopicForUser(topic, userKey);
                }
            },
            getPinnedTopicsForUser: (userKey) => {
                return get().pinnedTopicsByUser[userKey] || [];
            },
            isTopicPinnedForUser: (id, userKey) => {
                const list = get().pinnedTopicsByUser[userKey] || [];
                return list.some((t) => t.id === id);
            },
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
            isTopicPinned: (id) => get().pinnedTopics.some((t) => t.id === id),
        }),
        {
            name: "naho-ui-store",
            partialize: (state) => ({
                isSidebarCollapsed: state.isSidebarCollapsed,
                pinnedTopicsByUser: state.pinnedTopicsByUser,
                pinnedTopics: state.pinnedTopics,
            }),
        },
    ),
);
