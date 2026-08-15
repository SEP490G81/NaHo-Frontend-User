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
}: Readonly<CompanionListProps>) {
    if (loading) {
        return (
            <div className="grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 md:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="border-bdc-primary bg-bgc-page/40 h-56 animate-pulse rounded-xl border"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="max-h-[780px] overflow-y-auto p-1 pr-2 [scrollbar-color:var(--color-bgc-highlight)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-bgc-page/60 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-bgc-highlight/70 hover:[&::-webkit-scrollbar-thumb]:bg-bgc-highlight">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {companions.map((c) => (
                    <CompanionCard
                        key={c.id}
                        companion={c}
                        selected={selectedId === c.id}
                        onSelect={() => onSelect(c.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CompanionList;
