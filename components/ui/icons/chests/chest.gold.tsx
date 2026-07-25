import React from "react";

interface ChestProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const ChestGold: React.FC<ChestProps> = ({
    size = 48,
    className = "",
    ...props
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`drop-shadow-lg transition-transform duration-300 hover:scale-110 ${className}`}
            {...props}
        >
            <defs>
                {/* Royal Gold Body Gradient */}
                <linearGradient
                    id="goldBody"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#FEF08A" />
                    <stop offset="35%" stopColor="#EAB308" />
                    <stop offset="70%" stopColor="#CA8A04" />
                    <stop offset="100%" stopColor="#854D0E" />
                </linearGradient>

                {/* Gold Lid Dome Gradient */}
                <linearGradient id="goldLid" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFBEB" />
                    <stop offset="40%" stopColor="#FACC15" />
                    <stop offset="100%" stopColor="#A16207" />
                </linearGradient>

                {/* Sparkling Red Ruby Gem */}
                <radialGradient
                    id="rubyGem"
                    cx="50%"
                    cy="50%"
                    r="50%"
                    fx="30%"
                    fy="30%"
                >
                    <stop offset="0%" stopColor="#FECDD3" />
                    <stop offset="50%" stopColor="#F43F5E" />
                    <stop offset="100%" stopColor="#9F1239" />
                </radialGradient>

                {/* Shiny Trim */}
                <linearGradient
                    id="brightGoldTrim"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="#FFFDE7" />
                    <stop offset="50%" stopColor="#FDE047" />
                    <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>

                <filter
                    id="shadowGold"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                >
                    <feDropShadow
                        dx="0"
                        dy="5"
                        stdDeviation="4"
                        floodColor="#eab308"
                        floodOpacity="0.5"
                    />
                </filter>
            </defs>

            {/* Glowing Golden Aura Disk */}
            <circle cx="32" cy="34" r="26" fill="#FEF08A" opacity="0.25" />
            <ellipse
                cx="32"
                cy="54"
                rx="22"
                ry="5"
                fill="#713F12"
                opacity="0.3"
            />

            {/* Main Chest Body */}
            <rect
                x="12"
                y="28"
                width="40"
                height="24"
                rx="4"
                fill="url(#goldBody)"
                stroke="#713F12"
                strokeWidth="1.5"
                filter="url(#shadowGold)"
            />

            {/* Wood Grain Lines */}
            <path
                d="M22 28V52M42 28V52"
                stroke="#A16207"
                strokeWidth="1"
                opacity="0.6"
            />

            {/* Lid Dome */}
            <path
                d="M10 28C10 17 18 11 32 11C46 11 54 17 54 28H10Z"
                fill="url(#goldLid)"
                stroke="#713F12"
                strokeWidth="1.5"
            />

            {/* Japanese Sakura Motif Accent on Lid */}
            <path
                d="M32 14L33 17L36 17.5L33.5 19.5L34.5 22.5L32 20.8L29.5 22.5L30.5 19.5L28 17.5L31 17Z"
                fill="#FFF"
                opacity="0.8"
            />

            {/* Lid Rim */}
            <rect
                x="9"
                y="26"
                width="46"
                height="4"
                rx="2"
                fill="url(#brightGoldTrim)"
                stroke="#713F12"
                strokeWidth="1"
            />

            {/* Corner Decorative Straps */}
            <rect
                x="12"
                y="32"
                width="6"
                height="18"
                fill="url(#brightGoldTrim)"
                opacity="0.9"
            />
            <rect
                x="46"
                y="32"
                width="6"
                height="18"
                fill="url(#brightGoldTrim)"
                opacity="0.9"
            />

            {/* Rivets */}
            <circle cx="15" cy="35" r="1" fill="#713F12" />
            <circle cx="15" cy="47" r="1" fill="#713F12" />
            <circle cx="49" cy="35" r="1" fill="#713F12" />
            <circle cx="49" cy="47" r="1" fill="#713F12" />

            {/* Center Lock Plate */}
            <rect
                x="25"
                y="29"
                width="14"
                height="15"
                rx="3"
                fill="url(#brightGoldTrim)"
                stroke="#713F12"
                strokeWidth="1.5"
            />

            {/* Sparkling Ruby Center Lock */}
            <circle
                cx="32"
                cy="36.5"
                r="4"
                fill="url(#rubyGem)"
                stroke="#FFFFFF"
                strokeWidth="1"
            />

            {/* Radiant Sparkle Effects */}
            <path
                d="M16 12L18 16.5L22.5 18.5L18 20.5L16 25L14 20.5L9.5 18.5L14 16.5Z"
                fill="#FFFDE7"
            />
            <path
                d="M48 10L49.5 13.5L53 15L49.5 16.5L48 20L46.5 16.5L43 15L46.5 13.5Z"
                fill="#FFFDE7"
            />
        </svg>
    );
};

export default ChestGold;
