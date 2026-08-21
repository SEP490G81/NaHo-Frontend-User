"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { CompanionList } from "../components/companion.list";
import { SetupHero } from "../components/setup.hero";
import { SummaryPanel } from "./summary.panel";
import { AdvancedSettingsForm } from "./advanced.settings.form";
import {
    COMPANIONS,
    DEFAULT_FORMALITY,
    DEFAULT_MARUGOTO,
    resolveCompanions,
} from "@/modules/protected/live-chatroom/constants/live.chatroom.constant";
import { getPersonas } from "@/services/client/speaking.service";
import {
    getMySubscription,
    getTodayAiUsage,
} from "@/services/client/subscription.service";
import type {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/responses/persona.response";
import SubscriptionModal from "@/modules/protected/settings/billing/features/subscription.modal";

export function DialogueSetup() {
    const t = useTranslations("dialogueSetup");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: personas, isLoading } = useQuery({
        queryKey: ["personas"],
        queryFn: getPersonas,
        staleTime: 5 * 60 * 1000,
    });

    const companions = useMemo(
        () => (personas?.length ? resolveCompanions(personas) : COMPANIONS),
        [personas],
    );

    const { data: subscription } = useQuery({
        queryKey: ["my-subscription"],
        queryFn: getMySubscription,
        staleTime: 5 * 60 * 1000,
    });
    const { data: aiUsage } = useQuery({
        queryKey: ["today-ai-usage"],
        queryFn: getTodayAiUsage,
        staleTime: 60 * 1000,
    });
    const aiLimit =
        subscription?.subscriptionPlan?.dailyAiSessionStartLimit ??
        subscription?.subscriptionPlan?.dailyAiSessionEvaluationLimit ??
        null;
    const aiUsed =
        aiUsage?.aiSessionStartCount ?? aiUsage?.aiSessionEvaluationCount ?? 0;
    const aiRemaining = aiLimit != null ? Math.max(0, aiLimit - aiUsed) : null;
    const aiExhausted = aiRemaining != null && aiRemaining <= 0;

    const currentTier =
        subscription?.subscriptionPlan?.tier ??
        subscription?.plan?.tier ??
        "FREE";

    const [selectedCompanionId, setSelectedCompanionId] = useState<
        string | null
    >(null);
    const [styleOverride, setStyleOverride] = useState<FormalityLevel | null>(
        null,
    );
    const [marugotoOverride, setMarugotoOverride] =
        useState<MarugotoLevel | null>(null);

    const activeCompanionId = useMemo(() => {
        if (selectedCompanionId) {
            const found = companions.find((c) => c.id === selectedCompanionId);
            if (found?.personaId != null) return found.id;
        }
        const firstAvailable = companions.find((c) => c.personaId != null);
        return firstAvailable?.id ?? companions[0]?.id ?? COMPANIONS[0].id;
    }, [companions, selectedCompanionId]);

    const selected =
        companions.find((c) => c.id === activeCompanionId) ?? companions[0];

    const conversationStyle =
        styleOverride ?? selected?.defaultFormality ?? DEFAULT_FORMALITY;
    const marugotoLevel =
        marugotoOverride ?? selected?.defaultMarugotoLevel ?? DEFAULT_MARUGOTO;

    const handleSelectCompanion = (id: string) => {
        setSelectedCompanionId(id);
        setStyleOverride(null);
        setMarugotoOverride(null);
    };

    return (
        <div className="mx-auto max-w-5xl space-y-5">
            <SetupHero
                aiLimit={aiLimit}
                aiRemaining={aiRemaining}
                aiExhausted={aiExhausted}
                onOpenUpgradeModal={() => setIsModalOpen(true)}
            />

            <div className="grid gap-5 lg:grid-cols-3">
                {/* Left: companion + advanced settings */}
                <div className="space-y-5 lg:col-span-2">
                    <div className="border-bdc-primary bg-bgc-app rounded-2xl border p-5 shadow-sm sm:p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-text-contrast text-base font-semibold">
                                {t("companionHeader")}
                            </h2>
                            <span className="text-text-muted text-xs">
                                {t("companionCount", {
                                    count: companions.length,
                                })}
                            </span>
                        </div>
                        <CompanionList
                            companions={companions}
                            selectedId={activeCompanionId}
                            onSelect={handleSelectCompanion}
                            loading={isLoading}
                        />
                    </div>

                    <AdvancedSettingsForm
                        conversationStyle={conversationStyle}
                        marugotoLevel={marugotoLevel}
                        onStyleChange={setStyleOverride}
                        onMarugotoChange={setMarugotoOverride}
                    />
                </div>

                {/* Right: sticky summary */}
                <div className="lg:col-span-1">
                    <SummaryPanel
                        companion={selected}
                        conversationStyle={conversationStyle}
                        marugotoLevel={marugotoLevel}
                        isQuotaExhausted={aiExhausted}
                    />
                </div>
            </div>

            <SubscriptionModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentPlanTier={currentTier}
            />
        </div>
    );
}

export default DialogueSetup;
