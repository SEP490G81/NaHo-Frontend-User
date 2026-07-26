"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { currentLearner } from "@/data/mockLearnerDashboard";
import WelcomeBanner from "./welcome.banner";
import UpgradeBanner from "./upgrade.banner";
import KanjiQuoteCard from "./kanji.quote.card";
import DailyVocabQuiz from "./daily.vocab.quiz";
import PracticeTimeChart from "../features/practice.time.chart";

export function Dashboard() {
    const t = useTranslations("dashboard");

    return (
        <div className="mx-auto max-w-7xl space-y-6 pb-10">
            {/* 1. Hero Command Center (Greeting, Goal progress, Quick Resume CTA) */}
            <WelcomeBanner name={currentLearner.name} t={t} />

            {/* 2. Main Dashboard Grid (Left 2 cols, Right 1 col) */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Area (2 Columns) */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Interactive Vocab Challenge */}
                    <DailyVocabQuiz />

                    {/* Analytics & Practice Time Chart */}
                    <PracticeTimeChart />
                </div>

                {/* Right Sidebar (1 Column) */}
                <div className="space-y-6 lg:col-span-1">
                    {/* Kanji Inspiration Quote */}
                    <KanjiQuoteCard />

                    {/* Subscription Upgrade Promo Card */}
                    <UpgradeBanner />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
