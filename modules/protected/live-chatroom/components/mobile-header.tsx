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
    <div className="flex items-center justify-between border-b border-bdc-primary bg-bgc-app px-4 py-3 lg:hidden">
      <div>
        <div className="text-sm font-semibold text-text-contrast">{companion.name}</div>
        <div className="text-xs text-text-muted">{companion.role}</div>
      </div>
      <IconButton
        size="small"
        onClick={onOpenSettings}
        className="!text-text-contrast border border-bdc-primary !rounded-lg !px-3 !py-1.5 flex gap-1 !text-xs !font-semibold hover:bg-hbgc-app"
      >
        <Settings className="h-4 w-4" />
        <span>{t("settingsTitle")}</span>
      </IconButton>
    </div>
  );
}

export default MobileHeader;
