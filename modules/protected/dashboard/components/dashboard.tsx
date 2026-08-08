"use client";

import React from "react";
import { useTranslations } from "next-intl";
import WelcomeBanner from "./welcome.banner";
import KanjiQuoteCard from "./kanji.quote.card";
import DailyVocabQuiz from "./daily.vocab.quiz";
import PracticeTimeChart from "../features/practice.time.chart";

export function Dashboard() {
    const t = useTranslations("dashboard");

    return (
        <div className="mx-auto max-w-7xl space-y-5 pb-10">
            {/* 1. Hero Command Center (Greeting, User Profile, Subscription & Quick Resume CTA) */}
            <WelcomeBanner t={t} />

            {/* Kanji Inspiration Quote */}
            <KanjiQuoteCard />

            {/* 2. Interactive Vocab Challenge & Analytics Grid */}
            <div className="grid gap-5 lg:grid-cols-2">
                <DailyVocabQuiz />
                {/* <PracticeTimeChart /> */}
            </div>
        </div>
    );
}

export default Dashboard;
