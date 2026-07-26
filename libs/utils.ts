import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
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
