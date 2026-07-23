import React from "react";

interface ChestProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const ChestNone: React.FC<ChestProps> = ({ size = 48, className = "", ...props }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-300 hover:scale-110 drop-shadow-md ${className}`}
            {...props}
        >
            <defs>
                <radialGradient
                    id="coinGlow"
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fx="30%"
                    fy="30%"
                >
                    <stop offset="0%" stopColor="#FFF59D" />
                    <stop offset="60%" stopColor="#FBC02D" />
                    <stop offset="100%" stopColor="#F57F17" />
                </radialGradient>
                <linearGradient
                    id="ringGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#FFFDE7" />
                    <stop offset="50%" stopColor="#FBC02D" />
                    <stop offset="100%" stopColor="#E65100" />
                </linearGradient>
                <filter id="shadowNone" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.4" />
                </filter>
            </defs>

            {/* Background Glow Ring */}
            <circle cx="32" cy="32" r="28" fill="#FEF3C7" opacity="0.4" />
            
            {/* Outer Coin Body */}
            <circle
                cx="32"
                cy="32"
                r="24"
                fill="url(#coinGlow)"
                stroke="url(#ringGrad)"
                strokeWidth="2.5"
                filter="url(#shadowNone)"
            />

            {/* Inner Ring Motif */}
            <circle
                cx="32"
                cy="32"
                r="18"
                fill="none"
                stroke="#FFFDE7"
                strokeWidth="1.5"
                strokeDasharray="3 2"
                opacity="0.8"
            />

            {/* Center Star Emblem */}
            <path
                d="M32 17L35.5 25.5L44.5 26.5L37.8 32.3L39.8 41L32 36.5L24.2 41L26.2 32.3L19.5 26.5L28.5 25.5L32 17Z"
                fill="#FFF"
                stroke="#F57F17"
                strokeWidth="1"
            />

            {/* Shiny Glint Sparkle */}
            <circle cx="22" cy="20" r="2.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="42" cy="40" r="1.5" fill="#FFFFFF" opacity="0.7" />
        </svg>
    );
};

export default ChestNone;