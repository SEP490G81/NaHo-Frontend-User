"use client";
import React from "react";
import { ArrowLeft, Settings } from "lucide-react";
import { IconButton } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { Companion } from "../types/live-chatroom.type";

interface MobileHeaderProps {
    companion: Companion;
    onOpenSettings: () => void;
}

export function MobileHeader({
    companion,
    onOpenSettings,
}: Readonly<MobileHeaderProps>) {
    const t = useTranslations("liveChatroom");
    const router = useRouter();

    return (
        <div className="border-bdc-primary bg-bgc-app flex items-center justify-between border-b px-4 py-3 lg:hidden">
            <div className="flex items-center gap-2">
                <IconButton
                    size="small"
                    onClick={() => router.push("/dialogue-setup")}
                    aria-label={t("back")}
                    className="!text-text-contrast hover:bg-hbgc-app !rounded-lg border !border-bdc-primary !p-1.5"
                >
                    <ArrowLeft className="h-4 w-4" />
                </IconButton>
                <div>
                    <div className="text-text-contrast text-sm font-semibold">
                        {companion.name}
                    </div>
                    <div className="text-text-muted text-xs">{companion.role}</div>
                </div>
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

