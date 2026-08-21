"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import type { ChatMessage } from "../types/live.chatroom.type";
import type { SpeakingSessionResponse } from "@/types/responses/speaking.llm.response";
import {
    getInProgressSessionDetails,
    initFirstGreeting,
    sendAudioMessage,
    sendMessage,
} from "@/services/client/speaking.llm.service";
import { useChatStore } from "@/store/chatStore";
import { blobToWav } from "../utils/wav.encoder";
import {
    createAiMessage,
    createUserMessage,
    mapInitialMessages,
} from "../utils/message.mapper";

import { SpeakingSessionStatus } from "@/types/enums/speaking.llm.enum";

export function useLiveChat(
    sessionCode: string,
    initialSession?: SpeakingSessionResponse | null,
) {
    const t = useTranslations("liveChatroom");
    const autoPlayAudio = useChatStore((s) => s.autoPlayAudio);
    const [sessionDetails, setSessionDetails] =
        useState<SpeakingSessionResponse | null>(initialSession ?? null);
    const [messages, setMessages] = useState<ChatMessage[]>(() =>
        mapInitialMessages(initialSession?.messages),
    );
    const [isLoading, setIsLoading] = useState<boolean>(
        !initialSession && !!sessionCode,
    );
    const [isTyping, setIsTyping] = useState(false);
    const [audioProcessing, setAudioProcessing] = useState(false);
    const [isStartingGreeting, setIsStartingGreeting] = useState(false);
    const [suggestions, setSuggestions] = useState<string[] | null>(null);

    useEffect(() => {
        if (!sessionCode) return;
        if (initialSession) {
            setSessionDetails(initialSession);
            setMessages(mapInitialMessages(initialSession.messages));
            setIsLoading(false);
            return;
        }

        let isCancelled = false;
        setIsLoading(true);

        getInProgressSessionDetails(sessionCode)
            .then((res) => {
                if (!isCancelled && res) {
                    setSessionDetails(res);
                    if (res.messages && res.messages.length > 0) {
                        setMessages(mapInitialMessages(res.messages));
                    }
                }
            })
            .catch(() => {})
            .finally(() => {
                if (!isCancelled) {
                    setIsLoading(false);
                }
            });

        return () => {
            isCancelled = true;
        };
    }, [sessionCode, initialSession]);

    // Trạng thái phiên: INIT | IN_PROGRESS | COMPLETED
    const sessionStatus =
        sessionDetails?.status ??
        (messages.length > 0 ? SpeakingSessionStatus.IN_PROGRESS : SpeakingSessionStatus.INIT);

    // Chỉ khi trạng thái là INIT và chưa có tin nhắn nào mới hiển thị ReadyStartCard
    const isInit =
        sessionStatus === SpeakingSessionStatus.INIT && messages.length === 0;

    const handleInitGreeting = useCallback(async () => {
        if (!sessionCode || isStartingGreeting) return;
        setIsStartingGreeting(true);
        try {
            const res = await initFirstGreeting(sessionCode);
            setMessages([
                createAiMessage(
                    res.content,
                    res.contentTranslation,
                    res.grammarNote,
                    res.audioBase64,
                    autoPlayAudio,
                ),
            ]);
            setSessionDetails((prev) =>
                prev
                    ? { ...prev, status: SpeakingSessionStatus.IN_PROGRESS }
                    : null,
            );
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

            const userMsg = createUserMessage(trimmed);
            setMessages((m) => [...m, userMsg]);
            setIsTyping(true);
            try {
                const res = await sendMessage(sessionCode, {
                    transcript: trimmed,
                });
                setMessages((m) =>
                    m.map((msg) =>
                        msg.id === userMsg.id && msg.role === "user"
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
                    createAiMessage(
                        res.assistantReply,
                        res.assistantReplyTranslation,
                        res.grammarExplanation,
                        res.aiReplyAudio ?? undefined,
                        autoPlayAudio,
                    ),
                ]);
            } catch (err) {
                toast.error(
                    err instanceof Error ? err.message : t("sendError"),
                );
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

                const userMsg = createUserMessage(
                    res.transcribedText,
                    res.pronunciationScore,
                    res.correctionExplanation
                        ? {
                              correctedText:
                                  res.correctedUserText ?? res.transcribedText,
                              explanation: res.correctionExplanation,
                          }
                        : null,
                );
                setMessages((m) => [...m, userMsg]);

                if (res.suggestedReplies && res.suggestedReplies.length > 0) {
                    setSuggestions(res.suggestedReplies);
                }
                setIsTyping(true);
                await new Promise((r) => setTimeout(r, 600));
                setMessages((m) => [
                    ...m,
                    createAiMessage(
                        res.assistantReply,
                        res.assistantReplyTranslation,
                        res.grammarExplanation,
                        res.aiReplyAudio ?? undefined,
                        autoPlayAudio,
                    ),
                ]);
            } catch (err) {
                toast.error(
                    err instanceof Error ? err.message : t("sendError"),
                );
            } finally {
                setAudioProcessing(false);
                setIsTyping(false);
            }
        },
        [sessionCode, autoPlayAudio, t],
    );

    return {
        messages,
        sessionDetails,
        isInit,
        isLoading,
        isTyping,
        audioProcessing,
        isStartingGreeting,
        suggestions,
        handleInitGreeting,
        handleSendText,
        handleSendAudio,
    };
}

export default useLiveChat;
