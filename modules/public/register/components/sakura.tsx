import { PETAL_ROTATIONS } from "@/modules/public/register/constants/register.constant";
import React from "react";

const Sakura = () => {
    return (
        <svg
            viewBox="0 0 200 200"
            className="h-48 w-auto filter-[drop-shadow(0_0_6px_#ff99ac)_drop-shadow(0_0_20px_#ff99ac)_drop-shadow(0_0_38px_rgba(255,153,172,.55))]"
            aria-hidden="true"
        >
            <g fill="#ff99ac">
                {PETAL_ROTATIONS.map((deg) => (
                    <ellipse
                        key={deg}
                        cx="100"
                        cy="56"
                        rx="19"
                        ry="40"
                        transform={`rotate(${deg} 100 100)`}
                    />
                ))}
            </g>
            <circle cx="100" cy="100" r="11" fill="#fff0f3" />
        </svg>
    );
};

export default Sakura;
