"use client";
import React, { useState } from "react";
import { Switch, FormControlLabel, Box } from "@mui/material";
import QuestionCard from "../features/question.card";
import { getQuestionHistory } from "@/data/mockHistory";
import type { Topic } from "@/data/mockTopics";

import { useTranslations } from "next-intl";

interface QuestionListProps {
    topic: Topic;
    completed: string[];
}

export function QuestionList({ topic, completed }: QuestionListProps) {
    const t = useTranslations("topicDetail");
    const [showFurigana, setShowFurigana] = useState(true);

    return (
        <section className="space-y-4">
            <header className="border-bdc-primary bg-bgc-app flex flex-wrap items-center justify-between gap-3 rounded-md border p-4">
                <div>
                    <h2 className="text-text-contrast text-xl font-bold">
                        {t("questionList")}
                    </h2>
                    <p className="text-text-muted text-sm">
                        {t("questionCount", {
                            total: topic.questions.length,
                            completed: completed.length,
                        })}
                    </p>
                </div>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={showFurigana}
                                onChange={(e) =>
                                    setShowFurigana(e.target.checked)
                                }
                                color="primary"
                            />
                        }
                        label={t("showFurigana")}
                        slotProps={{
                            typography: {
                                className:
                                    "text-sm font-semibold text-text-contrast",
                            },
                        }}
                    />
                </Box>
            </header>

            <div className="space-y-3">
                {topic.questions.map((q, i) => (
                    <QuestionCard
                        key={q.id}
                        index={i}
                        question={q}
                        showFurigana={showFurigana}
                        history={getQuestionHistory(topic.id, q.id)}
                    />
                ))}
            </div>
        </section>
    );
}

export default QuestionList;
