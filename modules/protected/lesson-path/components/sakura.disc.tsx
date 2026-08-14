"use client";
import React from "react";

interface Props {
    /** Màu cánh hoa (theo trạng thái); bỏ qua khi locked. */
    color: string;
    locked: boolean;
    size?: number;
    /** Lớp phủ giữa hoa (vd ổ khóa cho node khóa); mặc định chỉ hiện nhụy hoa. */
    children?: React.ReactNode;
}

const ANGLES = [0, 72, 144, 216, 288];

/**
 * Node hình HOA ANH ĐÀO — dựng theo đúng dáng hoa trang trí của app (5 cánh
 * ellipse + nhụy + nhị hoa). Không mang icon; icon loại node hiện ở tooltip khi
 * rê chuột. Đã xong = hồng trầm hơn · khóa = xám (kèm ổ khóa qua children).
 */
export function SakuraDisc({ color, locked, size = 72, children }: Props) {
    const face = locked ? "#e2e8f0" : color;
    const edge = locked ? "#cbd5e1" : `color-mix(in srgb, ${color} 55%, #000)`;
    const pistil = locked ? "#f1f5f9" : "#fff0f3";
    return (
        <div
            className="relative flex items-center justify-center transition-transform active:translate-y-[3px]"
            style={{ width: size, height: size }}
        >
            <svg
                viewBox="0 0 100 100"
                width={size}
                height={size}
                className="absolute inset-0 drop-shadow-md"
            >
                {ANGLES.map((a) => (
                    <ellipse
                        key={a}
                        cx="50"
                        cy="28"
                        rx="13"
                        ry="21"
                        transform={`rotate(${a} 50 50)`}
                        fill={face}
                        stroke={edge}
                        strokeWidth={1.4}
                    />
                ))}
                {/* Nhị hoa toả ra + nhụy giữa (chi tiết đặc trưng sakura) */}
                {ANGLES.map((a) => (
                    <line
                        key={`s${a}`}
                        x1="50"
                        y1="50"
                        x2="50"
                        y2="35"
                        transform={`rotate(${a + 36} 50 50)`}
                        stroke={pistil}
                        strokeWidth={2.6}
                        strokeLinecap="round"
                    />
                ))}
                <circle cx="50" cy="50" r="7.5" fill={pistil} />
            </svg>
            {children && (
                <span className="relative text-slate-400">{children}</span>
            )}
        </div>
    );
}

export default SakuraDisc;
