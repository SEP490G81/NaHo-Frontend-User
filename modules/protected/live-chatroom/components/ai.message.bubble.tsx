"use client";

import React, { useState } from "react";
import { BookOpen, Languages } from "lucide-react";
import { Avatar } from "@mui/material";
import { useTranslations } from "next-intl";
import type { AiChatMessage, Companion } from "../types/live.chatroom.type";
import { getInitials } from "../utils/get.initials";
import { Base64AudioPlayer } from "./base64.audio.player";

interface AiMessageBubbleProps {
    message: AiChatMessage;
    companion: Companion;
}

export function AiMessageBubble({
    message,
    companion,
}: Readonly<AiMessageBubbleProps>) {
    const t = useTranslations("liveChatroom");
    const [showTranslation, setShowTranslation] = useState(false);
    const [showGrammar, setShowGrammar] = useState(false);

    return (
        <div className="flex items-start gap-3">
            <Avatar
                className={`h-9 w-9 shrink-0 ${companion.accent} text-xs font-semibold`}
            >
                {getInitials(companion.name)}
            </Avatar>
            <div className="max-w-[85%] space-y-1.5 sm:max-w-[75%]">
                <div className="border-bdc-primary bg-bgc-app space-y-2 rounded-2xl rounded-tl-sm border p-3.5 shadow-xs">
                    {/* Audio */}
                    {message.audioBase64 && (
                        <div className="pb-1">
                            <Base64AudioPlayer
                                audioBase64={message.audioBase64}
                                autoPlay={message.autoPlay}
                            />
                        </div>
                    )}

                    {/* Câu tiếng Nhật */}
                    <div className="text-text-contrast text-[15px] leading-relaxed">
                        {message.text}
                    </div>

                    {/* Bản dịch */}
                    {showTranslation && message.translation && (
                        <div className="border-bdc-primary/60 text-text-muted border-t pt-2 text-xs leading-relaxed">
                            {message.translation}
                        </div>
                    )}

                    {/* Giải thích ngữ pháp */}
                    {showGrammar && message.grammar && (
                        <div className="rounded-lg bg-emerald-500/10 p-2 text-xs text-emerald-800 dark:text-emerald-200">
                            <span className="font-semibold">
                                {t("grammarExplanation")}:
                            </span>{" "}
                            {message.grammar}
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                        {message.translation && (
                            <button
                                type="button"
                                onClick={() => setShowTranslation((v) => !v)}
                                className="text-text-muted hover:text-text-contrast inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium transition-colors"
                            >
                                <Languages className="h-3 w-3" />
                                <span>
                                    {showTranslation
                                        ? t("hideTranslation")
                                        : t("translate")}
                                </span>
                            </button>
                        )}
                        {message.grammar && (
                            <button
                                type="button"
                                onClick={() => setShowGrammar((v) => !v)}
                                className="text-text-muted hover:text-text-contrast inline-flex cursor-pointer items-center gap-1 text-[11px] font-medium transition-colors"
                            >
                                <BookOpen className="h-3 w-3" />
                                <span>
                                    {showGrammar
                                        ? t("hideGrammar")
                                        : t("grammar")}
                                </span>
                            </button>
                        )}
                    </div>
                </div>

                <span className="text-text-muted px-1 text-[10px]">
                    {message.timestamp}
                </span>
            </div>
        </div>
    );
}

export default AiMessageBubble;
