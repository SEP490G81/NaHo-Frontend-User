"use client";
import React from "react";
import { CompanionCard } from "./companion-card";
import type { Companion } from "@/modules/protected/live-chatroom/types/live-chatroom.type";

interface CompanionListProps {
    companions: Companion[];
    selectedId: string;
    onSelect: (id: string) => void;
    loading?: boolean;
}

export function CompanionList({
    companions,
    selectedId,
    onSelect,
    loading = false,
}: CompanionListProps) {
    if (loading) {
        return (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="border-bdc-primary bg-bgc-page/40 h-52 animate-pulse rounded-xl border"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {companions.map((c) => (
                <CompanionCard
                    key={c.id}
                    companion={c}
                    selected={selectedId === c.id}
                    onSelect={() => onSelect(c.id)}
                />
            ))}
        </div>
    );
}

export default CompanionList;
