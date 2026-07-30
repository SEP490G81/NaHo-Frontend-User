"use client";
import React from "react";

export type NodeIconKind =
    | "vocab"
    | "question"
    | "chest"
    | "chest-opened"
    | "done";

interface Props {
    kind: NodeIconKind;
    size?: number;
}

const SHADE = "rgba(0,0,0,0.18)";
const LINE = "rgba(0,0,0,0.15)";

/** Icon minh hoạ 3D nổi bật trên mặt đĩa node. */
export function NodeIcon({ kind, size = 44 }: Props) {
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
                    stroke="currentColor"
                    strokeWidth={7.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    if (kind === "vocab") {
        return (
            <svg {...common}>
                {/* Book cover 3D shadow */}
                <path
                    d="M24 14c-5-3.5-13-3.5-18-1.5v25c5-2 13-2 18 1.5 5-3.5 13-3.5 18-1.5v-25c-5-2-13-2-18 1.5z"
                    fill="#fff"
                    className="drop-shadow-xs"
                />
                <path d="M24 14v25" stroke={SHADE} strokeWidth={2.6} />
                <path
                    d="M9 19h9M9 24h9M9 29h7M29 19h9M29 24h9M29 29h7"
                    stroke={LINE}
                    strokeWidth={2.2}
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    if (kind === "question") {
        return (
            <svg {...common}>
                {/* 3D Mic Body */}
                <rect
                    x="17.5"
                    y="6"
                    width="13"
                    height="23"
                    rx="6.5"
                    fill="#fff"
                    className="drop-shadow-xs"
                />
                <path
                    d="M20.5 12h7M20.5 16h7M20.5 20h7"
                    stroke={LINE}
                    strokeWidth={2}
                    strokeLinecap="round"
                />
                <path
                    d="M12 23a12 12 0 0 0 24 0"
                    stroke="#fff"
                    strokeWidth={3.8}
                    strokeLinecap="round"
                    fill="none"
                />
                <path
                    d="M24 35v6"
                    stroke="#fff"
                    strokeWidth={3.8}
                    strokeLinecap="round"
                />
                <path
                    d="M17 42h14"
                    stroke="#fff"
                    strokeWidth={3.8}
                    strokeLinecap="round"
                />
            </svg>
        );
    }

    if (kind === "chest-opened") {
        return (
            <svg {...common} className="drop-shadow-md">
                {/* Thân rương gỗ (đã mở) */}
                <rect
                    x="6"
                    y="24"
                    width="36"
                    height="18"
                    rx="4"
                    fill="#5a3a1e"
                />
                <rect
                    x="6"
                    y="20"
                    width="36"
                    height="19"
                    rx="3"
                    fill="#9c6836"
                />
                <rect
                    x="8"
                    y="21"
                    width="32"
                    height="3.5"
                    fill="#c68d52"
                    opacity={0.7}
                />
                {/* Đai kim loại vàng đồng */}
                <rect x="13" y="20" width="4" height="19" fill="#e0a92e" />
                <rect x="31" y="20" width="4" height="19" fill="#e0a92e" />
                {/* Miệng rương phát sáng */}
                <ellipse cx="24" cy="18" rx="14" ry="5" fill="#fde68a" />
                <ellipse cx="24" cy="18" rx="10" ry="3" fill="#fff7e0" />
                {/* Nắp gỗ mở nghiêng, viền vàng */}
                <path
                    d="M 5 15 L 43 9 L 41 4 L 7 10 Z"
                    fill="#a06a38"
                    stroke="#e0a92e"
                    strokeWidth={1.6}
                />
                <path d="M 7 10 L 41 4 L 43 7 L 5 13 Z" fill="#7a4e28" />
                {/* Đồng xu / lấp lánh */}
                <circle
                    cx="16"
                    cy="11"
                    r="3"
                    fill="#ffd84d"
                    stroke="#a16207"
                    strokeWidth={0.8}
                />
                <circle
                    cx="32"
                    cy="8"
                    r="3.5"
                    fill="#ffd84d"
                    stroke="#a16207"
                    strokeWidth={0.8}
                />
                <path
                    d="M 24 1 L 25.5 4.5 L 29 5 L 26.5 7.5 L 27 11 L 24 9 L 21 11 L 21.5 7.5 L 19 5 L 22.5 4.5 Z"
                    fill="#fff2b8"
                    stroke="#d4a017"
                    strokeWidth={0.8}
                />
            </svg>
        );
    }

    // Rương gỗ 3D đóng (thân gỗ nâu + đai/khóa vàng đồng, giống rương báu thật)
    return (
        <svg {...common} className="drop-shadow-md">
            {/* Đáy đổ bóng */}
            <rect x="6" y="24" width="36" height="18" rx="4" fill="#5a3a1e" />
            {/* Thân gỗ */}
            <rect x="6" y="21" width="36" height="18" rx="3" fill="#9c6836" />
            <rect
                x="7"
                y="22"
                width="34"
                height="3"
                fill="#c68d52"
                opacity={0.55}
            />
            {/* Nắp gỗ cong */}
            <path
                d="M 5 21 C 5 13 11 10 24 10 C 37 10 43 13 43 21 Z"
                fill="#a86f3b"
                stroke="#5a3a1e"
                strokeWidth={1.2}
            />
            <path
                d="M 8 18 C 8 14 13 12 24 12 C 35 12 40 14 40 18 Z"
                fill="#c68d52"
                opacity={0.5}
            />
            {/* Đai kim loại vàng đồng */}
            <rect x="12.5" y="11" width="4.5" height="28" fill="#e0a92e" />
            <rect x="31" y="11" width="4.5" height="28" fill="#e0a92e" />
            <rect x="6" y="27" width="36" height="3" fill="#e0a92e" />
            {/* Khóa vàng */}
            <rect
                x="21"
                y="24"
                width="6"
                height="8"
                rx="1.5"
                fill="#f5c542"
                stroke="#a16207"
                strokeWidth={1}
            />
            <circle cx="24" cy="27.5" r="1.4" fill="#7a4e28" />
        </svg>
    );
}

export default NodeIcon;
