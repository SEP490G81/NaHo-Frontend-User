"use client";
import React from "react";

interface Petal {
    id: string;
    left: number;
    size: number;
    delay: number;
    duration: number;
}

const PETALS: Petal[] = [
    // Lượt 1
    { id: "p-1", left: 5, size: 14, delay: 0, duration: 11 },
    { id: "p-2", left: 15, size: 10, delay: 1.5, duration: 13 },
    { id: "p-3", left: 25, size: 12, delay: 3, duration: 10 },
    { id: "p-4", left: 35, size: 9, delay: 0.5, duration: 14 },
    { id: "p-5", left: 45, size: 13, delay: 2.5, duration: 12 },
    { id: "p-6", left: 55, size: 10, delay: 4, duration: 11 },
    { id: "p-7", left: 65, size: 12, delay: 1, duration: 13 },
    { id: "p-8", left: 75, size: 11, delay: 3.5, duration: 12 },
    { id: "p-9", left: 85, size: 10, delay: 2, duration: 11 },
    { id: "p-10", left: 95, size: 12, delay: 5, duration: 13 },

    // Lượt 2 (Rơi xen kẽ với delay lớn hơn)
    { id: "p-11", left: 10, size: 11, delay: 6, duration: 12 },
    { id: "p-12", left: 20, size: 13, delay: 7.5, duration: 10 },
    { id: "p-13", left: 30, size: 9, delay: 9, duration: 14 },
    { id: "p-14", left: 40, size: 14, delay: 5.5, duration: 11 },
    { id: "p-15", left: 50, size: 10, delay: 8.5, duration: 13 },
    { id: "p-16", left: 60, size: 12, delay: 10, duration: 12 },
    { id: "p-17", left: 70, size: 11, delay: 7, duration: 14 },
    { id: "p-18", left: 80, size: 13, delay: 9.5, duration: 11 },
    { id: "p-19", left: 90, size: 9, delay: 6.5, duration: 13 },

    // Lượt 3 (Thêm một số cánh hoa nhỏ bay nhanh)
    { id: "p-20", left: 8, size: 8, delay: 4, duration: 8 },
    { id: "p-21", left: 28, size: 7, delay: 11, duration: 9 },
    { id: "p-22", left: 48, size: 8, delay: 3, duration: 7 },
    { id: "p-23", left: 68, size: 7, delay: 12, duration: 9 },
    { id: "p-24", left: 88, size: 8, delay: 5, duration: 8 },
];

export function SakuraFalling() {
    return (
        <div className="pointer-events-none absolute -top-[72px] right-0 bottom-0 left-0 -z-10 overflow-hidden">
            {PETALS.map((petal) => (
                <span
                    key={petal.id}
                    className="bg-bgc-highlight/40 animate-naho-petal-fall absolute top-0 rounded-tl-full rounded-br-full"
                    style={{
                        left: `${petal.left}%`,
                        width: petal.size,
                        height: petal.size * 1.4,
                        animationDelay: `${petal.delay}s`,
                        animationDuration: `${petal.duration}s`,
                    }}
                />
            ))}
        </div>
    );
}

export default SakuraFalling;
