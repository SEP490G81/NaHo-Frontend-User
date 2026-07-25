"use client";
import React from "react";

interface FlowerProps {
    cx: number;
    cy: number;
    size: number;
    rotation?: number;
}

const SakuraFlower: React.FC<FlowerProps> = ({
    cx,
    cy,
    size,
    rotation = 0,
}) => {
    const petalRotations = [0, 72, 144, 216, 288];
    const r = size;
    return (
        <g
            transform={`translate(${cx}, ${cy}) rotate(${rotation})`}
            className="text-bgc-highlight"
        >
            {/* Petals */}
            {petalRotations.map((deg) => (
                <ellipse
                    key={deg}
                    cx={0}
                    cy={-r * 0.45}
                    rx={r * 0.22}
                    ry={r * 0.45}
                    transform={`rotate(${deg})`}
                    fill="currentColor"
                    className="opacity-90 dark:opacity-85"
                />
            ))}
            {/* Center pistil details */}
            <circle cx={0} cy={0} r={r * 0.14} fill="var(--color-bgc-page)" />
            {petalRotations.map((deg) => (
                <line
                    key={`line-${deg}`}
                    x1={0}
                    y1={0}
                    x2={0}
                    y2={-r * 0.3}
                    transform={`rotate(${deg + 36})`}
                    stroke="var(--color-bgc-page)"
                    strokeWidth={r * 0.05}
                    opacity={0.8}
                />
            ))}
        </g>
    );
};

const SakuraBud: React.FC<FlowerProps> = ({ cx, cy, size, rotation = 0 }) => {
    return (
        <g
            transform={`translate(${cx}, ${cy}) rotate(${rotation})`}
            className="text-bgc-highlight"
        >
            <path
                d={`M ${-size * 0.2} ${size * 0.2} Q 0 ${size * 0.5} ${size * 0.2} ${size * 0.2} L 0 ${-size * 0.2} Z`}
                fill="var(--color-text-muted)"
                opacity={0.5}
            />
            <ellipse
                cx={-size * 0.1}
                cy={-size * 0.1}
                rx={size * 0.15}
                ry={size * 0.3}
                transform="rotate(-15)"
                fill="currentColor"
            />
            <ellipse
                cx={size * 0.1}
                cy={-size * 0.1}
                rx={size * 0.15}
                ry={size * 0.3}
                transform="rotate(15)"
                fill="currentColor"
            />
        </g>
    );
};

