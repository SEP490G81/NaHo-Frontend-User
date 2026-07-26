"use client";
import React from "react";

export function HeaderDecoration() {
    return (
        <>
            {/* Left Decorative Sakura Branch */}
            <div className="pointer-events-none absolute top-0 left-0 z-0 h-full w-48 opacity-50 select-none dark:opacity-25">
                <svg viewBox="0 0 200 60" className="h-full w-full fill-none">
                    <path
                        d="M 0 0 Q 60 15 120 10 T 180 30"
                        stroke="var(--color-text-contrast)"
                        strokeWidth="2.5"
                        opacity="0.3"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 40 8 Q 80 5 100 -5"
                        stroke="var(--color-text-contrast)"
                        strokeWidth="1.5"
                        opacity="0.3"
                        strokeLinecap="round"
                    />
                    <g className="text-bgc-highlight" fill="currentColor">
                        <g transform="translate(60, 15) rotate(15)">
                            {Array.from({ length: 5 }).map((_, p) => (
                                <ellipse
                                    key={p}
                                    cx={0}
                                    cy={-4}
                                    rx={2}
                                    ry={4.5}
                                    transform={`rotate(${p * 72})`}
                                    opacity="0.9"
                                />
                            ))}
                            <circle r="1" fill="var(--color-bgc-page)" />
                        </g>
                        <g transform="translate(110, 10) rotate(45)">
                            {Array.from({ length: 5 }).map((_, p) => (
                                <ellipse
                                    key={p}
                                    cx={0}
                                    cy={-3.5}
                                    rx={1.8}
                                    ry={4}
                                    transform={`rotate(${p * 72})`}
                                    opacity="0.9"
                                />
                            ))}
                            <circle r="0.8" fill="var(--color-bgc-page)" />
                        </g>
                        <g transform="translate(150, 20) rotate(90)">
                            {Array.from({ length: 5 }).map((_, p) => (
                                <ellipse
                                    key={p}
                                    cx={0}
                                    cy={-3}
                                    rx={1.5}
                                    ry={3.5}
                                    transform={`rotate(${p * 72})`}
                                    opacity="0.9"
                                />
                            ))}
                            <circle r="0.7" fill="var(--color-bgc-page)" />
                        </g>
                    </g>
                </svg>
            </div>

            {/* Right Decorative Sakura Branch */}
            <div className="pointer-events-none absolute top-0 right-0 z-0 h-full w-48 opacity-50 select-none dark:opacity-25">
                <svg viewBox="0 0 200 60" className="h-full w-full fill-none">
                    <path
                        d="M 200 0 Q 140 15 80 10 T 20 30"
                        stroke="var(--color-text-contrast)"
                        strokeWidth="2.5"
                        opacity="0.3"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 160 8 Q 120 5 100 -5"
                        stroke="var(--color-text-contrast)"
                        strokeWidth="1.5"
                        opacity="0.3"
                        strokeLinecap="round"
                    />
                    <g className="text-bgc-highlight" fill="currentColor">
                        <g transform="translate(140, 15) rotate(-15)">
                            {Array.from({ length: 5 }).map((_, p) => (
                                <ellipse
                                    key={p}
                                    cx={0}
                                    cy={-4}
                                    rx={2}
                                    ry={4.5}
                                    transform={`rotate(${p * 72})`}
                                    opacity="0.9"
                                />
                            ))}
                            <circle r="1" fill="var(--color-bgc-page)" />
                        </g>
                        <g transform="translate(90, 10) rotate(-45)">
                            {Array.from({ length: 5 }).map((_, p) => (
                                <ellipse
                                    key={p}
                                    cx={0}
                                    cy={-3.5}
                                    rx={1.8}
                                    ry={4}
                                    transform={`rotate(${p * 72})`}
                                    opacity="0.9"
                                />
                            ))}
                            <circle r="0.8" fill="var(--color-bgc-page)" />
                        </g>
                    </g>
                </svg>
            </div>
        </>
    );
}

export default HeaderDecoration;
