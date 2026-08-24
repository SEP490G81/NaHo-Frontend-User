"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import {
    FormalityLevel,
    MarugotoLevel,
    PersonaResponse,
} from "@/types/responses/persona.response";
import {
    UserDailyAiUsageResponse,
    UserSubscriptionResponse,
} from "@/types/responses/subscription.response";
import { SpeakingSessionListItemResponse } from "@/types/responses/speaking.llm.response";
import {
    getSpeakingSessionsByStatus,
    startConversation,
} from "@/services/client/speaking.llm.service";
import {
    getMySubscription,
    getTodayAiUsage,
} from "@/services/client/subscription.service";
import { PersonaSetupContextType } from "../types/persona.setup.type";
import { DEFAULT_SPEED } from "../constants/persona.setup.constant";

export const PersonaSetupContext = createContext<
    PersonaSetupContextType | undefined
>(undefined);

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
        useState<PersonaResponse | null>(
            () => (initialPersonas.length > 0 ? initialPersonas[0] : null),
        );
    const [marugotoLevel, setMarugotoLevel] = useState<MarugotoLevel>(
        () =>
            initialPersonas[0]?.defaultMarugotoLevel ||
            initialPersonas[0]?.suggestedConversationStyle?.marugotoLevel ||
            "STARTER_A1",
    );
    const [formalityLevel, setFormalityLevel] = useState<FormalityLevel>(
        () =>
            initialPersonas[0]?.defaultFormalityLevel ||
            initialPersonas[0]?.suggestedConversationStyle?.formalityLevel ||
            "NEUTRAL",
    );
    const [speechSpeed, setSpeechSpeed] = useState<number>(DEFAULT_SPEED);
    const [showSampleAnswers, setShowSampleAnswers] = useState<boolean>(true);
    const [isStarting, setIsStarting] = useState<boolean>(false);

    // Subscription, Daily Usage & In-Progress sessions state
    const [todayUsage, setTodayUsage] =
        useState<UserDailyAiUsageResponse | null>(null);
    const [subscription, setSubscription] =
        useState<UserSubscriptionResponse | null>(null);
    const [inProgressSessions, setInProgressSessions] = useState<
        SpeakingSessionListItemResponse[]
    >([]);
    const [isLoadingUsage, setIsLoadingUsage] = useState<boolean>(true);

    const refreshUsage = useCallback(async () => {
        try {
            setIsLoadingUsage(true);
            const [usageRes, subRes, inProgRes] = await Promise.allSettled([
                getTodayAiUsage(),
                getMySubscription(),
                getSpeakingSessionsByStatus("IN_PROGRESS"),
            ]);
            if (usageRes.status === "fulfilled") {
                setTodayUsage(usageRes.value);
            }
            if (subRes.status === "fulfilled") {
                setSubscription(subRes.value);
            }
            if (inProgRes.status === "fulfilled") {
                setInProgressSessions(inProgRes.value || []);
            }
        } catch {
            // ignore fetch errors
        } finally {
            setIsLoadingUsage(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void refreshUsage();

        const handleRefresh = () => {
            void refreshUsage();
        };

        if (typeof window !== "undefined") {
            window.addEventListener("refresh-chat-sessions", handleRefresh);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("refresh-chat-sessions", handleRefresh);
            }
        };
    }, [refreshUsage]);

    // Limit calculations
    const plan = subscription?.subscriptionPlan || subscription?.plan;
    const planName =
        plan?.name ||
        (plan?.code === "PREMIUM"
            ? "Premium"
            : plan?.code === "BASIC"
              ? "Basic"
              : "Miễn phí (Free)");

    const dailyLimit =
        plan?.dailyAiSessionStartLimit ??
        (plan?.code === "PREMIUM" ? 50 : plan?.code === "BASIC" ? 15 : 3);
    const dailyUsed = todayUsage?.aiSessionStartCount ?? 0;
    const isDailyLimitReached = dailyLimit > 0 && dailyUsed >= dailyLimit;

    const maxConcurrent = plan?.maxConcurrentAiSessionCount ?? 1;
    const inProgressSessionsCount = inProgressSessions.length;
    const isConcurrentLimitReached = inProgressSessionsCount >= maxConcurrent;

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

        if (isDailyLimitReached) {
            toast.error(t("quotaExhaustedMsg"));
            return;
        }

        if (isConcurrentLimitReached) {
            toast.error(
                t("concurrentLimitExceededMsg", {
                    count: inProgressSessionsCount,
                    max: maxConcurrent,
                }),
            );
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
        } catch (error: unknown) {
            const errObj = error as { message?: string };
            toast.error(errObj?.message || t("startError"));
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
                todayUsage,
                subscription,
                inProgressSessionsCount,
                dailyLimit,
                dailyUsed,
                isDailyLimitReached,
                maxConcurrent,
                isConcurrentLimitReached,
                isLoadingUsage,
                planName,
                setSelectedPersona,
                setMarugotoLevel,
                setFormalityLevel,
                setSpeechSpeed,
                setShowSampleAnswers,
                resetToDefaults,
                startChat,
                refreshUsage,
            }}
        >
            {children}
        </PersonaSetupContext.Provider>
    );
};
