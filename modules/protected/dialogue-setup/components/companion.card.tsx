"use client";

import React from "react";
import { Avatar } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslations } from "next-intl";
import type { Companion } from "@/modules/protected/live-chatroom/types/live.chatroom.type";
import { getInitials } from "@/modules/protected/live-chatroom/utils/get.initials";
import { cn } from "@/libs/utils";

interface CompanionCardProps {
    companion: Companion;
    selected: boolean;
    onSelect: () => void;
}

export function CompanionCard({
    companion,
    selected,
    onSelect,
}: Readonly<CompanionCardProps>) {
    const t = useTranslations("dialogueSetup");
    const isUnavailable = companion.personaId == null;

    return (
        <button
            type="button"
            onClick={onSelect}
            disabled={isUnavailable}
            data-tour-id={
                companion.id === "ai-sensei"
                    ? "tour-ai1on1-companion-first"
                    : undefined
            }
            className={cn(
                "group relative flex w-full cursor-pointer flex-col gap-3 rounded-2xl border p-4 text-left transition-all duration-200",
                selected
                    ? "border-bgc-highlight bg-bgc-highlight/10 shadow-sm ring-2 ring-bgc-highlight"
                    : "border-bdc-primary bg-bgc-app hover:border-bgc-highlight/60 hover:shadow-xs",
                isUnavailable && "cursor-not-allowed opacity-50",
            )}
        >
            <div className="flex items-start justify-between">
                <Avatar
                    className={`h-12 w-12 ${companion.accent} font-bold shadow-xs`}
                >
                    {getInitials(companion.name)}
                </Avatar>

                {selected ? (
                    <CheckCircleIcon className="text-bgc-highlight h-6 w-6" />
                ) : (
                    <span className="border-bdc-primary h-5 w-5 rounded-full border" />
                )}
            </div>

            <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                    <span className="text-text-contrast text-sm font-bold">
                        {companion.name}
                    </span>
                </div>
                {companion.role && (
                    <p className="text-text-muted line-clamp-1 text-xs">
                        {companion.role}
                    </p>
                )}
                {isUnavailable && (
                    <span className="text-text-error inline-block text-[11px] font-medium">
                        {t("personaUnavailable")}
                    </span>
                )}
            </div>
        </button>
    );
}

export default CompanionCard;
