"use client";

import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/enums/speaking.llm.enum";
import { PersonaResponse } from "@/types/responses/persona.response";
import {
    SpeakingSessionMessageResponse,
    SpeakingSessionResponse,
} from "@/types/responses/speaking.llm.response";
import { getPersonaById } from "@/services/client/persona.service";
import { useRouter } from "@/i18n/navigation";
import {
    endSpeakingSession,
    getInProgressSessionDetails,
    sendAudioMessage as sendAudioMessageApi,
    sendTextMessage as sendTextMessageApi,
} from "@/services/client/speaking.llm.service";
import {
    ChatMessageItem,
    LiveChatroomContextType,
} from "../types/live.chatroom.type";
import {
    DEFAULT_CHAT_SPEECH_SPEED,
    SESSION_LIMIT_EXCEEDED_ERROR_CODE,
} from "../constants/live.chatroom.constant";

export const LiveChatroomContext = createContext<
    LiveChatroomContextType | undefined
>(undefined);

const mapMessageToItem = (
    m: SpeakingSessionMessageResponse,
): ChatMessageItem => ({
    id: m.id || m.turnIndex || `msg-${Date.now()}-${Math.random()}`,
    sender: m.senderType === "USER" ? "USER" : "AI",
    content: m.content,
    contentTranslation: m.contentTranslation,
    correctedText: m.correctedText,
    correctionExplanation: m.correctionExplanation,
    grammarNote: m.grammarNote,
    hintForLearner: m.hintForLearner,
    pronunciationScore: m.pronunciationScore,
    aiReplyAudio: m.aiReplyAudio,
    userRecordAudio: m.userRecordAudio,
    audioBase64: m.aiReplyAudio || m.userRecordAudio,
    suggestedReplies: m.suggestedReplies || [],
});

export const LiveChatroomProvider = ({
    sessionCode,
    status,
    children,
}: {
    readonly sessionCode: string;
    readonly status?: string;
    readonly children: React.ReactNode;
}) => {
    const t = useTranslations("liveChatroom");
    const router = useRouter();

    const [sessionDetails, setSessionDetails] =
        useState<SpeakingSessionResponse | null>(null);
    const [personaInfo, setPersonaInfo] = useState<PersonaResponse | null>(
        null,
    );
    const [marugotoLevel, setMarugotoLevel] =
        useState<MarugotoLevel>("STARTER_A1");
    const [formalityLevel, setFormalityLevel] =
        useState<FormalityLevel>("NEUTRAL");
    const [speechSpeed, setSpeechSpeed] = useState<number>(
        DEFAULT_CHAT_SPEECH_SPEED,
    );
    const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
    const [messages, setMessages] = useState<ChatMessageItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
    const [isEndingSession, setIsEndingSession] = useState<boolean>(false);

    const endChatSession = async () => {
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("refresh-chat-sessions"));
        }
        router.refresh();
        router.push(`/chat-result/${sessionCode}`);
    };

    useEffect(() => {
        let isMounted = true;
        const loadSession = async () => {
            try {
                setIsLoading(true);
                const details = await getInProgressSessionDetails(
                    sessionCode,
                    status || "IN_PROGRESS",
                );
                if (!isMounted) return;

                setSessionDetails(details);
                if (details.marugotoLevel) setMarugotoLevel(details.marugotoLevel);
                if (details.formalityLevel) setFormalityLevel(details.formalityLevel);

                if (details.persona) {
                    setPersonaInfo(details.persona);
                } else if (details.personaId) {
                    try {
                        const personaRes = await getPersonaById(details.personaId);
                        if (isMounted) setPersonaInfo(personaRes.data || personaRes);
                    } catch {
                        // ignore persona fetch error
                    }
                }

                const msgList =
                    details.speakingSessionMessages || details.messages || [];
                const mapped = msgList.map(mapMessageToItem);
                setMessages(mapped);
            } catch (err: any) {
                if (!isMounted) return;
                toast.error(
                    err?.message || "Không thể tải thông tin phiên hội thoại.",
                );
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        if (sessionCode) {
            loadSession();
        }

        return () => {
            isMounted = false;
        };
    }, [sessionCode, status]);

    const sendTextMessage = async (userMessageText: string) => {
        if (!userMessageText.trim() || isSendingMessage) return;
        const tempId = `temp-user-${Date.now()}`;
        const tempUserMsg: ChatMessageItem = {
            id: tempId,
            sender: "USER",
            content: userMessageText,
            isPending: true,
        };

        try {
            setIsSendingMessage(true);
            setMessages((prev) => [...prev, tempUserMsg]);

            const res = await sendTextMessageApi({
                sessionCode,
                userMessage: userMessageText,
            });

            const userMsgItem = mapMessageToItem(res.userMessage);
            const aiMsgItem = mapMessageToItem(res.aiMessage);

            setMessages((prev) =>
                prev
                    .map((m) => (m.id === tempId ? userMsgItem : m))
                    .concat(aiMsgItem),
            );
        } catch (err: any) {
            setMessages((prev) => prev.filter((m) => m.id !== tempId));
            if (
                err?.errorCode === SESSION_LIMIT_EXCEEDED_ERROR_CODE ||
                err?.message?.includes("LLM_A006")
            ) {
                toast.error(t("limitExceededError"));
            } else {
                toast.error(err?.message || "Không thể gửi tin nhắn.");
            }
        } finally {
            setIsSendingMessage(false);
        }
    };

    const sendAudioMessage = async (audioBlob: Blob) => {
        if (isSendingMessage) return;
        const tempId = `temp-user-${Date.now()}`;
        const tempUserMsg: ChatMessageItem = {
            id: tempId,
            sender: "USER",
            content: "...",
            isPending: true,
        };

        try {
            setIsSendingMessage(true);
            setMessages((prev) => [...prev, tempUserMsg]);

            const res = await sendAudioMessageApi(sessionCode, audioBlob);

            const userMsgItem = mapMessageToItem(res.userMessage);
            const aiMsgItem = mapMessageToItem(res.aiMessage);

            setMessages((prev) =>
                prev
                    .map((m) => (m.id === tempId ? userMsgItem : m))
                    .concat(aiMsgItem),
            );
        } catch (err: any) {
            setMessages((prev) => prev.filter((m) => m.id !== tempId));
            if (
                err?.errorCode === SESSION_LIMIT_EXCEEDED_ERROR_CODE ||
                err?.message?.includes("LLM_A006")
            ) {
                toast.error(t("limitExceededError"));
            } else {
                toast.error(err?.message || "Không thể gửi file ghi âm.");
            }
        } finally {
            setIsSendingMessage(false);
        }
    };

    return (
        <LiveChatroomContext.Provider
            value={{
                sessionCode,
                status,
                sessionDetails,
                personaInfo,
                marugotoLevel,
                formalityLevel,
                speechSpeed,
                showSuggestions,
                messages,
                isLoading,
                isSendingMessage,
                isEndingSession,
                setSpeechSpeed,
                setShowSuggestions,
                sendTextMessage,
                sendAudioMessage,
                endChatSession,
            }}
        >
            {children}
        </LiveChatroomContext.Provider>
    );
};