export function JapanBackground() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden select-none">
            {/* Top-Left Hanging Sakura Branch */}
            <div className="animate-naho-branch-sway absolute top-0 left-0 h-80 w-80 origin-top-left opacity-70 dark:opacity-40">
                <svg viewBox="0 0 250 250" className="h-full w-full fill-none">
                    {/* Main branches */}
                    <path
                        d="M 0 0 Q 70 30 130 90 T 220 120"
                        stroke="var(--color-text-contrast)"
                        strokeWidth="3.5"
                        opacity="0.55"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 50 21 Q 90 15 120 -5"
                        stroke="var(--color-text-contrast)"
                        strokeWidth="2"
                        opacity="0.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 90 56 Q 150 50 180 20"
                        stroke="var(--color-text-contrast)"
                        strokeWidth="2"
                        opacity="0.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 120 85 Q 140 130 110 180"
                        stroke="var(--color-text-contrast)"
                        strokeWidth="1.5"
                        opacity="0.5"
                        strokeLinecap="round"
                    />

                    {/* Cherry Blossoms */}
                    <SakuraFlower cx={50} cy={21} size={15} rotation={15} />
                    <SakuraFlower cx={90} cy={56} size={16} rotation={45} />
                    <SakuraFlower cx={130} cy={90} size={18} rotation={110} />
                    <SakuraFlower cx={180} cy={20} size={14} rotation={75} />
                    <SakuraFlower cx={120} cy={10} size={13} rotation={30} />
                    <SakuraFlower cx={200} cy={115} size={15} rotation={200} />
                    <SakuraFlower cx={110} cy={150} size={14} rotation={160} />

                    {/* Buds */}
                    <SakuraBud cx={110} cy={35} size={10} rotation={20} />
                    <SakuraBud cx={160} cy={75} size={11} rotation={140} />
                    <SakuraBud cx={70} cy={12} size={9} rotation={290} />
                </svg>
            </div>

            {/* Top-Right Hanging Sakura Branch */}
            <div
                className="animate-naho-branch-sway absolute top-0 right-0 h-72 w-72 origin-top-right opacity-70 dark:opacity-40"
                style={{ animationDelay: "-3.5s" }}
            >
                <svg viewBox="0 0 250 250" className="h-full w-full fill-none">
                    {/* Mirrored branches */}
                    <path
                        d="M 250 0 Q 180 30 120 90 T 30 120"
                        stroke="var(--color-text-contrast)"
                        strokeWidth="3.5"
                        opacity="0.55"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 200 21 Q 160 15 130 -5"
                        stroke="var(--color-text-contrast)"
                        strokeWidth="2"
                        opacity="0.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 160 56 Q 100 50 70 20"
                        stroke="var(--color-text-contrast)"
                        strokeWidth="2"
                        opacity="0.5"
                        strokeLinecap="round"
                    />

                    {/* Cherry Blossoms */}
                    <SakuraFlower cx={200} cy={21} size={15} rotation={45} />
                    <SakuraFlower cx={160} cy={56} size={17} rotation={85} />
                    <SakuraFlower cx={120} cy={90} size={16} rotation={125} />
                    <SakuraFlower cx={70} cy={20} size={14} rotation={15} />
                    <SakuraFlower cx={50} cy={110} size={15} rotation={220} />

                    {/* Buds */}
                    <SakuraBud cx={140} cy={35} size={10} rotation={30} />
                    <SakuraBud cx={95} cy={70} size={9} rotation={110} />
                </svg>
            </div>

            {/* Bottom-Right Mount Fuji & Sun Silhouette */}
            <div className="absolute right-0 bottom-0 h-[300px] w-[500px] opacity-70 md:h-[360px] md:w-[600px] dark:opacity-45">
                <svg
                    viewBox="0 0 600 360"
                    className="h-full w-full fill-none select-none"
                    aria-hidden="true"
                >
                    <defs>
                        {/* Sun Radial Glow */}
                        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                            <stop
                                offset="0%"
                                stopColor="#ff4d6d"
                                stopOpacity="0.85"
                            />
                            <stop
                                offset="60%"
                                stopColor="#ff8fa3"
                                stopOpacity="0.4"
                            />
                            <stop
                                offset="100%"
                                stopColor="#ffccd5"
                                stopOpacity="0"
                            />
                        </radialGradient>
                    </defs>

                    {/* Sun (under mountain, glowing) */}
                    <circle
                        cx="340"
                        cy="160"
                        r="80"
                        fill="url(#sunGlow)"
                        className="animate-[pulse_5s_infinite]"
                    />
                    <circle
                        cx="340"
                        cy="160"
                        r="45"
                        fill="#ef233c"
                        opacity="0.35"
                    />

                    {/* Mount Fuji Silhouette */}
                    <path
                        d="M 50 360 Q 220 310 320 140 C 340 100, 380 100, 400 140 Q 500 310 670 360 Z"
                        fill="var(--color-text-contrast)"
                        opacity="0.16"
                    />

                    {/* Fuji Snow Cap */}
                    <path
                        d="M 320 140 C 340 100, 380 100, 400 140 Q 380 180, 360 170 Q 340 185, 320 140 Z"
                        fill="var(--color-bgc-page)"
                        opacity="0.95"
                    />

                    {/* Traditional Clouds (Kasumi) overlapping Fuji */}
                    <g
                        className="animate-naho-cloud-drift text-bgc-highlight opacity-65 dark:opacity-40"
                        fill="currentColor"
                    >
                        <rect x="180" y="200" width="160" height="12" rx="6" />
                        <rect x="420" y="180" width="120" height="10" rx="5" />
                        <rect x="260" y="240" width="200" height="14" rx="7" />
                    </g>
                </svg>
            </div>

            {/* Bottom-Left Kyoto Pagoda, Torii Gate & Hills */}
            <div className="absolute bottom-0 left-0 h-[260px] w-[400px] opacity-70 dark:opacity-45">
                <svg
                    viewBox="0 0 400 260"
                    className="h-full w-full fill-none select-none"
                    aria-hidden="true"
                >
                    {/* Back Hill */}
                    <path
                        d="M -50 260 Q 150 180, 320 260 Z"
                        fill="var(--color-text-contrast)"
                        opacity="0.12"
                    />

                    {/* Five-Story Pagoda Silhouette */}
                    <g
                        transform="translate(60, 65)"
                        fill="var(--color-text-contrast)"
                        opacity="0.2"
                    >
                        {/* Finial / Spire */}
                        <line
                            x1="25"
                            y1="5"
                            x2="25"
                            y2="40"
                            stroke="currentColor"
                            strokeWidth="2"
                        />
                        <circle cx="25" cy="15" r="3" />
                        <circle cx="25" cy="22" r="2.5" />
                        <circle cx="25" cy="28" r="2" />
                        <circle cx="25" cy="34" r="1.5" />

                        {/* 5th Roof & Body */}
                        <path d="M 12 48 Q 25 44 38 48 L 33 45 L 17 45 Z" />
                        <rect x="19" y="48" width="12" height="9" />

                        {/* 4th Roof & Body */}
                        <path d="M 10 62 Q 25 58 40 62 L 35 59 L 15 59 Z" />
                        <rect x="18" y="62" width="14" height="10" />

                        {/* 3rd Roof & Body */}
                        <path d="M 8 77 Q 25 73 42 77 L 37 74 L 13 74 Z" />
                        <rect x="17" y="77" width="16" height="11" />

                        {/* 2nd Roof & Body */}
                        <path d="M 6 93 Q 25 89 44 93 L 39 90 L 11 90 Z" />
                        <rect x="16" y="93" width="18" height="12" />

                        {/* 1st Roof & Body */}
                        <path d="M 4 110 Q 25 106 46 110 L 41 107 L 9 107 Z" />
                        <rect x="15" y="110" width="20" height="14" />

                        {/* Pagoda Foundation */}
                        <rect x="11" y="124" width="28" height="6" rx="1" />
                    </g>

                    {/* Front Hill */}
                    <path
                        d="M -20 260 Q 200 190, 420 260 Z"
                        fill="var(--color-text-contrast)"
                        opacity="0.18"
                    />

                    {/* Torii Gate Silhouette */}
                    <g
                        transform="translate(180, 155)"
                        fill="var(--color-text-contrast)"
                        opacity="0.35"
                    >
                        <path d="M 2 3 C 12 1, 28 1, 38 3 L 36 6 C 26 5, 14 5, 4 6 Z" />
                        <rect x="5" y="9" width="30" height="2" />
                        <rect x="9" y="9" width="3" height="27" />
                        <rect x="28" y="9" width="3" height="27" />
                        <rect x="19" y="9" width="2" height="5" />
                        <rect x="8" y="34" width="5" height="2" />
                        <rect x="27" y="34" width="5" height="2" />
                    </g>

                    {/* Drifting Clouds on Left Hill */}
                    <g
                        className="animate-naho-cloud-drift text-bgc-highlight opacity-55 dark:opacity-30"
                        fill="currentColor"
                        style={{ animationDelay: "-10s" }}
                    >
                        <rect x="20" y="110" width="100" height="10" rx="5" />
                        <rect x="250" y="130" width="120" height="10" rx="5" />
                    </g>
                </svg>
            </div>

            {/* Bottom Seigaiha Wave Pattern */}
            <div className="text-bgc-highlight absolute bottom-0 left-0 h-16 w-full opacity-[0.16] dark:opacity-[0.08]">
                <svg className="h-full w-full">
                    <defs>
                        <pattern
                            id="seigaiha"
                            width="40"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 0 20 A 20 20 0 0 1 40 20 M 5 20 A 15 15 0 0 1 35 20 M 10 20 A 10 10 0 0 1 30 20 M 15 20 A 5 5 0 0 1 25 20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                            <path
                                d="M 20 10 A 20 20 0 0 1 60 10 M 25 10 A 15 15 0 0 1 55 10 M 30 10 A 10 10 0 0 1 50 10 M 35 10 A 5 5 0 0 1 45 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                            <path
                                d="M -20 10 A 20 20 0 0 1 20 10 M -15 10 A 15 15 0 0 1 15 10 M -10 10 A 10 10 0 0 1 10 10 M -5 10 A 5 5 0 0 1 5 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#seigaiha)" />
                </svg>
            </div>
        </div>
    );
}

export default JapanBackground;
