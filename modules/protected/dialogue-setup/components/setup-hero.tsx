"use client";

import React from "react";
import { Compass } from "lucide-react";
import { useTranslations } from "next-intl";
import { SetupQuotaBanner } from "./setup-quota-banner";
import { useTourStore } from "@/store/tourStore";
import { AI_ONE_ON_ONE_TOUR_ID } from "@/modules/protected/user-guide/constants/ai.one.on.one.tour.constant";

interface SetupHeroProps {
    aiLimit: number | null;
    aiRemaining: number | null;
    aiExhausted: boolean;
    onOpenUpgradeModal: () => void;
}

export function SetupHero({
    aiLimit,
    aiRemaining,
    aiExhausted,
    onOpenUpgradeModal,
}: Readonly<SetupHeroProps>) {
    const t = useTranslations("dialogueSetup");
    const tGuide = useTranslations("userGuide.tour");
    const startTour = useTourStore((s) => s.startTour);

    return (
        <header className="border-bdc-primary bg-bgc-app relative overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-8">
            <span
                aria-hidden
                className="bg-bgc-highlight absolute inset-y-0 left-0 w-1.5"
            />
            <div className="relative z-10 space-y-5">
                <div className="flex flex-wrap items-start justify-between gap-5">
                    <div className="space-y-2">
                        <h1 className="text-text-contrast text-2xl font-bold tracking-tight sm:text-3xl">
                            {t("title")}
                        </h1>
                        <p className="text-text-muted max-w-xl text-sm">
                            {t("subtitle")}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => startTour(AI_ONE_ON_ONE_TOUR_ID)}
                        className="border-bdc-primary text-text-muted hover:border-bgc-highlight/60 hover:text-bgc-highlight inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                    >
                        <Compass className="h-4 w-4" />
                        {tGuide("restart")}
                    </button>
                </div>

                {/* Quota Banner */}
                {aiLimit != null && aiRemaining != null && (
                    <SetupQuotaBanner
                        aiLimit={aiLimit}
                        aiRemaining={aiRemaining}
                        aiExhausted={aiExhausted}
                        onOpenUpgradeModal={onOpenUpgradeModal}
                    />
                )}
            </div>
        </header>
    );
}

export default SetupHero;
