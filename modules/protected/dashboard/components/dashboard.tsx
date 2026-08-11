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
        <div className="mx-auto space-y-6 px-4 pb-10 sm:px-6">
            {/* 1. Hero Banner Top */}
            <WelcomeBanner t={t} />

            {/* 2. Kanji Inspiration Quote (Full Width) */}
            <KanjiQuoteCard />

            {/* 3. Hàng ngang kết hợp Biểu đồ (70%) + Quiz (30%) cao bằng nhau 100% */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
                {/* Biểu đồ luyện tập (Chiếm ~70% - 8 trên 12 cột) */}
                {/* Quiz từ vựng hàng ngày (Chiếm ~30% - 4 trên 12 cột) */}
                <div className="flex flex-col lg:col-span-5 xl:col-span-4">
                    <DailyVocabQuiz />
                </div>
                <div className="flex flex-col lg:col-span-7 xl:col-span-8">
                    <PracticeTimeChart />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
