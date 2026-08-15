"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import type { ChatMessage } from "../types/live-chatroom.type";
import type { SpeakingSessionResponse } from "@/types/responses/speaking.llm.response";
import {
    initFirstGreeting,
    sendAudioMessage,
    sendMessage,
} from "@/services/client/speaking.llm.service";
import { useChatStore } from "@/store/chatStore";
import { blobToWav } from "../utils/wav.encoder";
import {
    getNextId,
    getNowTime,
    mapInitialMessages,
} from "../utils/message.mapper";

export function useLiveChat(
    sessionCode: string,
    initialSession?: SpeakingSessionResponse | null,
) {
    const t = useTranslations("liveChatroom");
    const autoPlayAudio = useChatStore((s) => s.autoPlayAudio);
    const [messages, setMessages] = useState<ChatMessage[]>(() =>
        mapInitialMessages(initialSession?.messages),
    );
    const [isTyping, setIsTyping] = useState(false);
    const [audioProcessing, setAudioProcessing] = useState(false);
    const [isStartingGreeting, setIsStartingGreeting] = useState(false);
    const [suggestions, setSuggestions] = useState<string[] | null>(null);

    const isReady = messages.length > 0;

    const handleInitGreeting = useCallback(async () => {
        if (!sessionCode || isStartingGreeting) return;
        setIsStartingGreeting(true);
        try {
            const res = await initFirstGreeting(sessionCode);
            setMessages([
                {
                    id: getNextId("greet"),
                    role: "ai",
                    text: res.content,
                    translation: res.contentTranslation,
                    grammar: res.grammarNote,
                    audioBase64: res.audioBase64,
                    autoPlay: autoPlayAudio && !!res.audioBase64,
                    timestamp: getNowTime(),
                },
            ]);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t("sendError"));
        } finally {
            setIsStartingGreeting(false);
        }
    }, [sessionCode, isStartingGreeting, autoPlayAudio, t]);

    const handleSendText = useCallback(
        async (text: string) => {
            const trimmed = text.trim();
            if (!trimmed || !sessionCode || isTyping) return;
            const userId = getNextId("u");
            setMessages((m) => [
                ...m,
                { id: userId, role: "user", text: trimmed, timestamp: getNowTime() },
            ]);
            setIsTyping(true);
            try {
                const res = await sendMessage(sessionCode, {
                    transcript: trimmed,
                });
                setMessages((m) =>
                    m.map((msg) =>
                        msg.id === userId && msg.role === "user"
                            ? {
                                  ...msg,
                                  correction: res.correctionExplanation
                                      ? {
                                            correctedText:
                                                res.correctedUserText ??
                                                msg.text,
                                            explanation:
                                                res.correctionExplanation,
                                        }
                                      : null,
                              }
                            : msg,
                    ),
                );
                setMessages((m) => [
                    ...m,
                    {
                        id: getNextId("ai"),
                        role: "ai",
                        text: res.assistantReply,
                        translation: res.assistantReplyTranslation,
                        grammar: res.grammarExplanation,
                        audioBase64: res.aiReplyAudio ?? undefined,
                        autoPlay: autoPlayAudio && !!res.aiReplyAudio,
                        timestamp: getNowTime(),
                    },
                ]);
            } catch (err) {
                toast.error(err instanceof Error ? err.message : t("sendError"));
            } finally {
                setIsTyping(false);
            }
        },
        [sessionCode, isTyping, autoPlayAudio, t],
    );

    const handleSendAudio = useCallback(
        async (blob: Blob) => {
            if (!sessionCode) return;
            setAudioProcessing(true);
            try {
                const wavBlob = await blobToWav(blob);
                const res = await sendAudioMessage(sessionCode, wavBlob);
                setAudioProcessing(false);
                const userId = getNextId("u");
                setMessages((m) => [
                    ...m,
                    {
                        id: userId,
                        role: "user",
                        text: res.transcribedText,
                        pronunciationScore: res.pronunciationScore,
                        correction: res.correctionExplanation
                            ? {
                                  correctedText:
                                      res.correctedUserText ??
                                      res.transcribedText,
                                  explanation: res.correctionExplanation,
                              }
                            : null,
                        timestamp: getNowTime(),
                    },
                ]);
                if (res.suggestedReplies && res.suggestedReplies.length > 0) {
                    setSuggestions(res.suggestedReplies);
                }
                setIsTyping(true);
                await new Promise((r) => setTimeout(r, 600));
                setMessages((m) => [
                    ...m,
                    {
                        id: getNextId("ai"),
                        role: "ai",
                        text: res.assistantReply,
                        translation: res.assistantReplyTranslation,
                        grammar: res.grammarExplanation,
                        audioBase64: res.aiReplyAudio ?? undefined,
                        autoPlay: autoPlayAudio && !!res.aiReplyAudio,
                        timestamp: getNowTime(),
                    },
                ]);
            } catch (err) {
                toast.error(err instanceof Error ? err.message : t("sendError"));
            } finally {
                setAudioProcessing(false);
                setIsTyping(false);
            }
        },
        [sessionCode, autoPlayAudio, t],
    );

    return {
        messages,
        isReady,
        isTyping,
        audioProcessing,
        isStartingGreeting,
        suggestions,
        handleInitGreeting,
        handleSendText,
        handleSendAudio,
    };
}
