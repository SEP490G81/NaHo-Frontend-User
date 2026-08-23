"use client";

import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
    FormalityLevel,
    MarugotoLevel,
    PersonaResponse,
} from "@/types/responses/persona.response";
import { startConversation } from "@/services/client/speaking.llm.service";
import { PersonaSetupContextType } from "../types/persona.setup.type";
import { DEFAULT_SPEED } from "../constants/persona.setup.constant";

export const PersonaSetupContext =
    createContext<PersonaSetupContextType | undefined>(undefined);

export const PersonaSetupProvider = ({
    initialPersonas = [],
    children,
}: {
    readonly initialPersonas?: PersonaResponse[];
    readonly children: React.ReactNode;
}) => {
    const t = useTranslations("dialogueSetup");
    const router = useRouter();

    const [selectedPersona, setSelectedPersonaState] =
        useState<PersonaResponse | null>(null);
    const [marugotoLevel, setMarugotoLevel] =
        useState<MarugotoLevel>("STARTER_A1");
    const [formalityLevel, setFormalityLevel] =
        useState<FormalityLevel>("NEUTRAL");
    const [speechSpeed, setSpeechSpeed] = useState<number>(DEFAULT_SPEED);
    const [showSampleAnswers, setShowSampleAnswers] = useState<boolean>(true);
    const [isStarting, setIsStarting] = useState<boolean>(false);

    useEffect(() => {
        if (initialPersonas.length > 0 && !selectedPersona) {
            const first = initialPersonas[0];
            setSelectedPersonaState(first);
            if (first.defaultMarugotoLevel) {
                setMarugotoLevel(first.defaultMarugotoLevel);
            } else if (first.suggestedConversationStyle?.marugotoLevel) {
                setMarugotoLevel(first.suggestedConversationStyle.marugotoLevel);
            }
            if (first.defaultFormalityLevel) {
                setFormalityLevel(first.defaultFormalityLevel);
            } else if (first.suggestedConversationStyle?.formalityLevel) {
                setFormalityLevel(
                    first.suggestedConversationStyle.formalityLevel,
                );
            }
        }
    }, [initialPersonas, selectedPersona]);

    const setSelectedPersona = (persona: PersonaResponse) => {
        setSelectedPersonaState(persona);
        const level =
            persona.defaultMarugotoLevel ||
            persona.suggestedConversationStyle?.marugotoLevel;
        if (level) {
            setMarugotoLevel(level);
        }
        const formality =
            persona.defaultFormalityLevel ||
            persona.suggestedConversationStyle?.formalityLevel;
        if (formality) {
            setFormalityLevel(formality);
        }
    };

    const resetToDefaults = () => {
        if (!selectedPersona) return;
        const defaultLevel =
            selectedPersona.defaultMarugotoLevel ||
            selectedPersona.suggestedConversationStyle?.marugotoLevel ||
            "STARTER_A1";
        const defaultFormality =
            selectedPersona.defaultFormalityLevel ||
            selectedPersona.suggestedConversationStyle?.formalityLevel ||
            "NEUTRAL";
        setMarugotoLevel(defaultLevel);
        setFormalityLevel(defaultFormality);
    };

    const startChat = async () => {
        if (!selectedPersona) {
            toast.warning(t("companionUnavailable"));
            return;
        }

        try {
            setIsStarting(true);
            const sessionCode = await startConversation({
                personaId: selectedPersona.id,
                formalityLevel,
                marugotoLevel,
            });
            if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("refresh-chat-sessions"));
            }
            router.refresh();
            router.push(`/live-chatroom/${sessionCode}`);
        } catch (error: any) {
            toast.error(error?.message || t("startError"));
        } finally {
            setIsStarting(false);
        }
    };

    return (
        <PersonaSetupContext.Provider
            value={{
                selectedPersona,
                marugotoLevel,
                formalityLevel,
                speechSpeed,
                showSampleAnswers,
                isStarting,
                setSelectedPersona,
                setMarugotoLevel,
                setFormalityLevel,
                setSpeechSpeed,
                setShowSampleAnswers,
                resetToDefaults,
                startChat,
            }}
        >
            {children}
        </PersonaSetupContext.Provider>
    );
};
