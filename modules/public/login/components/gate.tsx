import React from "react";

const Gate = () => {
    return (
        <svg
            viewBox="0 0 240 220"
            className="h-56 w-auto filter-[drop-shadow(0_0_6px_#ff99ac)_drop-shadow(0_0_20px_#ff99ac)_drop-shadow(0_0_38px_rgba(255,153,172,.55))]"
            aria-hidden="true"
        >
            <g
                stroke="#ff99ac"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            >
                <path d="M14 44 Q120 14 226 44" />
                <path d="M22 52 Q120 26 218 52" />
                <line x1="40" y1="80" x2="200" y2="80" />
                <line x1="60" y1="52" x2="50" y2="206" />
                <line x1="180" y1="52" x2="190" y2="206" />
                <line x1="120" y1="52" x2="120" y2="80" />
                <line x1="30" y1="208" x2="210" y2="208" strokeOpacity="0.5" />
            </g>
        </svg>
    );
};

export default Gate;
