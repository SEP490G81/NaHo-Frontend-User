"use client";
import React from "react";
import { cn } from "@/libs/utils";

interface Props {
    /** Màu mặt đĩa (CSS color / biến), bỏ qua khi locked. */
    color: string;
    locked: boolean;
    size?: number;
    /** Độ dày gờ đáy (khối nhô 3D); mặc định ~11% đường kính. */
    depth?: number;
    className?: string;
    children: React.ReactNode;
}

/**
 * Đĩa tròn nổi khối 3D kiểu "nút" Duolingo: mặt gradient sáng ở đỉnh, gờ đáy đặc
 * màu tối (giả chiều cao), bóng đổ xuống nền và highlight bóng ở đỉnh.
 */
export function NodeDisc({
    color,
    locked,
    size = 84,
    depth,
    className,
    children,
}: Props) {
    const d = depth ?? Math.round(size * 0.11);
    const shade = `color-mix(in srgb, ${color} 52%, #000)`;
    const face = `radial-gradient(120% 120% at 50% 22%, color-mix(in srgb, ${color} 82%, #fff) 0%, ${color} 46%, color-mix(in srgb, ${color} 84%, #000) 100%)`;
    const raised = [
        `0 ${d}px 0 0 ${shade}`,
        `0 ${d + 8}px 14px -4px rgba(0,0,0,0.45)`,
        "inset 0 5px 6px rgba(255,255,255,0.6)",
        "inset 0 -8px 12px rgba(0,0,0,0.3)",
    ].join(", ");
    const sunken = [
        `0 3px 0 0 var(--color-bdc-primary)`,
        "inset 0 3px 7px rgba(0,0,0,0.35)",
    ].join(", ");

    return (
        <div
            className={cn(
                "relative flex items-center justify-center overflow-hidden rounded-full",
                locked
                    ? "border-bdc-primary text-text-muted border"
                    : "text-white",
                className,
            )}
            style={{
                width: size,
                height: size,
                marginBottom: locked ? 3 : d,
                background: locked ? "var(--color-bgc-app)" : face,
                boxShadow: locked ? sunken : raised,
            }}
        >
            {!locked && (
                <span
                    className="pointer-events-none absolute inset-x-2 top-1.5 h-2/5 rounded-full"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0))",
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
