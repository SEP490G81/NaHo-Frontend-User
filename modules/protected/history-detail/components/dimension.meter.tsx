"use client";
import React from "react";
import { LinearProgress } from "@mui/material";

interface DimensionMeterProps {
    label: string;
    score: number;
}

export function DimensionMeter({ label, score }: DimensionMeterProps) {
    return (
        <div className="w-full space-y-1.5">
            <div className="flex items-center justify-between text-sm">
                <span className="text-text-contrast font-medium">{label}</span>
                <span className="text-text-contrast font-semibold tabular-nums">
                    {score}/100
                </span>
            </div>
            <LinearProgress
                variant="determinate"
                value={score}
                className="bg-bgc-page [&_.MuiLinearProgress-bar]:bg-bgc-highlight h-2 rounded-full [&_.MuiLinearProgress-bar]:rounded-full"
            />
        </div>
    );
}

export default DimensionMeter;
