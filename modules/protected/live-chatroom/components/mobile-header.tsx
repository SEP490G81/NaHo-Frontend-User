"use client";
import React from "react";
import { Settings } from "lucide-react";
import { IconButton } from "@mui/material";
import { useTranslations } from "next-intl";
import type { Companion } from "../types/live-chatroom.type";

interface MobileHeaderProps {
    companion: Companion;
    onOpenSettings: () => void;
}

export function MobileHeader({ companion, onOpenSettings }: MobileHeaderProps) {
    const t = useTranslations("liveChatroom");

    return (
        <div className="border-bdc-primary bg-bgc-app flex items-center justify-between border-b px-4 py-3 lg:hidden">
            <div>
                <div className="text-text-contrast text-sm font-semibold">
                    {companion.name}
                </div>
                <div className="text-text-muted text-xs">{companion.role}</div>
            </div>
            <IconButton
                size="small"
                onClick={onOpenSettings}
                className="!text-text-contrast border-bdc-primary hover:bg-hbgc-app flex gap-1 !rounded-lg border !px-3 !py-1.5 !text-xs !font-semibold"
            >
                <Settings className="h-4 w-4" />
                <span>{t("settingsTitle")}</span>
            </IconButton>
        </div>
    );
}

export default MobileHeader;
