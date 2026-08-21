"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Drawer } from "@mui/material";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { ChatSidebar } from "../components/chat.sidebar";
import { MobileHeader } from "../components/mobile.header";
import { MessagesList } from "../components/messages.list";
import { SuggestionPills } from "../components/suggestion.pills";
import { ReadyStartCard } from "../components/ready.start.card";
import { ChatInputBar } from "./chat.input.bar";
import { useAudioRecorder } from "../hooks/use.audio.recorder";
import { useLiveChat } from "../hooks/use.live.chat";
import { COMPANIONS, DEFAULT_SUGGESTIONS, getCompanion } from "../constants/live.chatroom.constant";
import { useChatStore } from "@/store/chatStore";
import { useRouter } from "@/i18n/navigation";
import type { SpeakingSessionResponse } from "@/types/responses/speaking.llm.response";
import { endSpeakingSession } from "@/services/client/speaking.llm.service";

interface LiveChatroomProps {
    sessionCode: string;
    initialSession?: SpeakingSessionResponse | null;
}

export function LiveChatroom({
    sessionCode,
    initialSession,
}: Readonly<LiveChatroomProps>) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const t = useTranslations("liveChatroom");
    const config = useChatStore((s) => s.config);

    const [input, setInput] = useState("");
    const [ending, setEnding] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const {
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
    } = useLiveChat(sessionCode, initialSession);

    const companion = useMemo(() => {
        if (config?.companionId) return getCompanion(config.companionId);
        const personaId =
            initialSession?.personaId ?? sessionDetails?.personaId;
        if (personaId) {
            const found = COMPANIONS.find(
                (c) => c.personaId === personaId,
            );
            if (found) return found;
        }
        return COMPANIONS[0];
    }, [config?.companionId, initialSession?.personaId, sessionDetails?.personaId]);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isTyping, audioProcessing]);

    const onSendTextMessage = async () => {
        const text = input.trim();
        if (!text) return;
        setInput("");
        await handleSendText(text);
    };

    const {
        isRecording,
        micStream,
        startRecording,
        stopRecording,
        cancelRecording,
    } = useAudioRecorder(handleSendAudio);

    const handleToggleRecord = () =>
        isRecording ? stopRecording() : startRecording();

    const handleEndSession = async () => {
        if (ending) return;
        setEnding(true);
        try {
            const report = await endSpeakingSession(sessionCode, {
                topic: initialSession?.topic ?? companion.name,
            });
            useChatStore.getState().setReport(report);
            useChatStore.getState().setSession(null);
            await queryClient.invalidateQueries();
            router.refresh();
            router.push("/speaking-result");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t("endError"));
            setEnding(false);
        }
    };

    const sidebarProps = {
        companion,
        onEndSession: handleEndSession,
        ending,
    };

    return (
        <div className="border-bdc-primary bg-bgc-app mx-auto flex h-[calc(100vh-120px)] w-full max-w-5xl overflow-hidden rounded-2xl border shadow-sm">
            <div className="hidden w-72 shrink-0 lg:block">
                <ChatSidebar {...sidebarProps} />
            </div>
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                className="[&_.MuiDrawer-paper]:bg-bgc-app [&_.MuiDrawer-paper]:border-bdc-primary [&_.MuiDrawer-paper]:box-border [&_.MuiDrawer-paper]:w-72 [&_.MuiDrawer-paper]:border-r"
            >
                <ChatSidebar
                    {...sidebarProps}
                    isMobile
                    onCloseMobile={() => setMobileOpen(false)}
                />
            </Drawer>
            <div className="bg-bgc-page/20 flex min-w-0 flex-1 flex-col">
                <MobileHeader
                    companion={companion}
                    onOpenSettings={() => setMobileOpen(true)}
                />
                {isLoading ? (
                    <div className="my-auto flex flex-1 items-center justify-center py-12">
                        <Loader2 className="text-bgc-highlight h-8 w-8 animate-spin" />
                    </div>
                ) : isInit ? (
                    <ReadyStartCard
                        companion={companion}
                        onReady={handleInitGreeting}
                        loading={isStartingGreeting}
                    />
                ) : (
                    <MessagesList
                        messages={messages}
                        isTyping={isTyping}
                        audioProcessing={audioProcessing}
                        companion={companion}
                        scrollRef={scrollRef}
                    />
                )}
                <div className="border-bdc-primary bg-bgc-app border-t px-4 py-4 sm:px-6">
                    <div className="mx-auto flex max-w-6xl flex-col gap-3">
                        {!isInit && !isLoading && (
                            <SuggestionPills
                                suggestions={suggestions ?? DEFAULT_SUGGESTIONS}
                                onPick={(t) =>
                                    setInput((p) => (p ? `${p} ${t}` : t))
                                }
                            />
                        )}
                        <ChatInputBar
                            value={input}
                            onChange={setInput}
                            onSend={onSendTextMessage}
                            isRecording={isRecording}
                            micStream={micStream}
                            onToggleRecord={handleToggleRecord}
                            onCancelRecord={cancelRecording}
                            disabled={
                                isInit ||
                                isLoading ||
                                isTyping ||
                                audioProcessing ||
                                ending
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiveChatroom;
