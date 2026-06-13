"use client";
import React from "react";
import { LinearProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import { skillScores } from "@/data/mockLearnerDashboard";

export function SkillScoresCard() {
    const t = useTranslations("historyDetail");
    const tHome = useTranslations("dashboard");

    const items = [
        {
            label: t("dimensionPronunciation"),
            value: skillScores.pronunciation,
        },
        { label: t("dimensionVocabulary"), value: skillScores.vocabulary },
        { label: t("dimensionGrammar"), value: skillScores.grammar },
        { label: t("dimensionNaturalness"), value: skillScores.naturalness },
    ];

    return (
        <div className="border-bdc-primary bg-bgc-app rounded-md border p-6">
            <h3 className="text-text-contrast text-lg font-semibold">
                {tHome("skillScoresTitle")}
            </h3>
            <p className="text-text-muted mt-1 text-sm">
                {tHome("skillScoresSubtitle")}
            </p>
            <div className="mt-6 space-y-5">
                {items.map((item) => (
                    <div key={item.label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-text-contrast font-medium">
                                {item.label}
                            </span>
                            <span className="text-text-muted">
                                {item.value}/100
                            </span>
                        </div>
                        <LinearProgress
                            variant="determinate"
                            value={item.value}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "var(--color-bgc-page)",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor:
                                        "var(--color-bgc-highlight)",
                                    borderRadius: 4,
                                },
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SkillScoresCard;
