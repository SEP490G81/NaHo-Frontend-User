import React from "react";
import Image from "next/image";
import { getInitials } from "../utils/leaderboard.util";

interface LearnerAvatarProps {
    fullName: string | null;
    avatarUrl: string | null;
    /** Cạnh avatar tính bằng px; mặc định 36 cho dòng trong bảng. */
    size?: number;
}

export function LearnerAvatar({
    fullName,
    avatarUrl,
    size = 36,
}: LearnerAvatarProps) {
    const box = { width: size, height: size };

    if (avatarUrl) {
        return (
            <Image
                src={avatarUrl}
                alt={fullName ?? ""}
                width={size}
                height={size}
                unoptimized
                style={box}
                className="shrink-0 rounded-full object-cover"
            />
        );
    }

    return (
        <div
            style={box}
            className="bg-bgc-highlight/20 text-text-highlight flex shrink-0 items-center justify-center rounded-full font-bold"
        >
            <span style={{ fontSize: Math.round(size * 0.36) }}>
                {getInitials(fullName)}
            </span>
        </div>
    );
}

export default LearnerAvatar;
