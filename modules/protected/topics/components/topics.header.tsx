"use client";
import React from "react";

interface TopicsHeaderProps {
    t: any;
}

export function TopicsHeader({ t }: TopicsHeaderProps) {
    return (
        <header className="space-y-2">
            <h1 className="text-2xl font-bold md:text-3xl text-text-contrast">{t("title")}</h1>
            <p className="text-text-muted">{t("subtitle")}</p>
        </header>
    );
}

export default TopicsHeader;
