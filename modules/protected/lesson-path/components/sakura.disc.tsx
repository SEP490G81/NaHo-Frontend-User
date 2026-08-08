"use client";
import React from "react";

interface Props {
    /** Màu cánh hoa (theo màu sách); bỏ qua khi locked. */
    color: string;
    locked: boolean;
    size?: number;
    children: React.ReactNode;
}

// Một cánh hoa hướng lên, đỉnh khía nhẹ kiểu hoa anh đào; tâm ở (50,50).
const PETAL =
    "M50 52 C41 42 41 20 47 12 C48.4 14.5 51.6 14.5 53 12 C59 20 59 42 50 52 Z";
const ANGLES = [0, 72, 144, 216, 288];

/** Node hình HOA ANH ĐÀO (sakura) 5 cánh, icon ở giữa — thay cho đĩa tròn. */
export function SakuraDisc({ color, locked, size = 66, children }: Props) {
    const face = locked ? "#e2e8f0" : color;
    const edge = locked ? "#cbd5e1" : `color-mix(in srgb, ${color} 60%, #000)`;
    return (
        <div
            className="relative flex items-center justify-center transition-transform active:translate-y-[3px]"
            style={{ width: size, height: size }}
        >
            <svg
                viewBox="0 0 100 100"
                width={size}
                height={size}
                className="absolute inset-0 drop-shadow-md"
            >
                {ANGLES.map((a) => (
                    <path
                        key={a}
                        d={PETAL}
                        transform={`rotate(${a} 50 50)`}
                        fill={face}
                        stroke={edge}
                        strokeWidth={2.5}
                        strokeLinejoin="round"
                    />
                ))}
                {/* Tâm hoa: khối tròn cùng màu để khép các cánh + nền cho icon */}
                <circle cx="50" cy="50" r="13" fill={face} />
            </svg>
            <span
                className={
                    locked
                        ? "relative text-slate-400"
                        : "relative text-white"
                }
            >
                {children}
            </span>
        </div>
    );
}

export default SakuraDisc;
