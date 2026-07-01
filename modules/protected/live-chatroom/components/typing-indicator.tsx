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
    t("processingAiResponse")
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
      <div className="flex flex-col gap-1.5 max-w-[80%]">
        <div className="text-xs text-text-muted font-medium">
          {companion.name}
        </div>
        <div className="flex items-center gap-2.5 rounded-2xl rounded-tl-sm border border-bdc-primary bg-bgc-app px-4 py-2.5 text-xs text-text-muted shadow-sm">
          <span className="flex gap-1 shrink-0">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bgc-highlight [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bgc-highlight [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-bgc-highlight" />
          </span>
          <span className="font-medium animate-pulse text-text-contrast">{steps[stepIdx]}</span>
        </div>
      </div>
    </div>
  );
}

export default TypingIndicator;
