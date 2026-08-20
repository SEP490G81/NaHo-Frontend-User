"use client";

import React, { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { Avatar, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import BackButton from "@/components/ui/back.button";
import type { Companion } from "../types/live-chatroom.type";
import { getInitials } from "../utils/get-initials";
import { styleKeyOf } from "../constants/live-chatroom.constant";
import type { FormalityLevel } from "@/types/responses/persona.response";
import { EndSessionDialog } from "./end-session-dialog";

interface ChatSidebarProps {
    companion: Companion;
    conversationStyle: FormalityLevel;
    onEndSession: () => void;
    ending: boolean;
    isMobile?: boolean;
    onCloseMobile?: () => void;
}

export function ChatSidebar({
    companion,
    conversationStyle,
    onEndSession,
    ending,
    onCloseMobile,
}: Readonly<ChatSidebarProps>) {
    const t = useTranslations("liveChatroom");
    const ts = useTranslations("dialogueSetup");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleConfirmEnd = () => {
        setIsDialogOpen(false);
        if (onCloseMobile) onCloseMobile();
        onEndSession();
    };

    return (
        <aside className="border-bdc-primary bg-bgc-app flex h-full flex-col gap-4 border-r p-5">
            {/* Nút quay lại */}
            <BackButton
                href="/dialogue-setup"
                label={t("back")}
                className="self-start px-3! py-1.5! text-xs!"
            />

            {/* Companion */}
            <div className="flex flex-col items-center gap-2 text-center">
                <Avatar
                    className={`h-16 w-16 ${companion.accent} text-lg font-semibold`}
                >
                    {getInitials(companion.name)}
                </Avatar>
                <div>
                    <div className="text-text-contrast text-sm font-semibold">
                        {companion.name}
                    </div>
                    {companion.role && (
                        <div className="text-text-muted text-xs">
                            {companion.role}
                        </div>
                    )}
                    <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {t("online")}
                    </span>
                </div>
            </div>

            {/* Style hội thoại */}
            <div className="border-bdc-primary space-y-1.5 border-t pt-4">
                <span className="text-text-muted text-[11px] font-bold tracking-[0.12em] uppercase">
                    {ts("styleLabel")}
                </span>
                <div className="bg-bgc-highlight/10 text-bgc-highlight inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-semibold">
                    {ts(`style_${styleKeyOf(conversationStyle)}`)}
                </div>
            </div>

            {/* End */}
            <div className="border-bdc-primary mt-auto border-t pt-4">
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    disabled={ending}
                    data-tour-id="tour-ai1on1-end"
                    onClick={() => setIsDialogOpen(true)}
                    className="h-10! rounded-lg! font-bold capitalize"
                    startIcon={
                        ending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <LogOut className="h-4 w-4" />
                        )
                    }
                >
                    {ending ? t("ending") : t("endChatButton")}
                </Button>
            </div>

            <EndSessionDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirmEnd}
                loading={ending}
            />
        </aside>
    );
}

export default ChatSidebar;
