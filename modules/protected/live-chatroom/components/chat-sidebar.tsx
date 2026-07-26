"use client";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slider,
} from "@mui/material";
import { useTranslations } from "next-intl";
import type { Companion } from "../types/live-chatroom.type";
import { getInitials } from "../utils/get-initials";

interface ChatSidebarProps {
    companion: Companion;
    voiceSpeed: number;
    onVoiceSpeedChange: (v: number) => void;
    onEndSession: () => void;
    ending: boolean;
    isMobile?: boolean;
    onCloseMobile?: () => void;
}

export function ChatSidebar({
    companion,
    voiceSpeed,
    onVoiceSpeedChange,
    onEndSession,
    ending,
    onCloseMobile,
}: ChatSidebarProps) {
    const t = useTranslations("liveChatroom");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleConfirmEnd = () => {
        setIsDialogOpen(false);
        if (onCloseMobile) onCloseMobile();
        onEndSession();
    };

    return (
        <aside className="border-bdc-primary bg-bgc-app flex h-full flex-col gap-5 border-r p-5">
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
                    <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {t("online")}
                    </span>
                </div>
            </div>

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

            <div className="border-bdc-primary mt-auto border-t pt-4">
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    disabled={ending}
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

            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                className="[&_.MuiPaper-root]:border-bdc-primary [&_.MuiPaper-root]:bg-bgc-app [&_.MuiPaper-root]:!rounded-2xl [&_.MuiPaper-root]:border [&_.MuiPaper-root]:!shadow-xl"
                slotProps={{
                    backdrop: {
                        style: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
                    },
                }}
            >
                <DialogTitle className="text-text-contrast !font-bold">
                    {t("endChatModal.title")}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className="!text-text-muted">
                        {t("endChatModal.description")}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="gap-2 p-4">
                    <Button
                        onClick={() => setIsDialogOpen(false)}
                        className="!text-text-muted hover:!bg-hbgc-app capitalize"
                    >
                        {t("endChatModal.cancel")}
                    </Button>
                    <Button
                        onClick={handleConfirmEnd}
                        variant="contained"
                        color="error"
                        className="!rounded-lg !px-4 !font-bold capitalize hover:opacity-90"
                    >
                        {t("endChatModal.confirm")}
                    </Button>
                </DialogActions>
            </Dialog>
        </aside>
    );
}

export default ChatSidebar;
