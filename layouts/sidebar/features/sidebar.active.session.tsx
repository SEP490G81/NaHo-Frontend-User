"use client";

import React, { useMemo, useState } from "react";
import { Divider } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
    COMPANIONS,
    resolveCompanions,
} from "@/modules/protected/live-chatroom/constants/live-chatroom.constant";
import { useResumeSession } from "@/modules/protected/live-chatroom/hooks/use-resume-session";
import {
    deleteSpeakingSession,
    getActiveSession,
    getPersonas,
} from "@/services/client/speaking.service";
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
    const queryClient = useQueryClient();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // 1. Lấy phiên đang dở của người dùng
    const { data: active } = useQuery({
        queryKey: ["active-speaking-session"],
        queryFn: () => getActiveSession(),
        staleTime: 60 * 1000,
    });

    // 2. Lấy danh sách personas để dựng companions phục vụ khôi phục phiên
    const { data: personas } = useQuery({
        queryKey: ["personas"],
        queryFn: getPersonas,
        staleTime: 5 * 60 * 1000,
    });

    const companions = useMemo(
        () => (personas?.length ? resolveCompanions(personas) : COMPANIONS),
        [personas],
    );

    const { resume, resumingCode } = useResumeSession(companions);

    // 3. Mutation xóa phiên đang dở
    const deleteMutation = useMutation({
        mutationFn: (sessionCode: string) =>
            deleteSpeakingSession(sessionCode),
        onSuccess: () => {
            toast.success(t("deleteSessionSuccess"));
            setIsConfirmOpen(false);
            queryClient.invalidateQueries({
                queryKey: ["active-speaking-session"],
            });
        },
        onError: (err) => {
            toast.error(
                err instanceof Error ? err.message : t("deleteSessionError"),
            );
        },
    });

    if (!active) return null;

    const handleResume = async () => {
        onCloseSidebar?.();
        await resume({
            sessionCode: active.sessionCode,
            personaId: active.personaId,
            formalityLevel: active.formalityLevel,
            marugotoLevel: active.marugotoLevel,
            messages: active.messages,
        });
    };

    const handleDeleteConfirm = () => {
        deleteMutation.mutate(active.sessionCode);
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

            {/* Thẻ phiên hội thoại */}
            <div className={isCollapsed ? "px-1.5" : "px-3"}>
                <SidebarActiveSessionItem
                    active={active}
                    isCollapsed={isCollapsed}
                    onResume={handleResume}
                    onDelete={() => setIsConfirmOpen(true)}
                    isResuming={resumingCode === active.sessionCode}
                    isDeleting={deleteMutation.isPending}
                />
            </div>

            {/* Modal xác nhận xóa */}
            <SidebarDeleteSessionDialog
                open={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                loading={deleteMutation.isPending}
            />
        </div>
    );
}

export default SidebarActiveSession;
