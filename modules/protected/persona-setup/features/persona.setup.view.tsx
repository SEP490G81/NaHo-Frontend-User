"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PersonaSetupViewProps } from "../types/persona.setup.type";
import { usePersonaSetup } from "../hooks/use.persona.setup";
import PersonaGrid from "../components/persona.grid";
import PersonaSettingsForm from "../components/persona.settings.form";
import PersonaSummaryCard from "../components/persona.summary.card";
import ContainerBox from "@/components/ui/container.box";

const PersonaSetupView = ({ personas = [] }: PersonaSetupViewProps) => {
    const t = useTranslations("dialogueSetup");
    const {
        selectedPersona,
        marugotoLevel,
        formalityLevel,
        speechSpeed,
        showSampleAnswers,
        isStarting,
        dailyLimit,
        dailyUsed,
        isDailyLimitReached,
        maxConcurrent,
        inProgressSessionsCount,
        isConcurrentLimitReached,
        planName,
        isLoadingUsage,
        setSelectedPersona,
        setMarugotoLevel,
        setFormalityLevel,
        setSpeechSpeed,
        setShowSampleAnswers,
        resetToDefaults,
        startChat,
    } = usePersonaSetup();

    return (
        <div className="space-y-5">
            {/* Header Banner */}
            <ContainerBox>
                <h1 className="text-text-contrast text-2xl font-extrabold tracking-tight md:text-3xl">
                    {t("title")}
                </h1>
                <p className="text-text-muted mt-1 max-w-2xl text-sm">
                    {t("subtitle")}
                </p>
            </ContainerBox>

            {/* Main 2-Column Grid */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {/* Left Column: Persona Selection & Settings Form (2/3 width) */}
                <div className="space-y-5 lg:col-span-2">
                    {/* Persona Grid Section */}
                    <div className="space-y-3">
                        <ContainerBox className="flex items-center justify-between">
                            <h2 className="text-text-contrast text-base font-bold">
                                {t("companionHeader")}
                            </h2>
                            <span className="text-text-muted text-xs">
                                {t("companionCount", {
                                    count: personas.length,
                                })}
                            </span>
                        </ContainerBox>

                        <PersonaGrid
                            personas={personas}
                            selectedPersonaId={selectedPersona?.id}
                            onSelectPersona={setSelectedPersona}
                        />
                    </div>

                    {/* Advanced Settings Form */}
                    <PersonaSettingsForm
                        selectedPersona={selectedPersona}
                        marugotoLevel={marugotoLevel}
                        formalityLevel={formalityLevel}
                        speechSpeed={speechSpeed}
                        showSampleAnswers={showSampleAnswers}
                        onMarugotoLevelChange={setMarugotoLevel}
                        onFormalityLevelChange={setFormalityLevel}
                        onSpeedChange={setSpeechSpeed}
                        onSampleAnswersChange={setShowSampleAnswers}
                        onResetDefaults={resetToDefaults}
                    />
                </div>

                {/* Right Column: Sticky Summary Card (1/3 width) */}
                <div className="lg:col-span-1">
                    <PersonaSummaryCard
                        selectedPersona={selectedPersona}
                        marugotoLevel={marugotoLevel}
                        formalityLevel={formalityLevel}
                        speechSpeed={speechSpeed}
                        showSampleAnswers={showSampleAnswers}
                        isStarting={isStarting}
                        dailyLimit={dailyLimit}
                        dailyUsed={dailyUsed}
                        isDailyLimitReached={isDailyLimitReached}
                        maxConcurrent={maxConcurrent}
                        inProgressSessionsCount={inProgressSessionsCount}
                        isConcurrentLimitReached={isConcurrentLimitReached}
                        planName={planName}
                        isLoadingUsage={isLoadingUsage}
                        onStartChat={startChat}
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonaSetupView;
