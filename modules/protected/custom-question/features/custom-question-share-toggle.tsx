"use client";
import React from "react";

interface CustomQuestionShareToggleProps {
    t: any;
    share: boolean;
    onShareChange: (checked: boolean) => void;
}

export function CustomQuestionShareToggle({
    t,
    share,
    onShareChange,
}: CustomQuestionShareToggleProps) {
    return (
        <label className="border-bdc-primary bg-bgc-page flex cursor-pointer items-start gap-3 rounded-md border p-3 text-sm">
            <input
                type="checkbox"
                checked={share}
                onChange={(e) => onShareChange(e.target.checked)}
                className="border-bdc-primary text-bgc-highlight focus:ring-bgc-highlight mt-1 h-4 w-4 rounded"
            />
            <span className="text-text-contrast flex-1 leading-tight">
                {t("shareLabel")}{" "}
                <span className="text-text-muted block text-xs sm:inline">
                    {t("shareSubLabel")}
                </span>
            </span>
        </label>
    );
}

export default CustomQuestionShareToggle;
