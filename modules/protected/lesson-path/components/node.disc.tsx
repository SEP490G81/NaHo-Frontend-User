"use client";
import React from "react";
import { cn } from "@/libs/utils";

interface Props {
    /** Màu mặt đĩa (CSS color / biến), bỏ qua khi locked. */
    color: string;
    locked: boolean;
    size?: number;
    className?: string;
    children: React.ReactNode;
}

const SUNKEN = "inset 0 3px 6px rgba(0,0,0,0.4)";

/**
 * Đĩa tròn nổi khối 3D kiểu "nút xu" Duolingo: mặt gradient, gờ đáy đặc màu
 * tối hơn (giả khối nhô), bóng đổ mềm và highlight bóng ở đỉnh.
 */
export function NodeDisc({ color, locked, size = 76, className, children }: Props) {
    const shade = `color-mix(in srgb, ${color} 58%, #000)`;
    const face = `radial-gradient(120% 120% at 50% 20%, color-mix(in srgb, ${color} 80%, #fff) 0%, ${color} 48%, color-mix(in srgb, ${color} 82%, #000) 100%)`;
    const raised = `0 6px 0 0 ${shade}, 0 16px 16px -8px rgba(0,0,0,0.45), inset 0 4px 5px rgba(255,255,255,0.55), inset 0 -7px 10px rgba(0,0,0,0.28)`;

    return (
        <div
            className={cn(
                "relative flex items-center justify-center overflow-hidden rounded-full",
                locked ? "border-bdc-primary text-text-muted border" : "text-white",
                className,
            )}
            style={{
                width: size,
                height: size,
                background: locked ? "var(--color-bgc-app)" : face,
                boxShadow: locked ? SUNKEN : raised,
            }}
        >
            {!locked && (
                <span
                    className="pointer-events-none absolute inset-x-2 top-1.5 h-2/5 rounded-full"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.65), rgba(255,255,255,0))",
                    }}
                />
            )}
            <span className="relative flex items-center justify-center drop-shadow-sm">
                {children}
            </span>
        </div>
    );
}

export default NodeDisc;
