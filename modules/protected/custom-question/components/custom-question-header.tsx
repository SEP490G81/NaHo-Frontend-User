"use client";
import React from "react";

interface CustomQuestionHeaderProps {
    t: any;
}

export function CustomQuestionHeader({ t }: CustomQuestionHeaderProps) {
    return (
        <div className="border-bdc-primary bg-bgc-app rounded-xl border p-6 shadow-sm">
            <h1 className="text-text-contrast text-2xl font-bold tracking-tight">
                {t("title")}
            </h1>
            <p className="text-text-muted mt-1 text-sm">
                {t("subtitle")}
            </p>
        </div>
    );
}

export default CustomQuestionHeader;
