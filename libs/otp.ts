import { OTP_LENGTH } from "@/constants/otp.constants";

export function createEmptyOtp(): string[] {
    return Array.from({ length: OTP_LENGTH }, () => "");
}

export function onlyDigits(value: string): string {
    return value.replace(/\D/g, "");
}

export function formatCountdown(totalSeconds: number): string {
    const safeSeconds = Math.max(totalSeconds, 0);
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// che bớt email: nguyenvana@gmail.com -> ngu*******@gmail.com
export function maskEmail(email: string): string {
    const atIndex = email.lastIndexOf("@");
    if (atIndex <= 0) return email;

    const localPart = email.slice(0, atIndex);
    const domainPart = email.slice(atIndex);

    if (localPart.length <= 3) return `${localPart}${domainPart}`;

    return `${localPart.slice(0, 3)}${"*".repeat(localPart.length - 3)}${domainPart}`;
}
