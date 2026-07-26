"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Drawer } from "@mui/material";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { ChatSidebar } from "./chat-sidebar";
import { MobileHeader } from "./mobile-header";
import { MessagesList } from "./messages-list";
import { SuggestionPills } from "./suggestion-pills";
import { ChatInputBar } from "../features/chat-input-bar";
import { useAudioRecorder } from "../hooks/use-audio-recorder";
import {
    DEFAULT_SUGGESTIONS,
    getCompanion,
} from "../constants/live-chatroom.constant";
import type { ChatMessage } from "../types/live-chatroom.type";
import { useChatStore } from "@/store/chatStore";
import {
    endSession,
    sendSessionAudio,
    sendTextMessage,
} from "@/services/client/speaking.service";
import { useRouter } from "@/i18n/navigation";

function nowTime() {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, "0")}:${d
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
}

let seq = 0;
const nextId = (p: string) => `${p}-${Date.now()}-${seq++}`;

export function LiveChatroom() {
    const router = useRouter();
    const t = useTranslations("liveChatroom");
    const config = useChatStore((s) => s.config);
    const session = useChatStore((s) => s.session);
    const setReport = useChatStore((s) => s.setReport);

    const companion = getCompanion(config?.companionId ?? "sakura");
    const showHints = config?.showHints ?? true;

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [audioProcessing, setAudioProcessing] = useState(false);
    const [ending, setEnding] = useState(false);
    const [voiceSpeed, setVoiceSpeed] = useState(config?.voiceSpeed ?? 1);
    const [mobileOpen, setMobileOpen] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const seeded = useRef(false);

    // Không có phiên → quay lại màn thiết lập.
    useEffect(() => {
        if (!session) router.replace("/dialogue-setup");
    }, [session, router]);

    // Seed câu chào của AI (kèm audio TTS nếu còn trong bộ nhớ).
    useEffect(() => {
        if (session && !seeded.current) {
            seeded.current = true;
            setMessages([
                {
                    id: nextId("greet"),
                    role: "ai",
                    text: session.aiGreeting,
                    audioBase64: session.greetingAudioBase64,
                    autoPlay: false,
                    timestamp: nowTime(),
                },
            ]);
        }
    }, [session]);

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isTyping, audioProcessing]);

    const appendAiReply = (text: string) => {
        setMessages((m) => [
            ...m,
            { id: nextId("ai"), role: "ai", text, timestamp: nowTime() },
        ]);
    };

    // Gửi text → BE /message (chỉ trả reply text).
    const handleSendText = async () => {
        const text = input.trim();
        if (!text || !session || isTyping) return;
        setInput("");
        setMessages((m) => [
            ...m,
            { id: nextId("u"), role: "user", text, timestamp: nowTime() },
        ]);
        setIsTyping(true);
        try {
            const res = await sendTextMessage(session.sessionId, text);
            appendAiReply(res.assistantReply);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t("sendError"));
        } finally {
            setIsTyping(false);
        }
    };

    // Gửi audio → BE /audio (transcript + điểm phát âm + reply).
    // BE trả cả transcript lẫn reply trong 1 lần; UI tách 2 nhịp cho tự nhiên:
    // (1) xử lý giọng nói của bạn, (2) câu của bạn lên, (3) Tanaka soạn trả lời.
    const handleSendAudio = async (blob: Blob) => {
        if (!session) return;
        setAudioProcessing(true);
        try {
            const res = await sendSessionAudio(session.sessionId, blob);
            setAudioProcessing(false);
            setMessages((m) => [
                ...m,
                {
                    id: nextId("u"),
                    role: "user",
                    text: res.transcribedText,
                    pronunciationScore: res.pronunciationScore,
                    timestamp: nowTime(),
                },
            ]);
            setIsTyping(true);
            await new Promise((r) => setTimeout(r, 700));
            appendAiReply(res.assistantReply);
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t("sendError"));
        } finally {
            setAudioProcessing(false);
            setIsTyping(false);
        }
    };

    const {
        isRecording,
        micStream,
        startRecording,
        stopRecording,
        cancelRecording,
    } = useAudioRecorder(handleSendAudio);

    const handleToggleRecord = () => {
        if (isRecording) stopRecording();
        else startRecording();
    };

    const handlePickSuggestion = (text: string) => {
        setInput((prev) => (prev ? prev + " " + text : text));
    };

    const handleEndSession = async () => {
        if (!session || ending) return;
        setEnding(true);
        try {
            const report = await endSession(session.sessionId, {
                topic: companion.name,
            });
            setReport(report);
            router.push("/speaking-result");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t("endError"));
            setEnding(false);
        }
    };

    const suggestions = useMemo(() => DEFAULT_SUGGESTIONS, []);

    if (!session) return null;

    const sidebarProps = {
        companion,
        voiceSpeed,
        onVoiceSpeedChange: setVoiceSpeed,
        onEndSession: handleEndSession,
        ending,
    };

    return (
        <div className="border-bdc-primary bg-bgc-app flex h-[calc(100vh-140px)] w-full overflow-hidden rounded-xl border shadow-sm">
            {/* Desktop sidebar */}
            <div className="hidden w-72 shrink-0 lg:block">
                <ChatSidebar {...sidebarProps} />
            </div>

            {/* Mobile Sidebar (Drawer) */}
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

            {/* Main chat area */}
            <div className="bg-bgc-page/20 flex min-w-0 flex-1 flex-col">
                <MobileHeader
                    companion={companion}
                    onOpenSettings={() => setMobileOpen(true)}
                />

                <MessagesList
                    messages={messages}
                    isTyping={isTyping}
                    audioProcessing={audioProcessing}
                    companion={companion}
                    voiceSpeed={voiceSpeed}
                    scrollRef={scrollRef}
                />

                <div className="border-bdc-primary bg-bgc-app border-t px-4 py-4 sm:px-6">
                    <div className="mx-auto flex max-w-3xl flex-col gap-3">
                        {showHints && (
                            <SuggestionPills
                                suggestions={suggestions}
                                onPick={handlePickSuggestion}
                            />
                        )}
                        <ChatInputBar
                            value={input}
                            onChange={setInput}
                            onSend={handleSendText}
                            isRecording={isRecording}
                            micStream={micStream}
                            onToggleRecord={handleToggleRecord}
                            onCancelRecord={cancelRecording}
                            disabled={isTyping || audioProcessing || ending}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LiveChatroom;
