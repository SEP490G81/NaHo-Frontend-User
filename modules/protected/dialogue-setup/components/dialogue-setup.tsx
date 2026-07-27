"use client";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { CompanionList } from "./companion-list";
import { SummaryPanel } from "./summary-panel";
import { AdvancedSettingsForm } from "../features/advanced-settings-form";
import {
    COMPANIONS,
    DEFAULT_STYLE_ID,
    resolveCompanions,
} from "@/modules/protected/live-chatroom/constants/live-chatroom.constant";
import { getPersonas } from "@/services/client/speaking.service";
import { useAuthStore } from "@/store/authStore";

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

    const [companionId, setCompanionId] = useState(COMPANIONS[0].id);
    // null = theo style mặc định của persona; khác null = người dùng đã tự đổi.
    const [styleOverride, setStyleOverride] = useState<number | null>(null);
    const [voiceSpeed, setVoiceSpeed] = useState(1.0);
    const [showHints, setShowHints] = useState(true);

    const selected =
        companions.find((c) => c.id === companionId) ?? companions[0];

    // Style hiệu dụng: ưu tiên lựa chọn tay, mặc định lấy của persona.
    const conversationStyleId =
        styleOverride ??
        selected?.suggestedConversationStyleId ??
        DEFAULT_STYLE_ID;

    // Đổi companion → bỏ override để quay về style mặc định của persona mới.
    const handleSelectCompanion = (id: string) => {
        setCompanionId(id);
        setStyleOverride(null);
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
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
                    {level && (
                        <span className="border-bdc-primary bg-bgc-page text-text-contrast inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold">
                            <Sparkles className="text-bgc-highlight h-4 w-4" />
                            {t("currentLevel")}
                            <span className="bg-bgc-highlight/15 text-bgc-highlight rounded-full px-2 py-0.5 text-xs">
                                {level}
                            </span>
                        </span>
                    )}
                </div>
            </header>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
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
                        conversationStyleId={conversationStyleId}
                        voiceSpeed={voiceSpeed}
                        showHints={showHints}
                        onStyleChange={setStyleOverride}
                        onVoiceSpeedChange={setVoiceSpeed}
                        onShowHintsChange={setShowHints}
                    />
                </div>

                {/* Right: sticky summary */}
                <div className="lg:col-span-1">
                    <SummaryPanel
                        companion={selected}
                        conversationStyleId={conversationStyleId}
                        voiceSpeed={voiceSpeed}
                        showHints={showHints}
                    />
                </div>
            </div>
        </div>
    );
}

export default DialogueSetup;
