"use client";
import React from "react";
import { useTranslations } from "next-intl";
import TopicsList from "../features/topics.list";
import TopicsHeader from "./topics.header";

export function Topics() {
    const t = useTranslations("page.topics");

    return (
        <div className="px-4 py-6 md:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <TopicsHeader t={t} />

                {/* Topics Container */}
                <TopicsList />
            </div>
        </div>
    );
}

export default Topics;

