"use client";

import React from "react";
import { Skeleton } from "@mui/material";
import { CompanionCard } from "./companion.card";
import type { Companion } from "@/modules/protected/live-chatroom/types/live.chatroom.type";

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
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton
                        key={i}
                        variant="rounded"
                        height={112}
                        className="rounded-2xl!"
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            data-tour-id="tour-ai1on1-companion-grid"
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
            {companions.map((c) => (
                <CompanionCard
                    key={c.id}
                    companion={c}
                    selected={c.id === selectedId}
                    onSelect={() => onSelect(c.id)}
                />
            ))}
        </div>
    );
}

export default CompanionList;
