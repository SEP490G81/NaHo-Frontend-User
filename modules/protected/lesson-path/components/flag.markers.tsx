import React from "react";

// Màu NGUYÊN BẢN của biểu tượng Nhật (giữ đặc trưng, không đổi theo màu sách).
const TORII = "#e24a2b"; // đỏ son (shuiro) của cổng Torii
const TORII_DARK = "#a3301a";
// Đàn cá chép Koinobori: bố (đen) · mẹ (đỏ) · con (xanh).
const KOI = [
    { body: "#3f3f46", fin: "#27272a" },
    { body: "#e24a2b", fin: "#a3301a" },
    { body: "#2f86d6", fin: "#1f5fa0" },
];

/** Làm mờ + xám khi node đang khóa (vẫn phân biệt trạng thái). */
const dim = (locked: boolean) => (locked ? "opacity-40 grayscale" : "");

/** Một con cá chép (mõm trái, đuôi xẻ phải) — vẽ ở toạ độ/tỉ lệ tuỳ ý. */
function Carp({
    x,
    y,
    s,
    body,
    fin,
}: {
    x: number;
    y: number;
    s: number;
    body: string;
    fin: string;
}) {
    return (
        <g transform={`translate(${x} ${y}) scale(${s})`}>
            <path
                d="M2 5 C2 2 6 1 11 1 C15 1 19 2.5 21 4 L18 5 L21 6 C19 7.5 15 9 11 9 C6 9 2 8 2 5 Z"
                fill={body}
                stroke={fin}
                strokeWidth={0.8}
                strokeLinejoin="round"
            />
            <circle cx="6" cy="4" r="1.1" fill="#fff" />
            <circle cx="6" cy="4" r="0.5" fill={fin} />
        </g>
    );
}

/** Cổng Torii — đỏ son nguyên bản (mốc Bài học). */
export function ToriiMark({ locked }: { locked: boolean }) {
    return (
        <svg width={58} height={52} viewBox="0 0 58 52" fill="none">
            <g className={dim(locked)}>
                <rect
                    x="17"
                    y="13"
                    width="5"
                    height="37"
                    rx="1"
                    fill={TORII}
                    stroke={TORII_DARK}
                    strokeWidth={1}
                />
                <rect
                    x="36"
                    y="13"
                    width="5"
                    height="37"
                    rx="1"
                    fill={TORII}
                    stroke={TORII_DARK}
                    strokeWidth={1}
                />
                <rect
                    x="12"
                    y="22"
                    width="34"
                    height="5"
                    rx="1"
                    fill={TORII}
                    stroke={TORII_DARK}
                    strokeWidth={1}
                />
                <rect x="27" y="14" width="4" height="8" fill={TORII_DARK} />
                <path
                    d="M5 12 Q29 17 53 12 L53 6 Q29 11 5 6 Z"
                    fill={TORII}
                    stroke={TORII_DARK}
                    strokeWidth={1}
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
}

/** Koinobori — cột + chong chóng + 3 con cá (bố·mẹ·con) (mốc Can-do). */
export function KoinoboriMark({ locked }: { locked: boolean }) {
    return (
        <svg width={44} height={50} viewBox="0 0 44 50" fill="none">
            <g className={dim(locked)}>
                <rect
                    x="8"
                    y="9"
                    width="3"
                    height="39"
                    rx="1.5"
                    fill="#6b7280"
                />
                <circle
                    cx="9.5"
                    cy="7"
                    r="2.6"
                    fill="#f5c542"
                    stroke="#b7860b"
                    strokeWidth={0.8}
                />
                <Carp
                    x={10}
                    y={9}
                    s={0.86}
                    body={KOI[0].body}
                    fin={KOI[0].fin}
                />
                <Carp
                    x={10}
                    y={20}
                    s={0.78}
                    body={KOI[1].body}
                    fin={KOI[1].fin}
                />
                <Carp
                    x={10}
                    y={30}
                    s={0.7}
                    body={KOI[2].body}
                    fin={KOI[2].fin}
                />
            </g>
        </svg>
    );
}
