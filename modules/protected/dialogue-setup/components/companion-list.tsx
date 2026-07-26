"use client";
import React from "react";
import { CompanionCard } from "./companion-card";
import { COMPANIONS } from "@/modules/protected/live-chatroom/constants/live-chatroom.constant";
import { useTranslations } from "next-intl";

interface CompanionListProps {
    selectedId: string;
    onSelect: (id: string) => void;
}

export function CompanionList({ selectedId, onSelect }: CompanionListProps) {
    const t = useTranslations("dialogueSetup");

    return (
        <section className="space-y-3">
            <h2 className="text-text-contrast text-base font-semibold">
                {t("companionHeader")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {COMPANIONS.map((c) => (
                    <CompanionCard
                        key={c.id}
                        companion={c}
                        selected={selectedId === c.id}
                        onSelect={() => onSelect(c.id)}
                    />
                ))}
            </div>
        </section>
    );
}

export default CompanionList;
