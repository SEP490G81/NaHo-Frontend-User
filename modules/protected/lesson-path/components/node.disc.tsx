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
    const d = depth ?? 11;
    const darkShade = `color-mix(in srgb, ${color} 62%, #000)`;
    const faceColor = color;
    const shadow3d = [
        `0 ${d}px 0 0 ${darkShade}`,
        `0 ${d + 6}px 14px -2px rgba(0,0,0,0.32)`,
        "inset 0 4px 6px rgba(255,255,255,0.45)",
        "inset 0 -6px 8px rgba(0,0,0,0.22)",
    ].join(", ");

    const sunken = [
        "0 4px 0 0 #cbd5e1",
        "inset 0 3px 6px rgba(0,0,0,0.15)",
    ].join(", ");

    return (
        <div
            className={cn(
                "relative flex items-center justify-center rounded-full transition-transform active:translate-y-[6px]",
                locked
                    ? "border-2 border-slate-300 bg-slate-200 text-slate-400"
                    : "text-white select-none",
                className,
            )}
            style={{
                width: size,
                height: size,
                marginBottom: locked ? 4 : d,
                background: locked ? "#e2e8f0" : faceColor,
                boxShadow: locked ? sunken : shadow3d,
            }}
        >
            {!locked && (
                <span
                    className="pointer-events-none absolute inset-x-3 top-2 h-2/5 rounded-full"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(255,255,255,0))",
                    }}
                />
            )}
            <span className="relative flex items-center justify-center">
                {children}
            </span>
        </div>
    );
}

export default NodeDisc;
