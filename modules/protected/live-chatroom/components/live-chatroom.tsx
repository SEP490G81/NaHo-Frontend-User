"use client";
import { useEffect, useRef, useState } from "react";
import { Drawer } from "@mui/material";
import { ChatSidebar } from "./chat-sidebar";
import { MobileHeader } from "./mobile-header";
import { MessagesList } from "./messages-list";
import { SuggestionPills } from "./suggestion-pills";
import { ChatInputBar } from "../features/chat-input-bar";
import { useAudioRecorder } from "../hooks/use-audio-recorder";
import {
    AI_FOLLOWUPS,
    DEFAULT_SUGGESTIONS,
    getCompanion,
    INITIAL_MESSAGES,
} from "../constants/live-chatroom.constant";
import type { ChatMessage } from "../types/live-chatroom.type";
import { useChatStore } from "@/store/chatStore";
import { useRouter } from "@/i18n/navigation";

function nowTime() {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, "0")}:${d
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
}

export function LiveChatroom() {
    const router = useRouter();
    const config = useChatStore((s) => s.config);

    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [showFurigana, setShowFurigana] = useState(true);
    const [autoTranslate, setAutoTranslate] = useState(
        config?.showTranslation ?? true,
    );
    const [followupIdx, setFollowupIdx] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const companion = getCompanion(config?.companionId ?? "sakura");
    const showHints = config?.showHints ?? true;

    useEffect(() => {
        if (!config) {
            router.replace("/dialogue-setup");
        }
    }, [config, router]);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isTyping]);

    useEffect(() => {
        return () => {
            if (replyTimer.current) clearTimeout(replyTimer.current);
        };
    }, []);

    const sendUserMessage = (text: string) => {
        const userMsg: ChatMessage = {
            id: `u-${Date.now()}`,
            role: "user",
            text,
            timestamp: nowTime(),
        };
        setMessages((m) => [...m, userMsg]);
        setInput("");
        setIsTyping(true);

        replyTimer.current = setTimeout(() => {
            const followup = AI_FOLLOWUPS[followupIdx % AI_FOLLOWUPS.length];
            setFollowupIdx((i) => i + 1);
            const aiMsg: ChatMessage = {
                ...followup,
                id: `a-${Date.now()}`,
                timestamp: nowTime(),
                autoPlay: true,
            };
            setMessages((m) => [...m, aiMsg]);
            setIsTyping(false);
        }, 6000);
    };

    // Connect Web Audio API hooks
    const {
        isRecording,
        micStream,
        startRecording,
        stopRecording,
        cancelRecording,
    } = useAudioRecorder(sendUserMessage);

    const handleSend = () => {
        const text = input.trim();
        if (!text) return;
        sendUserMessage(text);
    };

    const handleToggleRecord = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const handlePickSuggestion = (text: string) => {
        setInput((prev) => (prev ? prev + " " + text : text));
    };

    if (!config) return null;

    return (
        <div className="border-bdc-primary bg-bgc-app flex h-[calc(100vh-140px)] w-full overflow-hidden rounded-xl border shadow-sm">
            {/* Desktop sidebar */}
            <div className="hidden w-72 shrink-0 lg:block">
                <ChatSidebar
                    showFurigana={showFurigana}
                    onToggleFurigana={setShowFurigana}
                    autoTranslate={autoTranslate}
                    onToggleAutoTranslate={setAutoTranslate}
                />
            </div>

            {/* Mobile Sidebar (Drawer) */}
            <Drawer
                anchor="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                className="[&_.MuiDrawer-paper]:bg-bgc-app [&_.MuiDrawer-paper]:border-bdc-primary [&_.MuiDrawer-paper]:box-border [&_.MuiDrawer-paper]:w-72 [&_.MuiDrawer-paper]:border-r"
            >
                <ChatSidebar
                    showFurigana={showFurigana}
                    onToggleFurigana={setShowFurigana}
                    autoTranslate={autoTranslate}
                    onToggleAutoTranslate={setAutoTranslate}
                    isMobile={true}
                    onCloseMobile={() => setMobileOpen(false)}
                />
            </Drawer>

            {/* Main chat area */}
            <div className="bg-bgc-page/20 flex min-w-0 flex-1 flex-col">
                {/* Mobile header */}
                <MobileHeader
                    companion={companion}
                    onOpenSettings={() => setMobileOpen(true)}
                />

                {/* Scrollable messages */}
                <MessagesList
                    messages={messages}
                    isTyping={isTyping}
                    companion={companion}
                    showFurigana={showFurigana}
                    autoTranslate={autoTranslate}
                    scrollRef={scrollRef}
                />

                {/* Bottom controller */}
                <div className="border-bdc-primary bg-bgc-app border-t px-4 py-4 sm:px-6">
                    <div className="mx-auto flex max-w-3xl flex-col gap-3">
                        {showHints && (
                            <SuggestionPills
                                suggestions={DEFAULT_SUGGESTIONS}
                                onPick={handlePickSuggestion}
                            />
                        )}
                        <ChatInputBar
                            value={input}
                            onChange={setInput}
                            onSend={handleSend}
                            isRecording={isRecording}
                            micStream={micStream}
                            onToggleRecord={handleToggleRecord}
                            onCancelRecord={cancelRecording}
                            disabled={isTyping}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiveChatroom;
