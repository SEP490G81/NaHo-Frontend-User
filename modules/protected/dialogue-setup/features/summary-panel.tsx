"use client";

import React, { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Avatar, Button } from "@mui/material";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { getInitials } from "@/modules/protected/live-chatroom/utils/get-initials";
import {
    marugotoLabel,
    styleKeyOf,
} from "@/modules/protected/live-chatroom/constants/live-chatroom.constant";
import type { Companion } from "@/modules/protected/live-chatroom/types/live-chatroom.type";
import type {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/responses/persona.response";
import { startConversation } from "@/services/client/speaking.llm.service";
import { useChatStore } from "@/store/chatStore";
import { useRouter } from "@/i18n/navigation";

interface SummaryPanelProps {
    companion: Companion;
    conversationStyle: FormalityLevel;
    marugotoLevel: MarugotoLevel;
    isQuotaExhausted?: boolean;
}

export function SummaryPanel({
    companion,
    conversationStyle,
    marugotoLevel,
    isQuotaExhausted = false,
}: Readonly<SummaryPanelProps>) {
    const t = useTranslations("dialogueSetup");
    const router = useRouter();
    const setConfig = useChatStore((s) => s.setConfig);
    const setSession = useChatStore((s) => s.setSession);
    const [starting, setStarting] = useState(false);

    const personaId = companion.personaId;
    const canStart = personaId != null && !starting && !isQuotaExhausted;

    const rows: { label: string; value: string }[] = [
        { label: t("summaryCompanion"), value: companion.name },
        {
            label: t("summaryStyle"),
            value: t(`style_${styleKeyOf(conversationStyle)}`),
        },
        { label: t("summaryLevel"), value: marugotoLabel(marugotoLevel) },
    ];

    const handleStart = async () => {
        if (personaId == null || isQuotaExhausted) return;
        setStarting(true);
        try {
            const sessionCode = await startConversation(personaId);
            if (!sessionCode || sessionCode === "[object Object]") {
                throw new Error(
                    "Không nhận được mã phiên hội thoại từ máy chủ.",
                );
            }
            setConfig({
                companionId: companion.id,
                conversationStyle,
                marugotoLevel,
            });
            setSession({
                sessionCode,
                personaId,
                companionId: companion.id,
                aiGreeting: "",
            });
            router.push(`/live-chatroom/${sessionCode}`);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t("startError"));
            setStarting(false);
        }
    };

    return (
        <div className="border-bdc-primary bg-bgc-app sticky top-6 space-y-5 rounded-2xl border p-5 shadow-sm">
            <h2 className="text-text-muted text-xs font-bold tracking-[0.16em] uppercase">
                {t("summaryTitle")}
            </h2>

            <div className="border-bdc-primary bg-bgc-app flex flex-col gap-2 rounded-xl border p-3">
                <div className="flex items-center gap-3">
                    <Avatar
                        className={`h-12 w-12 ${companion.accent} font-bold`}
                    >
                        {getInitials(companion.name)}
                    </Avatar>
                    <div className="min-w-0">
                        <div className="text-text-contrast truncate font-semibold">
                            {companion.name}
                        </div>
                        {companion.role && (
                            <div className="text-text-muted truncate text-xs">
                                {companion.role}
                            </div>
                        )}
                    </div>
                </div>
                {companion.prompt && (
                    <div className="border-bdc-primary/40 mt-1 border-t pt-2 text-xs">
                        <span className="text-text-muted mb-1 block font-medium">
                            Prompt Persona:
                        </span>
                        <p className="text-text-contrast line-clamp-4 leading-relaxed wrap-break-word italic">
                            &quot;{companion.prompt}&quot;
                        </p>
                    </div>
                )}
            </div>

            <div className="space-y-2.5">
                {rows.map((r) => (
                    <div
                        key={r.label}
                        className="border-bdc-primary/60 flex items-center justify-between border-b pb-2 text-sm last:border-b-0"
                    >
                        <span className="text-text-muted">{r.label}</span>
                        <span className="text-text-contrast font-semibold">
                            {r.value}
                        </span>
                    </div>
                ))}
            </div>

            <Button
                onClick={handleStart}
                disabled={!canStart}
                data-tour-id="tour-ai1on1-start"
                variant="contained"
                color="primary"
                fullWidth
                className="[&.Mui-disabled]:bg-bdc-primary! [&.Mui-disabled]:text-text-muted! h-12! rounded-xl! font-bold! text-white capitalize hover:opacity-90"
                endIcon={
                    starting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <ArrowRight className="h-4 w-4" />
                    )
                }
            >
                {starting ? t("starting") : t("startButton")}
            </Button>
        </div>
    );
}

export default SummaryPanel;
