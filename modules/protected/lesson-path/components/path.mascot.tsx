"use client";
import React from "react";
import { cn } from "@/libs/utils";

const ORANGE = "#F79433";
const CREAM = "#FFE7C6";
const STRIPE = "#3A2C22";
const PINK = "#F7A8B8";

interface Props {
    /** Đặt linh vật bên nào so với node đang học. */
    side: "left" | "right";
}

/** Linh vật hổ dễ thương "vibe" cạnh node đang học (nhún nhảy + vẫy tay). */
export function PathMascot({ side }: Props) {
    return (
        <div
            aria-hidden
            className={cn(
                "pointer-events-none absolute top-[52px] z-20 -translate-y-1/2 motion-safe:animate-naho-bob",
                side === "left" ? "right-full mr-1" : "left-full ml-1",
            )}
        >
            <svg width="88" height="102" viewBox="0 0 120 140" fill="none">
                <ellipse cx="60" cy="133" rx="30" ry="5" fill="rgba(0,0,0,0.14)" />
                {/* Đuôi */}
                <path
                    d="M88 104 q26 -2 22 -28 q-2 -13 -12 -13"
                    stroke={ORANGE}
                    strokeWidth="9"
                    strokeLinecap="round"
                />
                {/* Thân */}
                <ellipse cx="60" cy="100" rx="30" ry="26" fill={ORANGE} />
                <ellipse cx="60" cy="104" rx="17" ry="16" fill={CREAM} />
                <rect x="34" y="92" width="4" height="12" rx="2" fill={STRIPE} transform="rotate(18 36 98)" />
                <rect x="82" y="92" width="4" height="12" rx="2" fill={STRIPE} transform="rotate(-18 84 98)" />
                {/* Bàn chân */}
                <ellipse cx="46" cy="123" rx="11" ry="8" fill={CREAM} />
                <ellipse cx="74" cy="123" rx="11" ry="8" fill={CREAM} />
                <path d="M43 122v5M46 123v5M49 122v5M71 122v5M74 123v5M77 122v5" stroke="#E0B98C" strokeWidth="1.4" />
                {/* Tay phải nghỉ */}
                <ellipse cx="86" cy="97" rx="8" ry="12" fill={ORANGE} transform="rotate(20 86 97)" />
                {/* Tai */}
                <circle cx="36" cy="30" r="12" fill={ORANGE} />
                <circle cx="36" cy="30" r="6" fill={PINK} />
                <circle cx="84" cy="30" r="12" fill={ORANGE} />
                <circle cx="84" cy="30" r="6" fill={PINK} />
                {/* Đầu */}
                <circle cx="60" cy="52" r="34" fill={ORANGE} />
                <rect x="57" y="19" width="6" height="17" rx="3" fill={STRIPE} />
                <rect x="45" y="23" width="5" height="13" rx="2.5" fill={STRIPE} transform="rotate(-13 47 30)" />
                <rect x="70" y="23" width="5" height="13" rx="2.5" fill={STRIPE} transform="rotate(13 73 30)" />
                <rect x="27" y="48" width="9" height="4" rx="2" fill={STRIPE} />
                <rect x="28" y="56" width="8" height="4" rx="2" fill={STRIPE} />
                <rect x="84" y="48" width="9" height="4" rx="2" fill={STRIPE} />
                <rect x="84" y="56" width="8" height="4" rx="2" fill={STRIPE} />
                <ellipse cx="60" cy="63" rx="20" ry="14" fill={CREAM} />
                {/* Lông mày + mắt */}
                <rect x="43" y="40" width="10" height="3" rx="1.5" fill={STRIPE} transform="rotate(-10 48 41)" />
                <rect x="67" y="40" width="10" height="3" rx="1.5" fill={STRIPE} transform="rotate(10 72 41)" />
                <ellipse cx="49" cy="50" rx="5" ry="6.5" fill="#2B2320" />
                <ellipse cx="71" cy="50" rx="5" ry="6.5" fill="#2B2320" />
                <circle cx="50.5" cy="47.5" r="1.6" fill="#fff" />
                <circle cx="72.5" cy="47.5" r="1.6" fill="#fff" />
                {/* Mũi + miệng */}
                <ellipse cx="60" cy="59" rx="5" ry="3.5" fill="#C15B5B" />
                <path d="M60 62v4M60 66q-5 4 -9 1M60 66q5 4 9 1" stroke={STRIPE} strokeWidth="2" strokeLinecap="round" />
                {/* Ria */}
                <path d="M40 60l-16 -3M40 64l-16 2M80 60l16 -3M80 64l16 2" stroke={STRIPE} strokeWidth="1.4" strokeLinecap="round" />
                {/* Tay trái vẫy */}
                <g
                    className="motion-safe:animate-naho-paw"
                    style={{ transformOrigin: "42px 92px", transformBox: "view-box" }}
                >
                    <path d="M42 92 L26 60" stroke={ORANGE} strokeWidth="11" strokeLinecap="round" />
                    <circle cx="24" cy="57" r="8" fill={CREAM} />
                </g>
            </svg>
        </div>
    );
}

export default PathMascot;
