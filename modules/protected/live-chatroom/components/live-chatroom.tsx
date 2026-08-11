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
    const conversationStyle = config?.conversationStyle ?? "NEUTRAL";

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [audioProcessing, setAudioProcessing] = useState(false);
    const [ending, setEnding] = useState(false);
    const [voiceSpeed, setVoiceSpeed] = useState(config?.voiceSpeed ?? 1);
    const [showHints, setShowHints] = useState(config?.showHints ?? true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const seeded = useRef(false);

    // Không có phiên → quay lại màn thiết lập.
    useEffect(() => {
        if (!session) router.replace("/dialogue-setup");
    }, [session, router]);

    // Seed: tin nhắn cũ (nếu resume) + câu chào (kèm audio/dịch/ngữ pháp).
    useEffect(() => {
        if (session && !seeded.current) {
            seeded.current = true;

            // Dựng lại lịch sử khi khôi phục phiên dở.
            const history: ChatMessage[] = (session.resumedMessages ?? []).map(
                (m) => {
                    const isUser = m.senderType
                        ?.toUpperCase()
                        .includes("USER");
                    if (isUser) {
                        return {
                            id: nextId("h"),
                            role: "user",
                            text: m.content,
                            correction: m.correctionExplanation
                                ? {
                                      correctedText:
                                          m.correctedText ?? m.content,
                                      explanation: m.correctionExplanation,
                                  }
                                : null,
                            timestamp: "",
                        };
                    }
                    return {
                        id: nextId("h"),
                        role: "ai",
                        text: m.content,
                        grammar: m.grammarNote,
                        timestamp: "",
                    };
                },
            );

            setMessages([
                ...history,
                {
                    id: nextId("greet"),
                    role: "ai",
                    text: session.aiGreeting,
                    translation: session.greetingTranslation,
                    grammar: session.greetingGrammar,
                    audioBase64: session.greetingAudioBase64,
                    // Tự phát câu chào khi vào phòng (trình duyệt có thể chặn
                    // nếu thiếu tương tác — khi đó nút play vẫn còn để bấm tay).
                    autoPlay: true,
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

    interface AiReplyPayload {
        text: string;
        translation?: string | null;
        grammar?: string | null;
        audioBase64?: string | null;
    }

    // Reply của AI kèm bản dịch / ngữ pháp / TTS. Có audio → tự phát nối tiếp.
    const appendAiReply = (p: AiReplyPayload) => {
        setMessages((m) => [
            ...m,
            {
                id: nextId("ai"),
                role: "ai",
                text: p.text,
                translation: p.translation,
                grammar: p.grammar,
                audioBase64: p.audioBase64 ?? undefined,
                autoPlay: !!p.audioBase64,
                timestamp: nowTime(),
            },
        ]);
    };

    // Gắn đề xuất sửa lỗi vào một tin nhắn người dùng (theo id).
    const attachCorrection = (
        id: string,
        corrected: string | null,
        explanation: string | null,
    ) => {
        if (!explanation) return;
        setMessages((m) =>
            m.map((msg) =>
                msg.id === id && msg.role === "user"
                    ? {
                          ...msg,
                          correction: {
                              correctedText: corrected ?? msg.text,
                              explanation,
                          },
                      }
                    : msg,
            ),
        );
    };

    // Gửi text → BE /message (reply + bản dịch + ngữ pháp + sửa lỗi + TTS).
    const handleSendText = async () => {
        const text = input.trim();
        if (!text || !session || isTyping) return;
        setInput("");
        const userId = nextId("u");
        setMessages((m) => [
            ...m,
            { id: userId, role: "user", text, timestamp: nowTime() },
        ]);
        setIsTyping(true);
        try {
            const res = await sendTextMessage(session.sessionId, text);
            attachCorrection(
                userId,
                res.correctedUserText,
                res.correctionExplanation,
            );
            appendAiReply({
                text: res.assistantReply,
                translation: res.assistantReplyTranslation,
                grammar: res.grammarExplanation,
                audioBase64: res.aiReplyAudio,
            });
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t("sendError"));
        } finally {
            setIsTyping(false);
        }
    };

    // Gửi audio → BE /audio (transcript + điểm + sửa lỗi + reply + TTS).
    // Tách 2 nhịp cho tự nhiên: (1) câu của bạn lên, (2) AI soạn trả lời.
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
                    correction: res.correctionExplanation
                        ? {
                              correctedText:
                                  res.correctedUserText ?? res.transcribedText,
                              explanation: res.correctionExplanation,
                          }
                        : null,
                    timestamp: nowTime(),
                },
            ]);
            setIsTyping(true);
            await new Promise((r) => setTimeout(r, 700));
            appendAiReply({
                text: res.assistantReply,
                translation: res.assistantReplyTranslation,
                grammar: res.grammarExplanation,
                audioBase64: res.aiReplyAudio,
            });
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
        conversationStyle,
        voiceSpeed,
        onVoiceSpeedChange: setVoiceSpeed,
        showHints,
        onShowHintsChange: setShowHints,
        onEndSession: handleEndSession,
        ending,
    };

    return (
        <div className="border-bdc-primary bg-bgc-app flex h-[calc(100vh-120px)] w-full overflow-hidden rounded-2xl border shadow-sm">
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
                    <div className="mx-auto flex max-w-6xl flex-col gap-3">
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
