"use client";
import React from "react";

interface TopicsHeaderProps {
    t: any;
}

export function TopicsHeader({ t }: TopicsHeaderProps) {
    return (
        <header className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm">
            <h1 className="text-text-contrast text-2xl font-bold md:text-3xl">
                {t("title")}
            </h1>
            <p className="text-text-muted mt-1">
                {t("subtitle")}
            </p>
        </header>
    );
}

export default TopicsHeader;
