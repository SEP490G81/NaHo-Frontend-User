"use client";
import { useMemo, useState } from "react";
import { History, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { CompanionList } from "./companion-list";
import { SummaryPanel } from "./summary-panel";
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
import { Link } from "@/i18n/navigation";
import type {
    FormalityLevel,
    MarugotoLevel,
} from "@/types/responses/persona.response";

import UpdatePlanButton from "@/modules/protected/settings/billing/components/update.plan.button";
import SubscriptionModal from "@/modules/protected/settings/billing/features/subscription.modal";

export function DialogueSetup() {
    const t = useTranslations("dialogueSetup");
    const level = useAuthStore((s) => s.profile?.level);
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
    // null = theo mặc định của persona; khác null = người dùng đã tự đổi.
    const [styleOverride, setStyleOverride] = useState<FormalityLevel | null>(
        null,
    );
    const [marugotoOverride, setMarugotoOverride] =
        useState<MarugotoLevel | null>(null);
    const [voiceSpeed, setVoiceSpeed] = useState(1.0);
    const [showHints, setShowHints] = useState(true);

    const selected =
        companions.find((c) => c.id === companionId) ?? companions[0];

    // Giá trị hiệu dụng: ưu tiên lựa chọn tay, mặc định lấy của persona.
    const conversationStyle =
        styleOverride ?? selected?.defaultFormality ?? DEFAULT_FORMALITY;
    const marugotoLevel =
        marugotoOverride ?? selected?.defaultMarugotoLevel ?? DEFAULT_MARUGOTO;

    // Đổi companion → bỏ override để quay về mặc định của persona mới.
    const handleSelectCompanion = (id: string) => {
        setCompanionId(id);
        setStyleOverride(null);
        setMarugotoOverride(null);
    };

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">

            {/* Hero */}
            <header className="border-bdc-primary bg-bgc-app relative overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-8">
                <span
                    aria-hidden
                    className="bg-bgc-highlight absolute inset-y-0 left-0 w-1.5"
                />
                <div className="relative z-10 space-y-5">
                    <div className="flex flex-wrap items-start justify-between gap-4 pl-2">
                        <div className="space-y-2">
                            <h1 className="text-text-contrast text-2xl font-bold tracking-tight sm:text-3xl">
                                {t("title")}
                            </h1>
                            <p className="text-text-muted max-w-xl text-sm">
                                {t("subtitle")}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {aiLimit != null && aiRemaining != null && (
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold ${
                                        aiExhausted
                                            ? "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                            : "border-bgc-highlight/40 bg-bgc-highlight/10 text-bgc-highlight"
                                    }`}
                                >
                                    <Sparkles
                                        className={
                                            aiExhausted
                                                ? "h-4 w-4 text-rose-500"
                                                : "text-bgc-highlight h-4 w-4"
                                        }
                                    />
                                    {t("dailyQuotaStatus", {
                                        remaining: aiRemaining,
                                        limit: aiLimit,
                                    })}
                                </span>
                            )}
                            {level && (
                                <span className="border-bdc-primary bg-bgc-page text-text-contrast inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold">
                                    <Sparkles className="text-bgc-highlight h-4 w-4" />
                                    {t("currentLevel")}
                                    <span className="bg-bgc-highlight/15 text-bgc-highlight rounded-full px-2 py-0.5 text-xs font-bold">
                                        {level}
                                    </span>
                                </span>
                            )}
                            <Link
                                href="/dialogue-history"
                                className="border-bdc-primary text-text-muted hover:border-bgc-highlight/60 hover:text-bgc-highlight inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                            >
                                <History className="h-4 w-4" />
                                {t("viewHistory")}
                            </Link>
                        </div>
                    </div>

                    {/* Quota Banner */}
                    {aiLimit != null && aiRemaining != null && (
                        <div
                            className={`flex flex-col justify-between gap-4 rounded-xl border p-4 shadow-xs transition-all sm:flex-row sm:items-center ${
                                aiExhausted
                                    ? "text-text-contrast border-rose-500/50 bg-rose-500/10"
                                    : "border-bgc-highlight/50 bg-bgc-highlight/10 text-text-contrast"
                            }`}
                        >
                            <div className="flex items-center gap-3.5 pl-2">
                                <div
                                    className={`shrink-0 rounded-xl p-2.5 shadow-xs ${
                                        aiExhausted
                                            ? "bg-rose-500 text-white"
                                            : "bg-bgc-highlight text-white"
                                    }`}
                                >
                                    <Sparkles className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-text-contrast text-sm font-bold sm:text-base">
                                        {t("dailyQuotaLimit", {
                                            limit: aiLimit,
                                        })}
                                    </p>
                                    <p
                                        className={`text-xs font-bold sm:text-sm ${
                                            aiExhausted
                                                ? "text-rose-600 dark:text-rose-400"
                                                : "text-bgc-highlight"
                                        }`}
                                    >
                                        {aiExhausted ? (
                                            <>
                                                <span>
                                                    {t(
                                                        "dailyQuotaExhausted",
                                                    )}{" "}
                                                </span>
                                                <span>
                                                    {t("dailyQuotaUpgradeHint")}
                                                </span>
                                            </>
                                        ) : (
                                            t("dailyQuotaRemaining", {
                                                remaining: aiRemaining,
                                            })
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-2 pl-2 sm:pl-0">
                                {aiExhausted && (
                                    <UpdatePlanButton
                                        onOpenModal={() => setIsModalOpen(true)}
                                    />
                                )}
                                <span
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold shadow-xs ${
                                        aiExhausted
                                            ? "bg-rose-500 text-white"
                                            : "bg-bgc-highlight text-white"
                                    }`}
                                >
                                    {t("dailyQuotaStatus", {
                                        remaining: aiRemaining,
                                        limit: aiLimit,
                                    })}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </header>

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
