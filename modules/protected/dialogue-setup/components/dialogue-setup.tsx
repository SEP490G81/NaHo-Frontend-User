"use client";
import { useMemo, useState } from "react";
import { History, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { CompanionList } from "./companion-list";
import { SummaryPanel } from "./summary-panel";
import { ResumeBanner } from "./resume-banner";
import { AdvancedSettingsForm } from "../features/advanced-settings-form";
import {
    COMPANIONS,
    DEFAULT_FORMALITY,
    DEFAULT_MARUGOTO,
    resolveCompanions,
} from "@/modules/protected/live-chatroom/constants/live-chatroom.constant";
import { useResumeSession } from "@/modules/protected/live-chatroom/hooks/use-resume-session";
import {
    getActiveSession,
    getPersonas,
} from "@/services/client/speaking.service";
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

export function DialogueSetup() {
    const t = useTranslations("dialogueSetup");
    const level = useAuthStore((s) => s.profile?.level);

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

    // Phiên đang dở → cho phép khôi phục.
    const { data: active } = useQuery({
        queryKey: ["active-speaking-session"],
        queryFn: () => getActiveSession(),
        staleTime: 60 * 1000,
    });
    const [dismissed, setDismissed] = useState(false);
    const { resume, resumingCode } = useResumeSession(companions);

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
        subscription?.subscriptionPlan?.dailyAiSessionEvaluationLimit ?? null;
    const aiUsed = aiUsage?.aiSessionEvaluationCount ?? 0;
    const aiExhausted = aiLimit != null && aiUsed >= aiLimit;

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

    const activeCompanion = active
        ? companions.find((c) => c.personaId === active.personaId)
        : undefined;

    // Khôi phục phiên dở → seed câu cũ + câu chào lại → vào phòng chat.
    const handleResume = () => {
        if (!active) return;
        resume(
            {
                sessionCode: active.sessionCode,
                personaId: active.personaId,
                formalityLevel: active.formalityLevel,
                marugotoLevel: active.marugotoLevel,
                messages: active.messages,
            },
            { voiceSpeed, showHints },
        );
    };

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
            {active && !dismissed && (
                <ResumeBanner
                    active={active}
                    companion={activeCompanion}
                    resuming={resumingCode === active.sessionCode}
                    onResume={handleResume}
                    onDismiss={() => setDismissed(true)}
                />
            )}

            {/* Hero */}
            <header className="border-bdc-primary bg-bgc-app relative overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-8">
                <span
                    aria-hidden
                    className="bg-bgc-highlight absolute inset-y-0 left-0 w-1.5"
                />
                <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 pl-2">
                    <div className="space-y-2">
                        <h1 className="text-text-contrast text-2xl font-bold tracking-tight sm:text-3xl">
                            {t("title")}
                        </h1>
                        <p className="text-text-muted max-w-xl text-sm">
                            {t("subtitle")}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        {aiLimit != null && (
                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold ${
                                    aiExhausted
                                        ? "border-amber-300 bg-amber-500/15 text-amber-600 dark:text-amber-300"
                                        : "border-bdc-primary bg-bgc-page text-text-contrast"
                                }`}
                            >
                                <Sparkles className="text-bgc-highlight h-4 w-4" />
                                {t("dailyQuota", {
                                    used: aiUsed,
                                    limit: aiLimit,
                                })}
                            </span>
                        )}
                        {level && (
                            <span className="border-bdc-primary bg-bgc-page text-text-contrast inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold">
                                <Sparkles className="text-bgc-highlight h-4 w-4" />
                                {t("currentLevel")}
                                <span className="bg-bgc-highlight/15 text-bgc-highlight rounded-full px-2 py-0.5 text-xs">
                                    {level}
                                </span>
                            </span>
                        )}
                        <Link
                            href="/dialogue-history"
                            className="border-bdc-primary text-text-muted hover:border-bgc-highlight/60 hover:text-bgc-highlight inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium"
                        >
                            <History className="h-4 w-4" />
                            {t("viewHistory")}
                        </Link>
                    </div>
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
                    />
                </div>
            </div>
        </div>
    );
}

export default DialogueSetup;
