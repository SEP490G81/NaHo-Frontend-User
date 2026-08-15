"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { CompanionList } from "./companion-list";
import { SetupHero } from "./setup-hero";
import { SummaryPanel } from "../features/summary-panel";
import { AdvancedSettingsForm } from "../features/advanced-settings-form";
import {
    COMPANIONS,
    DEFAULT_FORMALITY,
    DEFAULT_MARUGOTO,
    resolveCompanions,
} from "@/modules/protected/live-chatroom/constants/live-chatroom.constant";
import { getPersonas } from "@/services/client/speaking.service";
import {
    getMySubscription,
    getTodayAiUsage,
} from "@/services/client/subscription.service";
import { useAuthStore } from "@/store/authStore";
import type {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/responses/persona.response";
import SubscriptionModal from "@/modules/protected/settings/billing/features/subscription.modal";

export function DialogueSetup() {
    const t = useTranslations("dialogueSetup");
    const tGuide = useTranslations("userGuide.tour");
    const level = useAuthStore((s) => s.profile?.level);
    const startTour = useTourStore((s) => s.startTour);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hybrid: giữ metadata UI đẹp, gắn personaId + style mặc định từ GET /personas.
    const { data: personas, isLoading } = useQuery({
        queryKey: ["personas"],
        queryFn: getPersonas,
        staleTime: 5 * 60 * 1000,
    });

    const companions = useMemo(
        () => (personas?.length ? resolveCompanions(personas) : COMPANIONS),
        [personas],
    );

    // Quota AI 1:1 hôm nay = lượt đã dùng / hạn mức của gói.
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

    const [companionId, setCompanionId] = useState(COMPANIONS[0].id);
    const [styleOverride, setStyleOverride] = useState<FormalityLevel | null>(
        null,
    );
    const [marugotoOverride, setMarugotoOverride] =
        useState<MarugotoLevel | null>(null);
    const [voiceSpeed, setVoiceSpeed] = useState(1.0);
    const [showHints, setShowHints] = useState(true);

    const selected =
        companions.find((c) => c.id === companionId) ?? companions[0];

    const conversationStyle =
        styleOverride ?? selected?.defaultFormality ?? DEFAULT_FORMALITY;
    const marugotoLevel =
        marugotoOverride ?? selected?.defaultMarugotoLevel ?? DEFAULT_MARUGOTO;

    const handleSelectCompanion = (id: string) => {
        setCompanionId(id);
        setStyleOverride(null);
        setMarugotoOverride(null);
    };

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
            <SetupHero
                level={level}
                aiLimit={aiLimit}
                aiRemaining={aiRemaining}
                aiExhausted={aiExhausted}
                onOpenUpgradeModal={() => setIsModalOpen(true)}
            />

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left: companion + advanced settings */}
                <div className="space-y-6 lg:col-span-2">
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
                            selectedId={companionId}
                            onSelect={handleSelectCompanion}
                            loading={isLoading}
                        />
                    </div>

                    <AdvancedSettingsForm
                        conversationStyle={conversationStyle}
                        marugotoLevel={marugotoLevel}
                        voiceSpeed={voiceSpeed}
                        showHints={showHints}
                        onStyleChange={setStyleOverride}
                        onMarugotoChange={setMarugotoOverride}
                        onVoiceSpeedChange={setVoiceSpeed}
                        onShowHintsChange={setShowHints}
                    />
                </div>

                {/* Right: sticky summary */}
                <div className="lg:col-span-1">
                    <SummaryPanel
                        companion={selected}
                        conversationStyle={conversationStyle}
                        marugotoLevel={marugotoLevel}
                        voiceSpeed={voiceSpeed}
                        showHints={showHints}
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
