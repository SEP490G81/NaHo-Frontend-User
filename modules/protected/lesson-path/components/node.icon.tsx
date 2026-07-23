"use client";
import React from "react";

export type NodeIconKind = "vocab" | "question" | "chest" | "done";

interface Props {
    kind: NodeIconKind;
    size?: number;
}

const SHADE = "rgba(0,0,0,0.16)";
const LINE = "rgba(0,0,0,0.13)";

/** Icon minh hoạ trắng, có mảng sáng/tối tạo cảm giác 3D trên mặt node. */
export function NodeIcon({ kind, size = 40 }: Props) {
    const common = {
        width: size,
        height: size,
        viewBox: "0 0 48 48",
        fill: "none" as const,
    };

    if (kind === "done") {
        return (
            <svg {...common}>
                <path
                    d="M12 25l8 8 16-18"
                    stroke="#fff"
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    if (kind === "vocab") {
        return (
            <svg {...common}>
                <path
                    d="M24 13c-5-3.5-13-3.5-18-1.5v25c5-2 13-2 18 1.5 5-3.5 13-3.5 18-1.5v-25c-5-2-13-2-18 1.5z"
                    fill="#fff"
                />
                <path d="M24 13v25" stroke={SHADE} strokeWidth={2.4} />
                <path
                    d="M9 18h10M9 23h10M9 28h8M29 18h10M29 23h10M29 28h8"
                    stroke={LINE}
                    strokeWidth={2}
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    if (kind === "question") {
        return (
            <svg {...common}>
                <rect x="17.5" y="6" width="13" height="23" rx="6.5" fill="#fff" />
                <path
                    d="M20.5 12h7M20.5 16h7M20.5 20h7"
                    stroke={LINE}
                    strokeWidth={1.8}
                    strokeLinecap="round"
                />
                <path
                    d="M12 23a12 12 0 0 0 24 0"
                    stroke="#fff"
                    strokeWidth={3.4}
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d="M24 35v6"
                    stroke="#fff"
                    strokeWidth={3.4}
                    strokeLinecap="round"
                />
                <path
                    d="M18 42h12"
                    stroke="#fff"
                    strokeWidth={3.4}
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    // chest / gift
    return (
        <svg {...common}>
            <rect x="8" y="21" width="32" height="19" rx="2.5" fill="#fff" />
            <rect x="6" y="14" width="36" height="9" rx="2.5" fill="#fff" />
            <rect x="21" y="14" width="6" height="26" fill={SHADE} />
            <path
                d="M24 14c-2-5-9-5-8 0m8 0c2-5 9-5 8 0"
                stroke="#fff"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
            />
        </svg>
    );
}

export default NodeIcon;
