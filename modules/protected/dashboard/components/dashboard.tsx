"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { currentLearner } from "@/data/mockLearnerDashboard";
import PracticeTimeChart from "../features/practice.time.chart";
import SkillScoresCard from "./skill.scores.card";
import LeaderboardWidget from "../features/leaderboard.widget";
import WelcomeBanner from "./welcome.banner";

export function Dashboard() {
    const t = useTranslations("dashboard");

    return (
        <div className="mx-auto max-w-7xl space-y-6">
            {/* Welcome */}
            <WelcomeBanner name={currentLearner.name} t={t} />

            {/* Progression */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <PracticeTimeChart />
                </div>
                <div className="lg:col-span-1">
                    <SkillScoresCard />
                </div>
            </div>

            {/* Leaderboard */}
            <LeaderboardWidget />
        </div>
    );
}

export default Dashboard;
