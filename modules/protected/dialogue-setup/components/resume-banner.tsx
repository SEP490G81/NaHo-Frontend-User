"use client";
import { ArrowRight, History, Loader2 } from "lucide-react";
import { Avatar, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { getInitials } from "@/modules/protected/live-chatroom/utils/get-initials";
import type { Companion } from "@/modules/protected/live-chatroom/types/live-chatroom.type";
import type { ActiveSpeakingSessionResponse } from "@/types/responses/speaking.response";

interface ResumeBannerProps {
    active: ActiveSpeakingSessionResponse;
    companion?: Companion;
    resuming: boolean;
    onResume: () => void;
    onDismiss: () => void;
}

function formatWhen(iso: string): string {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? iso : d.toLocaleString();
}

export function ResumeBanner({
    active,
    companion,
    resuming,
    onResume,
    onDismiss,
}: ResumeBannerProps) {
    const t = useTranslations("dialogueSetup");
    const name = companion?.name ?? t("resumeUnknownPersona");

    return (
        <div className="border-bdc-primary bg-bgc-app flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-5 shadow-sm">
            <div className="flex items-center gap-3">
                <Avatar
                    className={`h-11 w-11 shrink-0 ${companion?.accent ?? "bg-bgc-highlight/15 text-bgc-highlight"}`}
                >
                    {getInitials(name)}
                </Avatar>
                <div>
                    <div className="text-text-contrast flex items-center gap-1.5 text-sm font-semibold">
                        <History className="text-bgc-highlight h-4 w-4" />
                        {t("resumeTitle")}
                    </div>
                    <div className="text-text-muted text-xs">
                        {name} ·{" "}
                        {t("resumeTurns", { count: active.totalTurns })} ·{" "}
                        {formatWhen(active.startedAt)}
                    </div>
                </div>
            </div>
            <div className="flex gap-2">
                <Button
                    onClick={onDismiss}
                    disabled={resuming}
                    className="!text-text-muted hover:!bg-hbgc-app !rounded-lg capitalize"
                >
                    {t("resumeDismiss")}
                </Button>
                <Button
                    onClick={onResume}
                    disabled={resuming}
                    variant="contained"
                    color="primary"
                    className="!rounded-lg !px-4 !font-bold text-white capitalize hover:opacity-90"
                    endIcon={
                        resuming ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <ArrowRight className="h-4 w-4" />
                        )
                    }
                >
                    {resuming ? t("resuming") : t("resumeContinue")}
                </Button>
            </div>
        </div>
    );
}

export default ResumeBanner;
