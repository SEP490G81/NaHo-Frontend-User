"use client";
import React from "react";
import { LinearProgress } from "@mui/material";

interface DimensionMeterProps {
    label: string;
    score: number;
    /** Màu thanh tiến độ; mặc định màu nhấn của app. Truyền màu sách để đồng bộ. */
    color?: string;
}

export function DimensionMeter({ label, score, color }: DimensionMeterProps) {
    return (
        <div className="space-y-1.5 w-full">
            <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-text-contrast">{label}</span>
                <span className="font-semibold tabular-nums text-text-contrast">
                    {score}
                    <span className="text-text-muted">/100</span>
                </span>
            </div>
            <LinearProgress
                variant="determinate"
                value={score}
                className="h-2 rounded-full bg-bgc-page [&_.MuiLinearProgress-bar]:rounded-full"
                sx={{
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: color ?? "var(--color-bgc-highlight)",
                    },
                }}
            />
        </div>
    );
}

export default DimensionMeter;
