"use client";
import React from "react";

interface Props {
    size: number;
    stroke: number;
    color: string;
    progress: number;
}

/** Vòng SVG hiển thị tiến độ (0..100) quanh node lộ trình. */
export function ProgressRing({ size, stroke, color, progress }: Props) {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const dash = (Math.max(0, Math.min(100, progress)) / 100) * circ;

    return (
        <svg
            width={size}
            height={size}
            className="absolute inset-0 -rotate-90"
            aria-hidden
        >
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke="var(--color-bgc-page)"
                strokeWidth={stroke}
                fill="none"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={circ}
                strokeDashoffset={circ - dash}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
        </svg>
    );
}

export default ProgressRing;
