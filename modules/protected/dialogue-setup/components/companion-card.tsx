"use client";
import { Check } from "lucide-react";
import { Avatar } from "@mui/material";
import { cn } from "@/libs/utils";
import { getInitials } from "@/modules/protected/live-chatroom/utils/get-initials";
import type { Companion } from "@/modules/protected/live-chatroom/types/live-chatroom.type";

interface CompanionCardProps {
    companion: Companion;
    selected: boolean;
    onSelect: () => void;
}

export function CompanionCard({
    companion,
    selected,
    onSelect,
}: CompanionCardProps) {
    const unavailable = companion.personaId == null;

    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                "group bg-bgc-app relative flex h-full w-full cursor-pointer flex-col items-center gap-3 rounded-xl border p-5 text-center transition-all",
                selected
                    ? "border-bgc-highlight ring-bgc-highlight/40 -translate-y-0.5 shadow-md ring-2"
                    : "border-bdc-primary hover:border-bgc-highlight/60 hover:-translate-y-0.5 hover:shadow-sm",
            )}
        >
            {selected && (
                <span className="bg-bgc-highlight absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-sm">
                    <Check className="h-3.5 w-3.5" />
                </span>
            )}
            <Avatar
                className={cn("h-16 w-16 text-lg font-bold", companion.accent)}
            >
                {getInitials(companion.name)}
            </Avatar>
            <div className="space-y-1">
                <div className="text-text-contrast text-sm font-semibold">
                    {companion.name}
                </div>
                {companion.role && (
                    <div className="text-bgc-highlight text-xs font-medium">
                        {companion.role}
                    </div>
                )}
            </div>
            {companion.description && (
                <p className="text-text-muted line-clamp-3 text-xs leading-relaxed">
                    {companion.description}
                </p>
            )}
            <div className="mt-auto flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {companion.level && (
                    <span className="bg-bgc-highlight/15 text-bgc-highlight inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium">
                        {companion.level}
                    </span>
                )}
                {unavailable && (
                    <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-300">
                        chưa sẵn sàng
                    </span>
                )}
            </div>
        </button>
    );
}

export default CompanionCard;
