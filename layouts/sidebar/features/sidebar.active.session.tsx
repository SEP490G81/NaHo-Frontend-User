"use client";

import React, { useMemo, useState } from "react";
import { Divider } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useChatStore } from "@/store/chatStore";
import {
    COMPANIONS,
    resolveCompanions,
} from "@/modules/protected/live-chatroom/constants/live-chatroom.constant";
import { getInProgressSessions } from "@/services/client/speaking.llm.service";
import {
    deleteSpeakingSession,
    getPersonas,
} from "@/services/client/speaking.service";
import type { SpeakingSessionResponse } from "@/types/responses/speaking.llm.response";
import SidebarActiveSessionItem from "../components/sidebar.active.session.item";
import SidebarDeleteSessionDialog from "../components/sidebar.delete.session.dialog";

interface SidebarActiveSessionProps {
    isCollapsed: boolean;
    onCloseSidebar?: () => void;
}

export function SidebarActiveSession({
    isCollapsed,
    onCloseSidebar,
}: Readonly<SidebarActiveSessionProps>) {
    const t = useTranslations("marugoto.path");
    const router = useRouter();
    const pathname = usePathname();
    const queryClient = useQueryClient();
    const setConfig = useChatStore((s) => s.setConfig);
    const setSession = useChatStore((s) => s.setSession);

    const [deletingSessionCode, setDeletingSessionCode] = useState<string | null>(null);

    // 1. Lấy danh sách các phiên hội thoại đang dở (IN_PROGRESS)
    const { data: inProgressSessions } = useQuery<SpeakingSessionResponse[]>({
        queryKey: ["in-progress-speaking-sessions"],
        queryFn: getInProgressSessions,
        staleTime: 30 * 1000,
    });

    // 2. Lấy danh sách personas để dựng companions
    const { data: personas } = useQuery({
        queryKey: ["personas"],
        queryFn: getPersonas,
        staleTime: 5 * 60 * 1000,
    });

    const companions = useMemo(
        () => (personas?.length ? resolveCompanions(personas) : COMPANIONS),
        [personas],
    );

    // 3. Mutation xóa phiên đang dở
    const deleteMutation = useMutation({
        mutationFn: (sessionCode: string) =>
            deleteSpeakingSession(sessionCode),
        onSuccess: (_data, deletedSessionCode) => {
            toast.success(t("deleteSessionSuccess"));
            setDeletingSessionCode(null);
            queryClient.invalidateQueries({
                queryKey: ["in-progress-speaking-sessions"],
            });

            // Nếu người dùng đang ở phòng chat của phiên bị xóa -> đá về trang thiết lập
            const isCurrentChatSession =
                pathname === `/live-chatroom/${deletedSessionCode}` ||
                pathname.startsWith(`/live-chatroom/${deletedSessionCode}/`);

            if (isCurrentChatSession) {
                useChatStore.getState().reset();
                router.replace("/dialogue-setup");
            }
        },
        onError: (err) => {
            toast.error(
                err instanceof Error ? err.message : t("deleteSessionError"),
            );
        },
    });

    if (!inProgressSessions || inProgressSessions.length === 0) return null;

    const handleResume = (session: SpeakingSessionResponse) => {
        onCloseSidebar?.();
        const comp =
            companions.find((c) => c.personaId === session.personaId) ??
            COMPANIONS[0];

        setConfig({
            companionId: comp.id,
            conversationStyle: session.formalityLevel ?? "NEUTRAL",
            marugotoLevel: session.marugotoLevel ?? "STARTER_A1",
            voiceSpeed: 1,
            showHints: true,
        });

        setSession({
            sessionCode: session.sessionCode,
            personaId: session.personaId,
            companionId: comp.id,
            aiGreeting: "",
        });

        router.push(`/live-chatroom/${session.sessionCode}`);
    };

    const handleDeleteConfirm = () => {
        if (deletingSessionCode) {
            deleteMutation.mutate(deletingSessionCode);
        }
    };

    return (
        <div className="mt-4">
            {/* Divider + Tiêu đề section */}
            {!isCollapsed ? (
                <div className="my-3 flex items-center gap-2 px-3">
                    <span className="text-text-muted shrink-0 text-[10px] font-black tracking-wider uppercase">
                        {t("activeSessionSection")}
                    </span>
                    <div className="bg-bdc-primary h-px flex-1 opacity-60" />
                </div>
            ) : (
                <Divider className="border-bdc-primary my-3 opacity-60" />
            )}

            {/* Danh sách thẻ phiên hội thoại */}
            <div className={`space-y-1 ${isCollapsed ? "px-1.5" : "px-3"}`}>
                {inProgressSessions.map((session) => {
                    const isActive =
                        pathname === `/live-chatroom/${session.sessionCode}` ||
                        pathname.startsWith(`/live-chatroom/${session.sessionCode}/`);

                    return (
                        <SidebarActiveSessionItem
                            key={session.sessionCode}
                            session={session}
                            isCollapsed={isCollapsed}
                            isActive={isActive}
                            onResume={() => handleResume(session)}
                            onDelete={() => setDeletingSessionCode(session.sessionCode)}
                            isDeleting={
                                deleteMutation.isPending &&
                                deletingSessionCode === session.sessionCode
                            }
                        />
                    );
                })}
            </div>

            {/* Modal xác nhận xóa */}
            <SidebarDeleteSessionDialog
                open={!!deletingSessionCode}
                onClose={() => setDeletingSessionCode(null)}
                onConfirm={handleDeleteConfirm}
                loading={deleteMutation.isPending}
            />
        </div>
    );
}

export default SidebarActiveSession;
