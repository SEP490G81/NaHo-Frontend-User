"use client";
import React, { useEffect, useState } from "react";
import { Mic } from "lucide-react";
import { Avatar } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import { getInitials } from "../utils/get-initials";

/** Chỉ báo (phía người dùng) đang xử lý bản ghi của bạn: lọc nhiễu → STT → phân tích. */
export function UserAudioProcessing() {
    const t = useTranslations("liveChatroom");
    const profile = useAuthStore((s) => s.profile);
    const name = profile?.fullName ?? "Bạn";
    const [stepIdx, setStepIdx] = useState(0);

    const steps = [
        t("processingFilterNoise"),
        t("processingSTT"),
        t("processingAnalysis"),
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStepIdx((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 1500);
        return () => clearInterval(timer);
    }, [steps.length]);

    return (
        <div className="flex items-start justify-end gap-3">
            <div className="flex max-w-[80%] flex-col items-end gap-1.5">
                <div className="text-text-muted text-xs font-medium">
                    {name}
                </div>
                <div className="bg-bgc-highlight/10 border-bgc-highlight/30 text-bgc-highlight flex items-center gap-2.5 rounded-2xl rounded-tr-sm border px-4 py-2.5 text-xs shadow-sm">
                    <Mic className="h-3.5 w-3.5 shrink-0 animate-pulse" />
                    <span className="animate-pulse font-medium">
                        {steps[stepIdx]}
                    </span>
                    <span className="flex shrink-0 gap-1">
                        <span className="bg-bgc-highlight h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.3s]" />
                        <span className="bg-bgc-highlight h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:-0.15s]" />
                        <span className="bg-bgc-highlight h-1.5 w-1.5 animate-bounce rounded-full" />
                    </span>
                </div>
            </div>
            <Avatar className="bg-bgc-page text-bgc-highlight h-9 w-9 shrink-0 text-xs font-semibold">
                {getInitials(name)}
            </Avatar>
        </div>
    );
}

export default UserAudioProcessing;
