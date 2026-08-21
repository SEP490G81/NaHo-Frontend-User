"use client";

import React from "react";
import { Avatar } from "@mui/material";
import type { Companion } from "../types/live.chatroom.type";
import { getInitials } from "../utils/get.initials";

interface TypingIndicatorProps {
    companion: Companion;
}

export function TypingIndicator({
    companion,
}: Readonly<TypingIndicatorProps>) {
    return (
        <div className="flex items-start gap-3">
            <Avatar
                className={`h-9 w-9 shrink-0 ${companion.accent} text-xs font-semibold`}
            >
                {getInitials(companion.name)}
            </Avatar>
            <div className="border-bdc-primary bg-bgc-app flex items-center gap-1.5 rounded-2xl rounded-tl-sm border px-4 py-3 shadow-xs">
                <span className="bg-bgc-highlight h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
                <span className="bg-bgc-highlight h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
                <span className="bg-bgc-highlight h-2 w-2 animate-bounce rounded-full" />
            </div>
        </div>
    );
}

export default TypingIndicator;
