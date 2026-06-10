"use client";
import React from "react";

export function SakuraIllustration() {
    return (
        <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gradient-to-br from-bgc-highlight/20 via-bgc-highlight/5 to-transparent">
            <svg viewBox="0 0 320 128" className="absolute inset-0 h-full w-full" aria-hidden="true">
                {/* Audio waves */}
                <g className="text-bdc-muted" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7">
                    <path d="M0,90 Q40,70 80,90 T160,90 T240,90 T320,90" />
                    <path d="M0,100 Q40,82 80,100 T160,100 T240,100 T320,100" opacity="0.6" />
                    <path d="M0,110 Q40,96 80,110 T160,110 T240,110 T320,110" opacity="0.4" />
                </g>
                {/* Sakura branch */}
                <g className="text-bgc-highlight" stroke="#8b5a3c" strokeWidth="2" fill="none">
                    <path d="M20,30 Q90,20 180,40 T300,30" />
                </g>
                {/* Petals */}
                {[
                    { cx: 60, cy: 28, r: 8 },
                    { cx: 130, cy: 32, r: 10 },
                    { cx: 200, cy: 42, r: 9 },
                    { cx: 260, cy: 30, r: 11 },
                    { cx: 95, cy: 50, r: 6 },
                    { cx: 230, cy: 60, r: 7 },
                ].map((f, i) => (
                    <g key={i} transform={`translate(${f.cx} ${f.cy})`} className="text-bgc-highlight" fill="currentColor">
                        {Array.from({ length: 5 }).map((_, p) => {
                            const angle = (p * 72 * Math.PI) / 180;
                            const px = (Math.cos(angle) * f.r * 0.7).toFixed(3);
                            const py = (Math.sin(angle) * f.r * 0.7).toFixed(3);
                            return <circle key={p} cx={px} cy={py} r={(f.r * 0.55).toFixed(3)} opacity="0.85" />;
                        })}
                        <circle r={(f.r * 0.3).toFixed(3)} fill="#fff7d6" />
                    </g>
                ))}
            </svg>
        </div>
    );
}

export default SakuraIllustration;
