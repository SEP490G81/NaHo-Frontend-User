"use client";
import React from "react";
import { LinearProgress } from "@mui/material";

interface DimensionMeterProps {
    label: string;
    /** Thang 0-10 (đồng bộ với overallScore/PASS_SCORE). */
    score: number;
    /** Màu thanh tiến độ; mặc định màu nhấn của app. Truyền màu sách để đồng bộ. */
    color?: string;
}

export function DimensionMeter({ label, score, color }: DimensionMeterProps) {
    const clamped = Math.min(10, Math.max(0, score));
    return (
        <div className="w-full space-y-1.5">
            <div className="flex items-center justify-between text-sm">
                <span className="text-text-contrast font-medium">{label}</span>
                <span className="text-text-contrast font-semibold tabular-nums">
                    {clamped.toFixed(1)}
                    <span className="text-text-muted">/10</span>
                </span>
            </div>
            <LinearProgress
                variant="determinate"
                value={clamped * 10}
                className="bg-bgc-page h-2 rounded-full [&_.MuiLinearProgress-bar]:rounded-full"
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
