import React from "react";

interface ChestProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
}

const ChestSilver: React.FC<ChestProps> = ({ size = 48, className = "", ...props }) => {
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
                {/* Silver Metallic Gradient */}
                <linearGradient id="silverBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E2E8F0" />
                    <stop offset="40%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#475569" />
                </linearGradient>

                {/* Silver Lid Gradient */}
                <linearGradient id="silverLid" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#F8FAFC" />
                    <stop offset="50%" stopColor="#CBD5E1" />
                    <stop offset="100%" stopColor="#64748B" />
                </linearGradient>

                {/* Shimmer Blue Trim */}
                <linearGradient id="silverTrim" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F0F9FF" />
                    <stop offset="50%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>

                {/* Sapphire Gem Lock */}
                <radialGradient id="blueGem" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E0F2FE" />
                    <stop offset="40%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0369A1" />
                </radialGradient>

                <filter id="shadowSilver" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.3" />
                </filter>
            </defs>

            {/* Chest Shadow */}
            <ellipse cx="32" cy="54" rx="22" ry="5" fill="#0F172A" opacity="0.3" />

            {/* Main Chest Body */}
            <rect
                x="12"
                y="28"
                width="40"
                height="24"
                rx="4"
                fill="url(#silverBody)"
                stroke="#334155"
                strokeWidth="1.5"
                filter="url(#shadowSilver)"
            />

            {/* Panel Line details */}
            <path d="M22 28V52M42 28V52" stroke="#64748B" strokeWidth="1" opacity="0.5" />

            {/* Main Lid Top Curved Dome */}
            <path
                d="M10 28C10 18 18 12 32 12C46 12 54 18 54 28H10Z"
                fill="url(#silverLid)"
                stroke="#334155"
                strokeWidth="1.5"
            />

            {/* Lid Rim */}
            <rect x="9" y="26" width="46" height="4" rx="2" fill="url(#silverTrim)" stroke="#334155" strokeWidth="1" />

            {/* Corner Metal Bands */}
            <rect x="12" y="32" width="6" height="18" fill="url(#silverTrim)" opacity="0.9" />
            <rect x="46" y="32" width="6" height="18" fill="url(#silverTrim)" opacity="0.9" />

            {/* Rivets */}
            <circle cx="15" cy="35" r="1" fill="#1E293B" />
            <circle cx="15" cy="47" r="1" fill="#1E293B" />
            <circle cx="49" cy="35" r="1" fill="#1E293B" />
            <circle cx="49" cy="47" r="1" fill="#1E293B" />

            {/* Sapphire Lock Plate */}
            <rect x="26" y="29" width="12" height="14" rx="2" fill="url(#silverTrim)" stroke="#1E293B" strokeWidth="1" />
            
            {/* Center Glowing Gem */}
            <circle cx="32" cy="36" r="3.5" fill="url(#blueGem)" stroke="#FFFFFF" strokeWidth="1" />

            {/* Sparkles */}
            <path d="M20 16L21.5 19.5L25 21L21.5 22.5L20 26L18.5 22.5L15 21L18.5 19.5Z" fill="#FFFFFF" opacity="0.9" />
            <circle cx="44" cy="18" r="1.5" fill="#E0F2FE" />
        </svg>
    );
};

export default ChestSilver;