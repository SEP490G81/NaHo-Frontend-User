"use client";
import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { getInitials } from "../utils/get-initials";
import type { Companion } from "../types/live-chatroom.type";
import { useTranslations } from "next-intl";

export function TypingIndicator({ companion }: { companion: Companion }) {
    const t = useTranslations("liveChatroom");
    const [stepIdx, setStepIdx] = useState(0);

    const steps = [
        t("processingFilterNoise"),
        t("processingSTT"),
        t("processingAnalysis"),
        t("processingAiResponse"),
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStepIdx((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 1500);

        return () => clearInterval(timer);
    }, [steps.length]);

    return (
        <div className="flex items-start gap-3">
            <Avatar className={`h-9 w-9 shrink-0 ${companion.accent}`}>
                {getInitials(companion.name)}
            </Avatar>
            <div className="flex max-w-[80%] flex-col gap-1.5">
                <div className="text-text-muted text-xs font-medium">
                    {companion.name}
                </div>
                <div className="border-bdc-primary bg-bgc-app text-text-muted flex items-center gap-2.5 rounded-2xl rounded-tl-sm border px-4 py-2.5 text-xs shadow-sm">
                    <span className="flex shrink-0 gap-1">
                        <span className="bg-bgc-highlight h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.3s]" />
                        <span className="bg-bgc-highlight h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.15s]" />
                        <span className="bg-bgc-highlight h-1.5 w-1.5 animate-bounce rounded-full" />
                    </span>
                    <span className="text-text-contrast animate-pulse font-medium">
                        {steps[stepIdx]}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default TypingIndicator;
