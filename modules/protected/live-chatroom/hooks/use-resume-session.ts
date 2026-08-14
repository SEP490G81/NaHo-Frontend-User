"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import {
    getActiveSession,
    resumeSession,
} from "@/services/client/speaking.service";
import { useChatStore } from "@/store/chatStore";
import { useRouter } from "@/i18n/navigation";
import {
    DEFAULT_FORMALITY,
    DEFAULT_MARUGOTO,
} from "../constants/live-chatroom.constant";
import type { Companion } from "../types/live-chatroom.type";
import type {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/responses/persona.response";
import type { SessionMessageItem } from "@/types/responses/speaking.response";

/** Thông tin tối thiểu để khôi phục một phiên dở (từ banner hoặc list lịch sử). */
export interface ResumeTarget {
    sessionCode: string;
    personaId: number | null;
    formalityLevel: string | null;
    marugotoLevel: string | null;
    /** Tin nhắn cũ nếu đã có sẵn (vd từ /active); thiếu thì hook tự nạp. */
    messages?: SessionMessageItem[];
}

interface ResumeOptions {
    voiceSpeed?: number;
    showHints?: boolean;
}

/**
 * Khôi phục một phiên AI 1:1 đang dở rồi điều hướng vào phòng chat. Dùng chung
 * cho màn Thiết lập (banner) và màn Lịch sử (bấm vào phiên IN_PROGRESS).
 * `resumingCode` = sessionCode đang khôi phục để hiển thị loading đúng item.
 */
export function useResumeSession(companions: Companion[]) {
    const t = useTranslations("dialogueSetup");
    const router = useRouter();
    const setConfig = useChatStore((s) => s.setConfig);
    const setSession = useChatStore((s) => s.setSession);
    const [resumingCode, setResumingCode] = useState<string | null>(null);

    const resume = async (target: ResumeTarget, opts: ResumeOptions = {}) => {
        setResumingCode(target.sessionCode);
        try {
            // Nạp tin nhắn cũ nếu chưa có: /active lọc theo personaId, chỉ dùng
            // khi trùng sessionCode (tránh lấy nhầm phiên khác cùng persona).
            let messages = target.messages;
            if (!messages) {
                const active = await getActiveSession(
                    target.personaId ?? undefined,
                );
                messages =
                    active?.sessionCode === target.sessionCode
                        ? active.messages
                        : [];
            }

            const res = await resumeSession(target.sessionCode);
            const comp =
                (target.personaId != null
                    ? companions.find((c) => c.personaId === target.personaId)
                    : undefined) ??
                companions[0];

            setConfig({
                companionId: comp.id,
                conversationStyle:
                    (target.formalityLevel as FormalityLevel) ??
                    comp.defaultFormality ??
                    DEFAULT_FORMALITY,
                marugotoLevel:
                    (target.marugotoLevel as MarugotoLevel) ??
                    comp.defaultMarugotoLevel ??
                    DEFAULT_MARUGOTO,
                voiceSpeed: opts.voiceSpeed ?? 1,
                showHints: opts.showHints ?? true,
            });
            setSession({
                sessionId: res.sessionId || target.sessionCode,
                personaId: target.personaId ?? comp.personaId ?? 0,
                companionId: comp.id,
                aiGreeting: res.aiGreeting,
                greetingTranslation: res.aiGreetingTranslation,
                greetingGrammar: res.grammarExplanation,
                greetingAudioBase64: res.audioBase64,
                resumedMessages: messages ?? [],
            });
            router.push("/live-chatroom");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : t("resumeError"));
            setResumingCode(null);
        }
    };

    return { resume, resumingCode };
}
