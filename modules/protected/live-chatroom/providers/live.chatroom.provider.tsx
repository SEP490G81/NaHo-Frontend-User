"use client";

import React, { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
    SpeakingSessionMessageResponse,
    SpeakingSessionResponse,
} from "@/types/responses/speaking.llm.response";
import { useRouter } from "@/i18n/navigation";
import {
    endSpeakingSession,
    sendAudioMessage as sendAudioMessageApi,
    sendTextMessage as sendTextMessageApi,
} from "@/services/client/speaking.llm.service";
import { useQueryClient } from "@tanstack/react-query";
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

interface LiveChatroomProviderProps {
    readonly sessionCode: string;
    readonly initialSessionDetails?: SpeakingSessionResponse | null;
    readonly status?: string;
    readonly children: React.ReactNode;
}

export const LiveChatroomProvider = ({
    sessionCode,
    initialSessionDetails,
    status = "IN_PROGRESS",
    children,
}: LiveChatroomProviderProps) => {
    const t = useTranslations("liveChatroom");
    const router = useRouter();
    const queryClient = useQueryClient();

    const sessionDetails = initialSessionDetails || null;
    const personaInfo = initialSessionDetails?.persona || null;
    const marugotoLevel = initialSessionDetails?.marugotoLevel || "STARTER_A1";
    const formalityLevel = initialSessionDetails?.formalityLevel || "NEUTRAL";
    const [speechSpeed, setSpeechSpeed] = useState<number>(
        DEFAULT_CHAT_SPEECH_SPEED,
    );
    const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
    const [messages, setMessages] = useState<ChatMessageItem[]>(() => {
        const msgList =
            initialSessionDetails?.speakingSessionMessages ||
            initialSessionDetails?.messages ||
            [];
        return msgList.map(mapMessageToItem);
    });
    const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);
    const [isEndingSession, setIsEndingSession] = useState<boolean>(false);

    const endChatSession = async () => {
        if (isEndingSession) return;
        if (messages.length <= 1) {
            toast.warning(
                t("endSessionMinMessagesWarning") ||
                "Phiên trò chuyện chưa có tương tác từ bạn. Vui lòng gửi ít nhất 1 tin nhắn cho AI trước khi kết thúc để nhận báo cáo đánh giá.",
            );
            return;
        }

        try {
            setIsEndingSession(true);
            await endSpeakingSession(sessionCode);

            // làm mới cache streak và nhiệm vụ hàng ngày ở header
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: ["user-learning-progress"],
                }),
                queryClient.invalidateQueries({
                    queryKey: ["user-daily-missions"],
                }),
            ]);

            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("refresh-chat-sessions"));
                window.dispatchEvent(new CustomEvent("refresh-daily-missions"));
            }
            router.refresh();
            router.push(`/chat-result/${sessionCode}`);
        } catch (err: unknown) {
            const errObj = err as { message?: string; errorCode?: string };
            let errorMsg =
                errObj?.message || "Không thể kết thúc phiên hội thoại.";
            if (
                errObj?.errorCode === "LLM_A005" ||
                errorMsg.includes("LLM_A005")
            ) {
                errorMsg =
                    t("endSessionMinMessagesError") ||
                    "Bạn cần gửi ít nhất 1 tin nhắn cho AI trước khi kết thúc phiên trò chuyện.";
            }
            toast.error(errorMsg);
        } finally {
            setIsEndingSession(false);
        }
    };

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
        } catch (err: unknown) {
            setMessages((prev) => prev.filter((m) => m.id !== tempId));
            const errObj = err as { errorCode?: string; message?: string };
            if (
                errObj?.errorCode === SESSION_LIMIT_EXCEEDED_ERROR_CODE ||
                errObj?.message?.includes("LLM_A006")
            ) {
                toast.error(t("limitExceededError"));
            } else {
                toast.error(errObj?.message || "Không thể gửi tin nhắn.");
            }
        } finally {
            setIsSendingMessage(false);
        }
    };

    const sendAudioMessage = async (audioBlob: Blob) => {
        if (isSendingMessage) return;
        const tempId = `temp-user-${Date.now()}`;
        const analysisSteps = [
            t("analyzingVoice") || "Đang phân tích giọng nói",
            t("analyzingContent") || "Đang phân tích nội dung",
            t("analyzingGrammar") || "Đang phân tích từ vựng, ngữ pháp",
        ];

        const tempUserMsg: ChatMessageItem = {
            id: tempId,
            sender: "USER",
            content: analysisSteps[0],
            isPending: true,
        };

        let stepIndex = 0;
        let intervalId: NodeJS.Timeout | null = null;

        try {
            setIsSendingMessage(true);
            setMessages((prev) => [...prev, tempUserMsg]);

            intervalId = setInterval(() => {
                stepIndex++;
                if (stepIndex < analysisSteps.length) {
                    const nextContent = analysisSteps[stepIndex];
                    setMessages((prev) =>
                        prev.map((m) =>
                            m.id === tempId
                                ? { ...m, content: nextContent }
                                : m,
                        ),
                    );
                } else if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }, 3600);

            const res = await sendAudioMessageApi(sessionCode, audioBlob);

            const userMsgItem = mapMessageToItem(res.userMessage);
            const aiMsgItem = mapMessageToItem(res.aiMessage);

            setMessages((prev) =>
                prev
                    .map((m) => (m.id === tempId ? userMsgItem : m))
                    .concat(aiMsgItem),
            );
        } catch (err: unknown) {
            setMessages((prev) => prev.filter((m) => m.id !== tempId));
            const errObj = err as { errorCode?: string; message?: string };
            if (
                errObj?.errorCode === SESSION_LIMIT_EXCEEDED_ERROR_CODE ||
                errObj?.message?.includes("LLM_A006")
            ) {
                toast.error(t("limitExceededError"));
            } else {
                toast.error(errObj?.message || "Không thể gửi file ghi âm.");
            }
        } finally {
            if (intervalId) {
                clearInterval(intervalId);
            }
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
