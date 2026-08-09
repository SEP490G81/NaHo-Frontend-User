"use client";

import React from "react";
import { useCurrentUser } from "@/hooks/use.current.user";
import { useAuthStore } from "@/store/authStore";
import { PinnedTopic, useUiStore } from "@/store/uiStore";

export function usePinnedTopics() {
    const { data: user } = useCurrentUser();
    const { userEmail } = useAuthStore();

    // Derive a unique key for the current account session
    const userKey = user?.id
        ? `user_${user.id}`
        : userEmail
          ? `email_${userEmail}`
          : "guest";

    const pinnedTopicsByUser = useUiStore((state) => state.pinnedTopicsByUser);
    const legacyPinnedTopics = useUiStore((state) => state.pinnedTopics);

    const pinTopicForUser = useUiStore((state) => state.pinTopicForUser);
    const unpinTopicForUser = useUiStore((state) => state.unpinTopicForUser);
    const togglePinTopicForUser = useUiStore(
        (state) => state.togglePinTopicForUser,
    );

    // If user list exists in userKey, return it. If guest, or legacy fallback:
    const userPinnedList = pinnedTopicsByUser?.[userKey];
    const pinnedTopics: PinnedTopic[] = React.useMemo(() => {
        if (userPinnedList !== undefined) {
            return userPinnedList;
        }
        // Fallback for guest or legacy
        if (userKey === "guest") {
            return legacyPinnedTopics || [];
        }
        // If logged-in user doesn't have an entry yet, default to empty
        return [];
    }, [userPinnedList, userKey, legacyPinnedTopics]);

    const pinTopic = React.useCallback(
        (topic: PinnedTopic) => {
            pinTopicForUser(topic, userKey);
        },
        [pinTopicForUser, userKey],
    );

    const unpinTopic = React.useCallback(
        (id: string) => {
            unpinTopicForUser(id, userKey);
        },
        [unpinTopicForUser, userKey],
    );

    const togglePinTopic = React.useCallback(
        (topic: PinnedTopic) => {
            togglePinTopicForUser(topic, userKey);
        },
        [togglePinTopicForUser, userKey],
    );

    const isTopicPinned = React.useCallback(
        (id: string) => {
            return pinnedTopics.some((t) => t.id === id);
        },
        [pinnedTopics],
    );

    return {
        userKey,
        pinnedTopics,
        pinTopic,
        unpinTopic,
        togglePinTopic,
        isTopicPinned,
    };
}
