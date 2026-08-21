"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Avatar, IconButton } from "@mui/material";
import { useTranslations } from "next-intl";
import BackButton from "@/components/ui/back.button";
import type { Companion } from "../types/live.chatroom.type";
import { getInitials } from "../utils/get.initials";

interface MobileHeaderProps {
    companion: Companion;
    onOpenSettings: () => void;
}

export function MobileHeader({
    companion,
    onOpenSettings,
}: Readonly<MobileHeaderProps>) {
    const t = useTranslations("liveChatroom");

    return (
        <header className="border-bdc-primary bg-bgc-app flex items-center justify-between border-b px-4 py-2.5 lg:hidden">
            <BackButton
                href="/dialogue-setup"
                label={t("back")}
                className="px-2! py-1! text-xs!"
            />

            <div className="flex items-center gap-2">
                <Avatar
                    className={`h-8 w-8 ${companion.accent} text-xs font-semibold`}
                >
                    {getInitials(companion.name)}
                </Avatar>
                <div className="text-left">
                    <div className="text-text-contrast text-xs font-bold">
                        {companion.name}
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
                        ● {t("online")}
                    </div>
                </div>
            </div>

            <IconButton
                size="small"
                onClick={onOpenSettings}
                className="text-text-contrast"
                aria-label="Settings"
            >
                <Menu className="h-5 w-5" />
            </IconButton>
        </header>
    );
}

export default MobileHeader;
