import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Định dạng điểm L-Point giữ tối đa 1 chữ số thập phân (bỏ số 0 thừa), locale vi-VN.
 * Ví dụ: 30 → "30", 4.8 → "4,8", 0.0999 → "0,1", -6 → "-6".
 */
export function formatPoints(n: number): string {
    const rounded = Math.round((n ?? 0) * 10) / 10;
    return rounded.toLocaleString("vi-VN", { maximumFractionDigits: 1 });
}

export function slugifyText(text: string) {
    if (!text) return "";
    return slugify(text, {
        replacement: "-",
        lower: true,
        strict: true,
        locale: "vi",
        trim: true,
    });
}
