"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function UserAudioProcessing() {
    const t = useTranslations("liveChatroom");

    return (
        <div className="flex flex-col items-end gap-1.5">
            <div className="max-w-[85%] sm:max-w-[75%]">
                <div className="border-bdc-primary bg-bgc-app flex items-center gap-2.5 rounded-2xl rounded-tr-sm border px-4 py-3 shadow-xs">
                    <Loader2 className="text-bgc-highlight h-4 w-4 animate-spin" />
                    <span className="text-text-muted text-sm font-medium">
                        {t("transcribing")}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserAudioProcessing;
