"use client";
import { useState } from "react";
import { BookOpen, Languages } from "lucide-react";
import { Avatar, Button } from "@mui/material";
import { getInitials } from "../utils/get-initials";
import { Base64AudioPlayer } from "./base64-audio-player";
import type { AiChatMessage, Companion } from "../types/live-chatroom.type";
import { useTranslations } from "next-intl";

interface Props {
    message: AiChatMessage;
    companion: Companion;
    voiceSpeed: number;
}

export function AiMessageBubble({ message, companion, voiceSpeed }: Props) {
    const t = useTranslations("liveChatroom");
    const [showTranslation, setShowTranslation] = useState(false);
    const [showGrammar, setShowGrammar] = useState(false);

    return (
        <div className="flex gap-3">
            <Avatar className={`h-10 w-10 shrink-0 ${companion.accent}`}>
                {getInitials(companion.name)}
            </Avatar>
            <div className="max-w-[80%] space-y-2">
                <div className="text-text-muted flex items-center gap-2 text-xs">
                    <span className="text-text-contrast font-medium">
                        {companion.name}
                    </span>
                    <span>{message.timestamp}</span>
                </div>
                <div className="border-bdc-primary bg-bgc-app rounded-2xl rounded-tl-sm border px-5 py-3.5 shadow-sm">
                    <div className="font-noto-jp text-base leading-relaxed">
                        {message.text}
                    </div>
                    {message.audioBase64 && (
                        <div className="mt-3">
                            <Base64AudioPlayer
                                base64={message.audioBase64}
                                playbackRate={voiceSpeed}
                                autoPlay={message.autoPlay}
                            />
                        </div>
                    )}
                </div>

                {(message.translation || message.grammar) && (
                    <div className="flex flex-wrap gap-2">
                        {message.translation && (
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setShowTranslation((v) => !v)}
                                className="border-bdc-primary !text-text-contrast hover:!border-bgc-highlight hover:!bg-bgc-highlight/10 !rounded-full border !text-xs capitalize"
                                startIcon={<Languages className="h-3.5 w-3.5" />}
                            >
                                {t("showTranslation")}
                            </Button>
                        )}
                        {message.grammar && (
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setShowGrammar((v) => !v)}
                                className="border-bdc-primary !text-text-contrast hover:!border-bgc-highlight hover:!bg-bgc-highlight/10 !rounded-full border !text-xs capitalize"
                                startIcon={<BookOpen className="h-3.5 w-3.5" />}
                            >
                                {t("showGrammar")}
                            </Button>
                        )}
                    </div>
                )}

                {showTranslation && message.translation && (
                    <div className="border-bdc-primary bg-bgc-page rounded-lg border px-3 py-2 text-sm">
                        <div className="text-text-muted mb-0.5 text-[11px] font-medium tracking-wide uppercase">
                            {t("translationHeader")}
                        </div>
                        {message.translation}
                    </div>
                )}
                {showGrammar && message.grammar && (
                    <div className="rounded-lg border border-sky-300/60 bg-sky-50 px-3 py-2 text-sm dark:border-sky-500/40 dark:bg-sky-500/10">
                        <div className="mb-0.5 text-[11px] font-medium tracking-wide text-sky-700 uppercase dark:text-sky-300">
                            {t("grammarHeader")}
                        </div>
                        {message.grammar}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AiMessageBubble;
