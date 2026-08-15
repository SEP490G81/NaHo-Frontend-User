import type { ChatMessage } from "../types/live-chatroom.type";
import type { SpeakingSessionResponse } from "@/types/responses/speaking.llm.response";

let seq = 0;

export function getNowTime(): string {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, "0")}:${d
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
}

export function getNextId(prefix: string): string {
    return `${prefix}-${Date.now()}-${seq++}`;
}

export function mapInitialMessages(
    sessionMessages?: SpeakingSessionResponse["messages"],
): ChatMessage[] {
    if (!sessionMessages || sessionMessages.length === 0) return [];
    return sessionMessages.map((m) => {
        const isUser = m.senderType?.toUpperCase().includes("USER");
        if (isUser) {
            return {
                id: `msg-${m.id || m.turnIndex || getNextId("u")}`,
                role: "user",
                text: m.content,
                pronunciationScore: m.pronunciationScore,
                correction: m.correctionExplanation
                    ? {
                          correctedText: m.correctedText ?? m.content,
                          explanation: m.correctionExplanation,
                      }
                    : null,
                timestamp: getNowTime(),
            };
        }
        return {
            id: `msg-${m.id || m.turnIndex || getNextId("ai")}`,
            role: "ai",
            text: m.content,
            translation: m.contentTranslation,
            grammar: m.grammarNote,
            audioBase64: m.aiReplyAudio ?? undefined,
            timestamp: getNowTime(),
        };
    });
}
