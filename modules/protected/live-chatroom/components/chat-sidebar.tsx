"use client";

import React, { useState } from "react";
import { Lightbulb, Loader2, LogOut } from "lucide-react";
import { Avatar, Button, Slider, Switch } from "@mui/material";
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
    voiceSpeed: number;
    onVoiceSpeedChange: (v: number) => void;
    showHints: boolean;
    onShowHintsChange: (v: boolean) => void;
    onEndSession: () => void;
    ending: boolean;
    isMobile?: boolean;
    onCloseMobile?: () => void;
}

export function ChatSidebar({
    companion,
    conversationStyle,
    voiceSpeed,
    onVoiceSpeedChange,
    showHints,
    onShowHintsChange,
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
                className="!py-1.5 !px-3 !text-xs self-start"
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

            {/* Tốc độ nói */}
            <div className="border-bdc-primary space-y-2 border-t pt-4">
                <div className="flex items-center justify-between">
                    <span className="text-text-contrast text-xs font-medium">
                        {t("speedLabel")}
                    </span>
                    <span className="bg-bgc-page text-bgc-highlight rounded-md px-2 py-0.5 text-xs font-semibold">
                        {voiceSpeed.toFixed(1)}x
                    </span>
                </div>
                <Slider
                    value={voiceSpeed}
                    min={0.8}
                    max={1.5}
                    step={0.1}
                    onChange={(_e, v) => onVoiceSpeedChange(v as number)}
                    color="primary"
                />
                <div className="text-text-muted flex justify-between text-[10px]">
                    <span>0.8x</span>
                    <span>1.5x</span>
                </div>
            </div>

            {/* Gợi ý câu trả lời */}
            <label className="border-bdc-primary bg-bgc-page/40 flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-3">
                <span className="flex-1">
                    <span className="text-text-contrast flex items-center gap-1.5 text-sm font-medium">
                        <Lightbulb className="text-bgc-highlight h-3.5 w-3.5" />
                        {ts("hintsTitle")}
                    </span>
                    <span className="text-text-muted mt-0.5 block text-xs">
                        {ts("hintsDesc")}
                    </span>
                </span>
                <Switch
                    checked={showHints}
                    onChange={(e) => onShowHintsChange(e.target.checked)}
                    color="primary"
                />
            </label>

            {/* End */}
            <div className="border-bdc-primary mt-auto border-t pt-4">
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    disabled={ending}
                    data-tour-id="tour-ai1on1-end"
                    onClick={() => setIsDialogOpen(true)}
                    className="!h-10 !rounded-lg font-bold capitalize"
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
