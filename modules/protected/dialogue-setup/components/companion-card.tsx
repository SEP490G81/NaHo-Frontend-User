"use client";
import { Check } from "lucide-react";
import { Avatar } from "@mui/material";
import { cn } from "@/libs/utils";
import { getInitials } from "@/modules/protected/live-chatroom/utils/get-initials";
import type { Companion } from "@/modules/protected/live-chatroom/types/live-chatroom.type";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("dialogueSetup");

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex h-full w-full flex-col items-center gap-3 rounded-xl border bg-bgc-app p-5 text-center transition-all cursor-pointer",
        selected
          ? "border-bgc-highlight ring-2 ring-bgc-highlight/40"
          : "border-bdc-primary hover:border-bgc-highlight/60",
      )}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-bgc-highlight text-white shadow-sm">
          <Check className="h-3.5 w-3.5" />
        </span>
      )}
      <Avatar className={cn("h-16 w-16 text-lg font-bold", companion.accent)}>
        {getInitials(companion.name)}
      </Avatar>
      <div className="space-y-1">
        <div className="text-sm font-semibold text-text-contrast">{companion.name}</div>
        <div className="text-xs text-text-muted">{companion.role}</div>
      </div>
      <p className="text-xs leading-relaxed text-text-muted line-clamp-3">
        {companion.description}
      </p>
      <span className="mt-auto inline-flex items-center rounded-full bg-bgc-highlight/15 px-2.5 py-0.5 text-[11px] font-medium text-bgc-highlight">
        {t("companionLevel", { level: companion.level })}
      </span>
    </button>
  );
}

export default CompanionCard;
