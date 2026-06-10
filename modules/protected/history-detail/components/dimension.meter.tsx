"use client";
import React from "react";
import { LinearProgress } from "@mui/material";

interface DimensionMeterProps {
    label: string;
    score: number;
}

export function DimensionMeter({ label, score }: DimensionMeterProps) {
    return (
        <div className="space-y-1.5 w-full">
            <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-text-contrast">{label}</span>
                <span className="font-semibold tabular-nums text-text-contrast">{score}/100</span>
            </div>
            <LinearProgress
                variant="determinate"
                value={score}
                className="h-2 rounded-full bg-bgc-page [&_.MuiLinearProgress-bar]:rounded-full [&_.MuiLinearProgress-bar]:bg-bgc-highlight"
            />
        </div>
    );
}

export default DimensionMeter;
