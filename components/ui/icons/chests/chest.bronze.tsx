import React from "react";

interface ChestProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const ChestBronze: React.FC<ChestProps> = ({
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
            className={`drop-shadow-md transition-transform duration-300 hover:scale-110 ${className}`}
            {...props}
        >
            <defs>
                {/* Bronze Body Gradient */}
                <linearGradient
                    id="bronzeBody"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#D97706" />
                    <stop offset="40%" stopColor="#B45309" />
                    <stop offset="100%" stopColor="#78350F" />
                </linearGradient>

                {/* Bronze Lid Gradient */}
                <linearGradient
                    id="bronzeLid"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#92400E" />
                </linearGradient>

                {/* Metal Trim Metallic Gradient */}
                <linearGradient
                    id="metalTrim"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                >
                    <stop offset="0%" stopColor="#FEF3C7" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#B45309" />
                </linearGradient>

                {/* Lock Gold Gradient */}
                <linearGradient
                    id="goldLock"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#FEF08A" />
                    <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>

                <filter
                    id="shadowBronze"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                >
                    <feDropShadow
                        dx="0"
                        dy="4"
                        stdDeviation="2.5"
                        floodColor="#78350f"
                        floodOpacity="0.4"
                    />
                </filter>
            </defs>

            {/* Chest Shadow / Base */}
            <ellipse
                cx="32"
                cy="54"
                rx="22"
                ry="5"
                fill="#451A03"
                opacity="0.3"
            />

            {/* Main Chest Body (Bottom Box) */}
            <rect
                x="12"
                y="28"
                width="40"
                height="24"
                rx="4"
                fill="url(#bronzeBody)"
                stroke="#78350F"
                strokeWidth="1.5"
                filter="url(#shadowBronze)"
            />

            {/* Vertical Wood Planks details */}
            <path
                d="M22 28V52M42 28V52"
                stroke="#92400E"
                strokeWidth="1"
                opacity="0.6"
            />

            {/* Main Lid Top Curved Dome */}
            <path
                d="M10 28C10 18 18 12 32 12C46 12 54 18 54 28H10Z"
                fill="url(#bronzeLid)"
                stroke="#78350F"
                strokeWidth="1.5"
            />

            {/* Lid Rim / Metal Band */}
            <rect
                x="9"
                y="26"
                width="46"
                height="4"
                rx="2"
                fill="url(#metalTrim)"
                stroke="#78350F"
                strokeWidth="1"
            />

            {/* Horizontal & Corner Metal Brackets */}
            <rect
                x="12"
                y="32"
                width="6"
                height="18"
                fill="url(#metalTrim)"
                opacity="0.9"
            />
            <rect
                x="46"
                y="32"
                width="6"
                height="18"
                fill="url(#metalTrim)"
                opacity="0.9"
            />

            {/* Rivets / Studs */}
            <circle cx="15" cy="35" r="1" fill="#78350F" />
            <circle cx="15" cy="47" r="1" fill="#78350F" />
            <circle cx="49" cy="35" r="1" fill="#78350F" />
            <circle cx="49" cy="47" r="1" fill="#78350F" />

            {/* Center Lock Frame */}
            <rect
                x="26"
                y="29"
                width="12"
                height="14"
                rx="2"
                fill="url(#goldLock)"
                stroke="#78350F"
                strokeWidth="1"
            />

            {/* Keyhole */}
            <circle cx="32" cy="34" r="2" fill="#451A03" />
            <path d="M31 34L33 34L33.5 39L30.5 39Z" fill="#451A03" />

            {/* Top Lid Highlight */}
            <path
                d="M16 18C20 15 28 14 36 15"
                stroke="#FEF3C7"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.7"
            />
        </svg>
    );
};

export default ChestBronze;
