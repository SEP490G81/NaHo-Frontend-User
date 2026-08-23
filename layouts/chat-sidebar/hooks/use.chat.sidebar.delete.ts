"use client";

import { useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { SpeakingSessionListItemResponse } from "@/types/responses/speaking.llm.response";
import { deleteSpeakingSession } from "@/services/client/speaking.service";
import { CHAT_NEW_ROUTE } from "../constants/chat.sidebar.constant";
import { isSessionActive } from "../utils/chat.sidebar.util";

export function useChatSidebarDelete() {
    const t = useTranslations("common.layout.chatroomSidebar");
    const router = useRouter();
    const pathname = usePathname();

    const [sessionToDelete, setSessionToDelete] =
        useState<SpeakingSessionListItemResponse | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const openDeleteDialog = (session: SpeakingSessionListItemResponse) => {
        setSessionToDelete(session);
    };

    const closeDeleteDialog = () => {
        if (isDeleting) return;
        setSessionToDelete(null);
    };

    const confirmDelete = async () => {
        if (!sessionToDelete) return;

        try {
            setIsDeleting(true);
            await deleteSpeakingSession(sessionToDelete.sessionCode);
            toast.success(t("deleteDialog.success"));

            const isCurrent = isSessionActive(
                sessionToDelete.sessionCode,
                pathname,
            );

            setSessionToDelete(null);

            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("refresh-chat-sessions"));
            }
            if (isCurrent) {
                router.push(CHAT_NEW_ROUTE);
            }
            router.refresh();
        } catch (error: any) {
            toast.error(error?.message || t("deleteDialog.error"));
        } finally {
            setIsDeleting(false);
        }
    };

    return {
        sessionToDelete,
        isDeleting,
        openDeleteDialog,
        closeDeleteDialog,
        confirmDelete,
    };
}
