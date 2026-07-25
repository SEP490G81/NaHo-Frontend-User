"use client";
import { useState } from "react";
import { BookOpen, Languages, Volume2 } from "lucide-react";
import { Avatar, Button, IconButton } from "@mui/material";
import { FuriganaText } from "@/components/ui/furigana.text";
import MockAudioPlayer from "@/modules/protected/topic-detail/components/mock.audio.player";
import { getInitials } from "../utils/get-initials";
import type { AiChatMessage, Companion } from "../types/live-chatroom.type";
import { useTranslations } from "next-intl";

interface Props {
    message: AiChatMessage;
    companion: Companion;
    showFurigana: boolean;
    autoTranslate: boolean;
}

export function AiMessageBubble({
    message,
    companion,
    showFurigana,
    autoTranslate,
}: Props) {
    const t = useTranslations("liveChatroom");
    const [showAudio, setShowAudio] = useState(message.autoPlay || false);
    const [showTranslation, setShowTranslation] = useState(autoTranslate);
    const [showGrammar, setShowGrammar] = useState(false);

    return (
        <div className="flex gap-3">
            <Avatar className={`h-9 w-9 shrink-0 ${companion.accent}`}>
                {getInitials(companion.name)}
            </Avatar>
            <div className="max-w-[80%] space-y-2">
                <div className="text-text-muted flex items-center gap-2 text-xs">
                    <span className="text-text-contrast font-medium">
                        {companion.name}
                    </span>
                    <span>{message.timestamp}</span>
                </div>
                <div className="border-bdc-primary bg-bgc-app rounded-2xl rounded-tl-sm border px-4 py-3 shadow-sm">
                    <div className="flex items-start gap-2">
                        <div className="flex-1 text-base leading-relaxed">
                            <FuriganaText
                                text={message.jp}
                                furigana={message.furigana}
                                showFurigana={showFurigana}
                            />
                        </div>
                        <IconButton
                            size="small"
                            onClick={() => setShowAudio((v) => !v)}
                            className="text-bgc-highlight hover:bg-bgc-highlight/10"
                            aria-label={t("playAudio")}
                            title={t("playAudio")}
                        >
                            <Volume2 className="h-4 w-4" />
                        </IconButton>
                    </div>
                    {showAudio && (
                        <div className="mt-3">
                            <MockAudioPlayer
                                durationSec={6}
                                autoPlay={message.autoPlay}
                            />
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setShowTranslation((v) => !v)}
                        className="border-bdc-primary !text-text-contrast hover:!border-bgc-highlight hover:!bg-bgc-highlight/10 !rounded-full border !text-xs capitalize"
                        startIcon={<Languages className="h-3.5 w-3.5" />}
                    >
                        {t("showTranslation")}
                    </Button>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={() => setShowGrammar((v) => !v)}
                        className="border-bdc-primary !text-text-contrast hover:!border-bgc-highlight hover:!bg-bgc-highlight/10 !rounded-full border !text-xs capitalize"
                        startIcon={<BookOpen className="h-3.5 w-3.5" />}
                    >
                        {t("showGrammar")}
                    </Button>
                </div>

                {showTranslation && (
                    <div className="border-bdc-primary bg-bgc-page rounded-lg border px-3 py-2 text-sm">
                        <div className="text-text-muted mb-0.5 text-[11px] font-medium tracking-wide uppercase">
                            {t("translationHeader")}
                        </div>
                        {message.vi}
                    </div>
                )}
                {showGrammar && (
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
